import { prisma } from "@/lib/encryption"
import { IVillage } from "@/types/village.type"

export const villageModel = {
    async getAll() { 
        return await prisma.$queryRaw<IVillage[]>`
            SELECT v.id, v.name, v.alt_name, p.id as province_id, p.name as province_name, c.id as city_id, c.name as city_name, d.id as district_id, d.name as district_name, v.created_at, v.updated_at, v.deleted_at 
            FROM village v
            JOIN district d ON d.id = v.district_id
            JOIN city c ON c.id = d.city_id
            JOIN province p ON p.id = c.province_id
            ORDER BY v.updated_at DESC
        `
    },

    async getById(id: number) { 
        return await prisma.$queryRaw`
            SELECT v.id, v.name, v.alt_name, d.id as district_id, d.name as district_name, v.created_at, v.updated_at, v.deleted_at 
            FROM village v
            JOIN district d ON d.id = v.district_id
            WHERE v.id = ${id}
        `
    },

    async add(id: number, district_id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            INSERT INTO village (id, district_id, name, alt_name, latitude, longitude)
            VALUES (${id}, ${district_id}, ${name}, ${alt_name}, ${latitude}, ${longitude})
        `
    },

    async update(id: number, district_id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            UPDATE village
            SET district_id = ${district_id}, name = ${name}, alt_name = ${alt_name}, latitude = ${latitude}, longitude = ${longitude}
            WHERE id = ${id}
        `
    },

    async delete(id: number) { 
        return await prisma.$executeRaw`
            DELETE FROM village
            WHERE id = ${id}
        `
    },

    async getLastId(province_id: number, city_id: number, district_id: number) {
        return await prisma.$queryRaw<{ id: number }[]>`
            SELECT id
            FROM district
            WHERE CAST(id AS TEXT) LIKE ${province_id.toString() + city_id.toString() + district_id.toString() + '%'}
            ORDER BY id DESC
            LIMIT 1
        `
    }    
}