import { prisma } from "@/lib/encryption"
import type { Employee } from "@prisma/client"

export const employeeModel = {
    async getEmployees(role: string, userId: string) { 
        switch (role) {
            case "HR":
                return await prisma.$queryRaw<Employee[]>`
                    SELECT e.id, e.name, e.email, e.phone, d.name as department, p.title as position, r.name as role, e."hireDate", e.status, e.code
                    FROM employee e
                    JOIN department d ON e."departmentId" = d.id
                    JOIN position p ON e."positionId" = p.id
                    JOIN role r ON e."roleId" = r.id
                `
            case "Manager":
                return await prisma.$queryRaw<Employee[]>`
                    SELECT e.id, e.name, e.email, e.phone, d.name as department, p.title as position, r.name as role, e."hireDate", e.status, e.code
                    FROM employee e
                    JOIN department d ON e."departmentId" = d.id
                    JOIN position p ON e."positionId" = p.id
                    JOIN role r ON e."roleId" = r.id
                    WHERE e."departmentId" = (SELECT "departmentId" FROM employee WHERE id = ${userId}::uuid)                
                `
            default:
                return { status: false, error: "Forbidden"}
        }
    },

    async getEmployeeById(userId: string) { 
        return await prisma.$queryRaw<Employee[]>`
            SELECT e.*
            FROM "employee" e
            JOIN "user_credentials" uc ON uc."employeeId" = e."id"
            WHERE e."id" = ${userId}::uuid        
        `
    },

    async getDepartmentByName(name: string) { 
        return await prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM department WHERE name = ${name}
        `
    },

    async getPositionByTitle(title: string) { 
        return await prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM position WHERE title = ${title}
        `
    },

    async addEmployee(code: string, name: string, email: string, phone: string, departmentId: string, positionId: string, roleId: number) { 
        return await prisma.$executeRaw`
            WITH inserted_employee AS (
                INSERT INTO employee (code, name, email, phone, "departmentId", "positionId", "roleId", "hireDate", status)
                VALUES (${code}, ${name}, ${email}, ${phone}, ${departmentId}::uuid, ${positionId}::uuid, ${roleId}, NOW(), ${'ACTIVE'}::"Status")
                RETURNING id, code, email
            )
            INSERT INTO user_credentials (email, password, "employeeId", code)
            SELECT email, ${'1234'}, id, code FROM inserted_employee
            RETURNING *
        `
    },

    async updateEmployee(userId: string, code: string, name: string, email: string, phone: string, departmentId: string, positionId: string, roleId: number, status: string) { 
        return await prisma.$executeRaw`
            UPDATE employee 
            SET code = ${code}, name = ${name}, email = ${email}, phone = ${phone}, "departmentId" = ${departmentId}::uuid, "positionId" = ${positionId}::uuid, "roleId" = ${roleId}, status = ${status}::"Status"
            WHERE id = ${userId}::uuid
        `
    },

    async deleteEmployee(userId: string) { 
        return await prisma.$executeRaw`
            DELETE FROM employee WHERE id = ${userId}::uuid
        `
    }

}