import { prisma } from "@/lib/encryption"

export const authModel = {
    async userByIdentifier(identifier: string, password: string) {
        return await prisma.$queryRaw<{id: string, role: string,}[]>`
            SELECT e.id, e.role_id as role
            FROM user_credentials uc
            JOIN employee e ON uc.employee_id = e.id
            WHERE (uc.code = ${identifier} OR uc.email = ${identifier})
            AND uc.password = crypt(${password}, uc.password)
        `
    },
    
    async getLoginData(identifier: string) {
        return await prisma.$queryRaw`
            SELECT e.id, e.name, r.id as role_id, r.name as role_name
            FROM employee e
            JOIN role r ON e.role_id = r.id
            WHERE e.id = (SELECT employee_id FROM user_credentials WHERE code = ${identifier} OR email = ${identifier})
        `
    },

    async getDepartment() {
        return await prisma.$queryRaw<{ id: string, name: string }[]>`
            SELECT d.id, d.name
            FROM department d
        `
    },

    async getPosition(department_id: string) { 
        return await prisma.$queryRaw`
            SELECT p.id, p.name
            FROM position p
            WHERE p.department_id = ${department_id}::uuid
        `
    },

    async getRole() { 
        return await prisma.$queryRaw`
            SELECT r.id, r.name
            FROM role r
        `
    }
}