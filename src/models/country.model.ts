import { prisma } from "@/lib/encryption"

export const countryModel = {
    async getAll() { 
        return await prisma.$queryRaw`
            SELECT c.id, c.name, c.alt_name, c.created_at, c.updated_at, c.deleted_at 
            FROM country c
        `
    },

    async getById(id: number) { 
        return await prisma.$queryRaw`
            SELECT c.id, c.name, c.alt_name, c.created_at, c.updated_at, c.deleted_at 
            FROM country c
            WHERE c.id = ${id}
        `
    },

    async add(id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            INSERT INTO country (id, name, alt_name, latitude, longitude)
            VALUES (${id}, ${name}, ${alt_name}, ${latitude}, ${longitude})
        `
    },

    async update(id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            UPDATE country
            SET name = ${name}, alt_name = ${alt_name}, latitude = ${latitude}, longitude = ${longitude}
            WHERE id = ${id}
        `
    },

    async delete(id: number) { 
        return await prisma.$executeRaw`
            DELETE FROM country
            WHERE id = ${id}
        `
    }
}