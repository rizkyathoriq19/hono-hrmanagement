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
    }
}