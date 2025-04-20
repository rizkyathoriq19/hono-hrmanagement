import { prisma } from "@/lib/encryption"
import { IDistrict } from "@/types/district.type"

export const districtModel = {
    async getAll() { 
        return await prisma.$queryRaw<IDistrict[]>`
            SELECT d.id, d.name, d.alt_name, p.id as province_id, p.name as province_name, c.id as city_id, c.name as city_name, d.created_at, d.updated_at, d.deleted_at 
            FROM district d
            JOIN city c ON c.id = d.city_id
            JOIN province p ON p.id = c.province_id
            ORDER BY d.updated_at DESC
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
            INSERT INTO district (id, city_id, name, alt_name, latitude, longitude)
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
    },

    async getLastId(province_id: number, city_id: number) {
        return await prisma.$queryRaw<{ id: number }[]>`
            SELECT id
            FROM district
            WHERE CAST(id AS TEXT) LIKE ${province_id.toString() + city_id.toString() + '%'}
            ORDER BY id DESC
            LIMIT 1
        `
    }
}