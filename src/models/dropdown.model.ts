import { prisma } from "@/lib/encryption"

export const dropdownModel = {
    async getDepartment() {
        return await prisma.$queryRaw<{ id: string, name: string }[]>`
            SELECT d.id, d.name
            FROM department d
        `
    },

    async getPosition(department_id: string) { 
        return await prisma.$queryRaw<{ id: string, name: string }[]>`
            SELECT p.id, p.name
            FROM position p
            WHERE p.department_id = ${department_id}::uuid
        `
    },

    async getRole() { 
        return await prisma.$queryRaw`
            SELECT r.id, r.name
            FROM role r
        `
    },

    async getCountry() {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM country
        `
    },

    async getProvince(countryId: number) {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM province
            WHERE country_id = ${countryId}
        `
    },

    async getCity(provinceId: number) {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM city
            WHERE province_id = ${provinceId}
        `

    },

    async getDistrict(cityId: number) { 
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM district
            WHERE city_id = ${cityId}
        `
    },

    async getVillage(districId: number) {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM village
            WHERE district_id = ${districId}
        `
    },

    async getGender() {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM gender
        `
    },

    async getBloodType() {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM blood_type
        `
    },
    
    async getReligion() {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM religion
        `
    },
    
    async getMarriedStatus() {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM married_status
        `
    },
    
    async getCitizenStatus() {
        return await prisma.$queryRaw<{id: number, name: string}[]>`
            SELECT id, name
            FROM citizen_status
        `
    },    
}