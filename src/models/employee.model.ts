import { prisma } from "@/lib/encryption"
import type { Employee } from "@prisma/client"

export const employeeModel = {
    async getEmployees(role: string, userId: string, c_page: number, p_limit: number, search: string = '') {
        const searchQuery = `%${search}%`
        switch (role) {
            case "HR":
                return await prisma.$queryRaw<Employee[]>`
                    SELECT e.id, e.name, e.email, e.phone, 
                        d.id as department_id, d.name as department_name, 
                        p.id as position_id, p.name as position_name, 
                        r.id as role_id, r.name as role_name, 
                        e.hire_date, e.status, e.code
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    WHERE e.name ILIKE ${searchQuery}
                    OR e.code ILIKE ${searchQuery}
                    ORDER BY e.hire_date ASC
                    LIMIT ${p_limit} OFFSET ${(c_page - 1) * p_limit}
                `
            case "Manager":
                return await prisma.$queryRaw<Employee[]>`
                    SELECT e.id, e.name, e.email, e.phone, 
                        d.id as department_id, d.name as department_name, 
                        p.id as position_id, p.name as position_name, 
                        r.id as role_id, r.name as role_name, 
                        e.hire_date, e.status, e.code
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    WHERE e.name ILIKE ${searchQuery}
                    OR e.code ILIKE ${searchQuery}
                    ORDER BY e.hire_date ASC
                    LIMIT ${p_limit} OFFSET ${(c_page - 1) * p_limit}                    
                    WHERE e.department_id = (SELECT department_id FROM employee WHERE id = ${userId}::uuid)                
                `
            default:
                return { status: false, error: "Forbidden" }
        }
    },

    async getEmployeeById(userId: string) {
        return await prisma.$queryRaw<Employee[]>`
            SELECT e.id, e.name, e.email, e.phone, 
                d.id as department_id, d.name as department_name, 
                p.id as position_id, p.name as position_name, 
                r.id as role_id, r.name as role_name, 
                e.hire_date, e.status, e.code
            FROM employee e
            JOIN department d ON e.department_id = d.id
            JOIN position p ON e.position_id = p.id
            JOIN role r ON e.role_id = r.id
            WHERE e.id = ${userId}::uuid        
        `
    },

    async getDepartmentByName(name: string) {
        return await prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM department WHERE name = ${name}
        `
    },

    async getPositionByName(name: string) {
        return await prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM position WHERE name = ${name}
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

    async updateEmployee(userId: string, code: string, name: string, email: string, phone: string, departmentId: string, positionId: string, roleId: number) {
        return await prisma.$executeRaw`
            UPDATE employee 
            SET code = ${code}, name = ${name}, email = ${email}, phone = ${phone}, department_id = ${departmentId}::uuid, position_id = ${positionId}::uuid, role_id = ${roleId}
            WHERE id = ${userId}::uuid
        `
    },

    async deleteEmployee(userId: string) {
        return await prisma.$executeRaw`
            DELETE FROM employee WHERE id = ${userId}::uuid
        `
    },

    async totalEmployee() {
        return await prisma.$queryRaw <{
            total: number
        }[]>`
            SELECT COUNT(*)::int as total FROM employee
        `
    },

    async inactiveEmployee(userId: string, status: string) { 
        return await prisma.$executeRaw`
            UPDATE employee
            SET status = ${status}::"Status"
            WHERE id = ${userId}::uuid
        `
    }

}