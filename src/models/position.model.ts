import { prisma } from "@/lib/encryption"

export const positionModel = {
    async getAll() { 
        return await prisma.$queryRaw`
            SELECT p.id, p.name, p.alt_name, d.id as department_id, d.name as department_name, p.created_at, p.updated_at, p.deleted_at 
            FROM position p
            JOIN department d ON d.id = p.department_id
            ORDER BY d.name ASC
        `
    },

    async getById(id: string) { 
        return await prisma.$queryRaw`
            SELECT p.id, p.name, p.alt_name, d.id as department_id, d.name as department_name, p.created_at, p.updated_at, p.deleted_at 
            FROM position p
            JOIN department d ON d.id = p.department_id
            WHERE p.id = ${id}::uuid
        `
    },

    async add(name: string, alt_name: string, department_id: string) { 
        return await prisma.$executeRaw`
            INSERT INTO position (name, alt_name, department_id)
            VALUES (${name}, ${alt_name}, ${department_id}::uuid)
        `
    },

    async update(id: string, name: string, alt_name: string, department_id: string) { 
        return await prisma.$executeRaw`
            UPDATE position
            SET name = ${name}, alt_name = ${alt_name}, department_id = ${department_id}::uuid 
            WHERE id = ${id}::uuid
        `
    },

    async delete(id: string) { 
        return await prisma.$executeRaw`
            DELETE FROM position
            WHERE id = ${id}::uuid
        `
    }
}