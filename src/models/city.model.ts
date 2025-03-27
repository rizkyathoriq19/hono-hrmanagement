import { prisma } from "@/lib/encryption"

export const cityModel = {
    async getAll() { 
        return await prisma.$queryRaw`
            SELECT c.id, c.name, c.alt_name, p.id as province_id, p.name as province_name, c.created_at, c.updated_at, c.deleted_at 
            FROM city c
            JOIN province p ON p.id = c.province_id
        `
    },

    async getById(id: number) { 
        return await prisma.$queryRaw`
            SELECT c.id, c.name, c.alt_name, p.id as province_id, p.name as province_name, c.created_at, c.updated_at, c.deleted_at 
            FROM city c
            JOIN province p ON p.id = c.province_id
            WHERE c.id = ${id}
        `
    },

    async add(id: number, province_id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            INSERT INTO city (id, province_id, name, alt_name, latitude, longitude)
            VALUES (${id}, ${province_id}, ${name}, ${alt_name}, ${latitude}, ${longitude})
        `
    },

    async update(id: number, province_id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            UPDATE city
            SET province_id = ${province_id}, name = ${name}, alt_name = ${alt_name}, latitude = ${latitude}, longitude = ${longitude}
            WHERE id = ${id}
        `
    },

    async delete(id: number) { 
        return await prisma.$executeRaw`
            DELETE FROM city
            WHERE id = ${id}
        `
    }
}