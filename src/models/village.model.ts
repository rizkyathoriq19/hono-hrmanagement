import { prisma } from "@/lib/encryption"

export const villageModel = {
    async getAll() { 
        return await prisma.$queryRaw`
            SELECT v.id, v.name, v.alt_name, d.id as district_id, d.name as district_name, v.created_at, v.updated_at, v.deleted_at 
            FROM village v
            JOIN district d ON d.id = v.district_id
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
            INSERT INTO city (id, district_id, name, alt_name, latitude, longitude)
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
    }
}