import type { Context } from "hono";
import { z } from "zod";
import { prisma } from "@/lib/encryption.js"
import { generateToken } from "@/utils/jwt.js";
import type { Employee, UserCredentials } from "@prisma/client";
import type { IReqUser } from "@/middlewares/auth.middleware.js";

type TRegister = {
    code: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    role: "Manager" | "Staff" | "HR"
}

type TLogin = {
    identifier: string
    password: string
}

const roleMap: Record<string, number> = {
    "Manager": 1,
    "Staff": 2,
    "HR": 3
};

const registerValidationSchema = z.object({
    code: z.string().nonempty({message: "ID is required"}),
    name: z.string().nonempty({message: "Name is required"}),
    email: z.string().email({message: "Invalid email"}).nonempty({message: "Email is required"}),
    phone: z.string().nonempty({message: "Phone is required"}),
    department: z.string().nonempty({message: "Department is required"}),
    position: z.string().nonempty({message: "Position is required"}),
    role: z.enum(["Manager", "Staff", "HR"], {message: "Invalid role"})
})

export const authController = {
    async addUser(c: Context) {
        const body = await c.req.json<TRegister>()
        const { code, name, email, phone, department, position, role } = body

        try {
            await registerValidationSchema.parseAsync(body)
            
            const uuidDepartment = await prisma.$queryRawUnsafe<{ id: string }[]>(`
                SELECT id FROM "department" WHERE name = $1 LIMIT 1;
            `, department) || []

            const uuidPosition = await prisma.$queryRawUnsafe<{ id: string }[]>(`
                SELECT id FROM "position" WHERE title = $1 LIMIT 1;
            `, position) || []

            if (!uuidDepartment) return c.json({ error: "Invalid department" }, 400);
            if (!uuidPosition) return c.json({ error: "Invalid position" }, 400);

            const roleId = roleMap[role] ?? 2;

            const result = await prisma.$queryRawUnsafe<Employee[]>(`
                INSERT INTO employee ("code", "name", "email", "phone", "departmentId", "positionId", "roleId", "hireDate", "status")
                VALUES ($1, $2, $3, $4, $5::uuid, $6::uuid, $7, NOW(), 'ACTIVE') RETURNING *;
            `, code, name, email, phone, uuidDepartment[0].id, uuidPosition[0].id, roleId)
            
            if (result?.length > 0) {
                const uuidEmployee: string = result[0].id;
                const uuidCode: string = result[0].code;

                const user = await prisma.$transaction(async (sql) => {
                    const userCreate = await sql.$queryRawUnsafe<UserCredentials[]>(`
                        INSERT INTO "user_credentials" ("email", "password", "employeeId", "code")
                        VALUES ($1, $2, $3::uuid, $4) RETURNING *;
                    `, email, "1234", uuidEmployee, uuidCode);
                
                return userCreate[0]
                })
            
            return c.json({data: result, user: user}, 201)
            } else {
                return c.json({error: "Failed to insert employee"}, 500)
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return c.json(
                    { error: error.errors.map((e) => e.message).join(", ") },
                    400
                );
            } else if (error instanceof Error) {
                return c.json({ error: error.message }, 500);
            }
            return c.json({ error: "Internal server error" }, 500);           
        }
    },

    async login(c: Context) { 
        const body = await c.req.json<TLogin>()
        const { identifier, password } = body

        try {
            const userByIdentifier = await prisma.$queryRaw<{
                id: string,
                role: string,
            }[]>`
                    SELECT uc.id, e."roleId"
                    FROM "user_credentials" uc
                    JOIN "employee" e ON uc."employeeId" = e."id"
                    WHERE (uc.code = ${identifier} OR uc.email = ${identifier})
                    AND uc.password = crypt(${password}, uc.password)
                `
            
            if(userByIdentifier.length === 0) {
                return c.json({ error: "Invalid credentials" }, 401);
            }

            const token = await generateToken({
                id: userByIdentifier[0].id,
                role: userByIdentifier[0].role
            })

            return c.json({ user: userByIdentifier[0], token }, 200)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return c.json(
                    { error: error.errors.map((e) => e.message).join(", ") },
                    400
                );
            } else if (error instanceof Error) {
                return c.json({ error: error.message }, 500);
            }
            return c.json({ error: "Internal server error" }, 500);                  
        }
    },

    async me(c: IReqUser) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ error: "Unauthorized" }, 401)
            
            const result = await prisma.$queryRaw<{
                id: string,
                name: string,
                code: string,
                email: string,
                phone: string,
                role: string,
            }[]>`
                SELECT e.*, r."name" AS role
                FROM "employee" e
                JOIN "user_credentials" uc ON uc."employeeId" = e."id"
                JOIN "role" r ON e."roleId" = r."id"
                WHERE uc."id" = ${user.id}::uuid
            `

            if(result.length === 0) {
                return c.json({ error: "Employee not found" }, 404);
            }

            return c.json(result[0], 200)            
        } catch (error) {
            if (error instanceof z.ZodError) {
                return c.json(
                    { error: error.errors.map((e) => e.message).join(", ") },
                    400
                );
            } else if (error instanceof Error) {
                return c.json({ error: error.message }, 500);
            }
            return c.json({ error: "Internal server error" }, 500);  
        }
    },

    async list(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401)
            
            const result = await prisma.$queryRaw<{
                id: string,
                name: string,
            }[]>`
                SELECT r.* AS role
                FROM "role" r
            `;

            return c.json({status: true, data: result}, 200);
        } catch (error) {
        if (error instanceof Error) {
            return c.json({ status: false, error: error.message }, 500);
        }
        return c.json({status: false, error: "Internal server error" }, 500);             
        }
    }
}