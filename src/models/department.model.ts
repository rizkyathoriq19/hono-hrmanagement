import { prisma } from "@/lib/encryption"

export const departmentModel = {
    async getAll() {
        return await prisma.$queryRaw`
            SELECT d.id, d.name, d.alt_name, d.created_at, d.updated_at, d.deleted_at 
            FROM department d
        `
    },

    async getById(id: string) {
        return await prisma.$queryRaw`
            SELECT d.id, d.name, d.alt_name, d.created_at, d.updated_at, d.deleted_at
            FROM department d
            WHERE id = ${id}::uuid
        `
    },

    async add(name: string, alt_name: string) {
        return await prisma.$executeRaw`
            INSERT INTO department (name, alt_name)
            VALUES (${name}, ${alt_name})
        `
    },

    async update(id: string, name: string, alt_name: string) {
        return await prisma.$executeRaw`
            UPDATE department
            SET name = ${name}, alt_name = ${alt_name} 
            WHERE id = ${id}::uuid
        `
    },

    async delete(id: string) {
        return await prisma.$executeRaw`
            DELETE FROM department
            WHERE id = ${id}::uuid
        `
    },

    async getAltName(id: string) { 
        return await prisma.$queryRaw<{id: string, alt_name: string}[]>`
            SELECT d.alt_name
            FROM department d
            WHERE d.id = ${id}::uuid
        `
    }
}