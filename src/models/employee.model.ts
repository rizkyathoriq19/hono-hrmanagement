import { prisma } from "@/lib/encryption"
import type { Employee } from "@prisma/client"

export const employeeModel = {
    async getEmployees(role: string, userId: string) { 
        switch (role) {
            case "HR":
                return await prisma.$queryRaw<Employee[]>`
                    SELECT e.id, e.name, e.email, e.phone, d.name as department, p.title as position, r.name as role, e.hire_date, e.status, e.code
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                `
            case "Manager":
                return await prisma.$queryRaw<Employee[]>`
                    SELECT e.id, e.name, e.email, e.phone, d.name as department, p.title as position, r.name as role, e.hire_date, e.status, e.code
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    WHERE e.department_id = (SELECT department_id FROM employee WHERE id = ${userId}::uuid)                
                `
            default:
                return { status: false, error: "Forbidden"}
        }
    },

    async getEmployeeById(userId: string) { 
        return await prisma.$queryRaw<Employee[]>`
            SELECT e.*
            FROM employee e
            JOIN user_credentials uc ON uc.employee_id = e.id
            WHERE e.id = ${userId}::uuid        
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
                INSERT INTO employee (code, name, email, phone, department_id, position_id, role_id, hire_date, status)
                VALUES (${code}, ${name}, ${email}, ${phone}, ${departmentId}::uuid, ${positionId}::uuid, ${roleId}, NOW(), ${'ACTIVE'}::"Status")
                RETURNING id, code, email
            )
            INSERT INTO user_credentials (email, password, employee_id, code)
            SELECT email, ${'1234'}, id, code FROM inserted_employee
            RETURNING *
        `
    },

    async updateEmployee(userId: string, code: string, name: string, email: string, phone: string, departmentId: string, positionId: string, roleId: number, status: string) { 
        return await prisma.$executeRaw`
            UPDATE employee 
            SET code = ${code}, name = ${name}, email = ${email}, phone = ${phone}, department_id = ${departmentId}::uuid, position_id = ${positionId}::uuid, role_id = ${roleId}, status = ${status}::"Status"
            WHERE id = ${userId}::uuid
        `
    },

    async deleteEmployee(userId: string) { 
        return await prisma.$executeRaw`
            DELETE FROM employee WHERE id = ${userId}::uuid
        `
    }

}