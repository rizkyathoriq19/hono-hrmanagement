import type { Context } from "hono";
import { prisma } from "@/lib/encryption.js"
import { generateToken } from "@/utils/jwt.js";

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
    }


}