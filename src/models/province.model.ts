import { prisma } from "@/lib/encryption"
import { IProvince } from "@/types/province.type"

export const provinceModel = {
    async getAll() { 
        return await prisma.$queryRaw<IProvince[]>`
            SELECT p.id, p.name, p.alt_name, c.id as country_id, c.name as country_name, p.created_at, p.updated_at, p.deleted_at 
            FROM province p
            JOIN country c ON c.id = p.country_id
        `
    },

    async getById(id: number) { 
        return await prisma.$queryRaw`
            SELECT p.id, p.name, p.alt_name, c.id as country_id, c.name as country_name, p.created_at, p.updated_at, p.deleted_at 
            FROM province p
            JOIN country c ON c.id = p.country_id
            WHERE p.id = ${id}
        `
    },

    async add(id: number, country_id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            INSERT INTO province (id, country_id, name, alt_name, latitude, longitude)
            VALUES (${id}, ${country_id}, ${name}, ${alt_name}, ${latitude}, ${longitude})
        `
    },

    async update(id: number, country_id: number, name: string, alt_name: string, latitude: number, longitude: number) { 
        return await prisma.$executeRaw`
            UPDATE province
            SET country_id = ${country_id}, name = ${name}, alt_name = ${alt_name}, latitude = ${latitude}, longitude = ${longitude}
            WHERE id = ${id}
        `
    },

    async delete(id: number) { 
        return await prisma.$executeRaw`
            DELETE FROM province
            WHERE id = ${id}
        `
    },

    async getTotal() { 
        return await prisma.$queryRaw<{total: number}[]>`
            SELECT COUNT(*) as total
            FROM province
        `
    }
}