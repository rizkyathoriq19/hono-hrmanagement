import { prisma } from "@/lib/encryption"

export const districtModel = {
    async getAll() { 
        return await prisma.$queryRaw`
            SELECT d.id, d.name, d.alt_name, c.id as city_id, c.name as city_name, d.created_at, d.updated_at, d.deleted_at 
            FROM district d
            JOIN city c ON p.id = d.city_id
        `
    },

    async getById(id: number) { 
        return await prisma.$queryRaw`
            SELECT d.id, d.name, d.alt_name, c.id as city_id, c.name as city_name, d.created_at, d.updated_at, d.deleted_at 
            FROM district d
            JOIN city c ON c.id = d.city_id
            WHERE d.id = ${id}
        `
    },

    async add(id: number, city_id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            INSERT INTO city (id, city_id, name, alt_name, latitude, longitude)
            VALUES (${id}, ${city_id}, ${name}, ${alt_name}, ${latitude}, ${longitude})
        `
    },

    async update(id: number, city_id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            UPDATE district
            SET city_id = ${city_id}, name = ${name}, alt_name = ${alt_name}, latitude = ${latitude}, longitude = ${longitude}
            WHERE id = ${id}
        `
    },

    async delete(id: number) { 
        return await prisma.$executeRaw`
            DELETE FROM district
            WHERE id = ${id}
        `
    }
}