import { prisma } from "@/lib/encryption"

export const roleModel = {
    async getAll() { 
        return await prisma.$queryRaw`
            SELECT r.id, r.name, r.created_at, r.updated_at, r.deleted_at 
            FROM role r
        `
    },

    async getById(id: number) { 
        return await prisma.$queryRaw`
            SELECT r.id, r.name, r.created_at, r.updated_at, r.deleted_at 
            FROM role r
            WHERE r.id = ${id}
        `
    },

    async add(id: number, name: string) { 
        return await prisma.$executeRaw`
            INSERT INTO role (id, name)
            VALUES (${id}, ${name})
        `
    },

    async update(id: number, name: string) { 
        return await prisma.$executeRaw`
            UPDATE role
            SET name = ${name}
            WHERE id = ${id}
        `
    },

    async delete(id: number) { 
        return await prisma.$executeRaw`
            DELETE FROM role
            WHERE id = ${id}
        `
    }
}