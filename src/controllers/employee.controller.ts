import type { Context } from "hono"
import { prisma } from "@/lib/encryption.js"
import { z } from "zod";
import type { Employee, UserCredentials } from "@prisma/client"

type TRegister = {
    code: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    role: "Manager" | "Staff" | "HR"
}

type TUpdate = {
    code: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    role: "Manager" | "Staff" | "HR"
    status: "ACTIVE" | "INACTIVE"
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

export const employeeController = {
    async getEmployees(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ error: "Unauthorized" }, 401);

            const result = await prisma.$queryRaw<{
                id: string,
                name: string,
                email: string,
                phone: string,
                department: string,
                position: string,
                role: string,
                hireDate: string,
                status: string,
                code: string,
            }[]>`
                SELECT e.id, e.name, e.email, e.phone, d.name as department, p.title as position, r.name as role, e."hireDate", e.status, e.code
                FROM employee e
                JOIN department d ON e."departmentId" = d.id
                JOIN position p ON e."positionId" = p.id
                JOIN role r ON e."roleId" = r.id
            `

            return c.json({ status: true, data: result }, 200);
        } catch (error) {
        if (error instanceof Error) {
            return c.json({ status: false, error: error.message }, 500);
        }
        return c.json({status: false, error: "Internal server error" }, 500);             
        }
    },

    async addEmployee(c: Context) {
        const body = await c.req.json<TRegister>()
        const { code, name, email, phone, department, position, role } = body

        try {
            const user = c.get("employee")
            if (!user) return c.json({ error: "Unauthorized" }, 401)
            
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
            
            return c.json({status: true, data: result, user: user}, 201)
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

    async getEmployeeById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ error: "Unauthorized" }, 401)
            
            const userId = c.req.param("id")
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
                WHERE uc."id" = ${userId}::uuid
            `

            if(result.length === 0) {
                return c.json({ error: "Employee not found" }, 404);
            }

            return c.json(result[0], 200)            
        } catch (error) {
            if (error instanceof Error) {
                return c.json({ error: error.message }, 500);
            }
            return c.json({ error: "Internal server error" }, 500);  
        }
    },
        
    async updateEmployee(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return c.json({ error: "Unauthorized" }, 401)
            
            const userId = c.req.param("id")
            const body = await c.req.json<TUpdate>()
            const { code, name, email, phone, department, position, role, status } = body
            
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
                UPDATE employee 
                SET "code" = $1, "name" = $2, "email" = $3, "phone" = $4, "departmentId" = $5::uuid, "positionId" = $6::uuid, "roleId" = $7, status = $8::"Status"
                WHERE id = $9::uuid
            `, code, name, email, phone, uuidDepartment[0].id, uuidPosition[0].id, roleId, status, userId)

            return c.json({ status: true, message: "Update Employee Success" }, 200)
        } catch (error) {
            if (error instanceof Error) {
                return c.json({ error: error.message }, 500);
            }
            return c.json({ error: "Internal server error" }, 500);             
        }
    }
}