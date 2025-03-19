import { prisma } from "@/lib/encryption"
import { IEmployee } from "@/types/employee.type"

export const employeeModel = {
    async getEmployees(role: string, userId: string, c_page: number, p_limit: number, search: string = '') {
        const searchQuery = `%${search}%`
        switch (role) {
            case "HR":
                return await prisma.$queryRaw<IEmployee[]>`
                    SELECT e.id, e.name, e.email, e.phone, 
                        d.id as department_id, d.name as department_name, 
                        p.id as position_id, p.name as position_name, 
                        r.id as role_id, r.name as role_name, 
                        e.hire_date, e.status, e.code, e.identification_no, e.image,
                        e.birth_date, e.birth_place, e.gender, e.blood_type, e.address,
                        vil.id as village_id, vil.name as village_name,
                        dis.id as district_id, dis.name as district_name,
                        city.id as city_id, city.name as city_name,
                        prov.id as province_id, prov.name as province_name,
                        cnt.id as country_id, cnt.name as country_name,
                        e.zip_code, e.religion, e.married_status, e.citizen_status,
                        e.is_active, e.created_at, e.updated_at
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    JOIN village vil ON e.village_id = vil.id
                    JOIN district dis ON e.district_id = dis.id
                    JOIN city city ON e.city_id = city.id
                    JOIN province prov ON e.province_id = prov.id
                    JOIN country cnt ON e.country_id = cnt.id
                    WHERE e.name ILIKE ${searchQuery}
                    OR e.code ILIKE ${searchQuery}
                    ORDER BY e.hire_date ASC
                    LIMIT ${p_limit} OFFSET ${(c_page - 1) * p_limit}
                `
            case "Manager":
                return await prisma.$queryRaw<IEmployee[]>`
                    SELECT e.id, e.name, e.email, e.phone, 
                        d.id as department_id, d.name as department_name, 
                        p.id as position_id, p.name as position_name, 
                        r.id as role_id, r.name as role_name, 
                        e.hire_date, e.status, e.code, e.identification_no, e.image,
                        e.birth_date, e.birth_place, e.gender, e.blood_type, e.address,
                        vil.id as village_id, vil.name as village_name,
                        dis.id as district_id, dis.name as district_name,
                        city.id as city_id, city.name as city_name,
                        prov.id as province_id, prov.name as province_name,
                        cnt.id as country_id, cnt.name as country_name,
                        e.zip_code, e.religion, e.married_status, e.citizen_status,
                        e.is_active, e.created_at, e.updated_at
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    JOIN village vil ON e.village_id = vil.id
                    JOIN district dis ON e.district_id = dis.id
                    JOIN city city ON e.city_id = city.id
                    JOIN province prov ON e.province_id = prov.id
                    JOIN country cnt ON e.country_id = cnt.id
                    WHERE (e.name ILIKE ${searchQuery}
                    OR e.code ILIKE ${searchQuery})
                    AND e.department_id = (SELECT department_id FROM employee WHERE id = ${userId}::uuid)                
                    ORDER BY e.hire_date ASC
                    LIMIT ${p_limit} OFFSET ${(c_page - 1) * p_limit}                    
                `
            default:
                return []
        }
    },

    async getEmployeeById(userId: string) {
        return await prisma.$queryRaw<IEmployee[]>`
            SELECT e.id, e.name, e.email, e.phone, 
                d.id as department_id, d.name as department_name, 
                p.id as position_id, p.name as position_name, 
                r.id as role_id, r.name as role_name, 
                e.hire_date, e.status, e.code, e.identification_no, e.image,
                e.birth_date, e.birth_place, e.gender, e.blood_type, e.address,
                vil.id as village_id, vil.name as village_name,
                dis.id as district_id, dis.name as district_name,
                city.id as city_id, city.name as city_name,
                prov.id as province_id, prov.name as province_name,
                cnt.id as country_id, cnt.name as country_name,
                e.zip_code, e.religion, e.married_status, e.citizen_status,
                e.is_active, e.created_at, e.updated_at
            FROM employee e
            JOIN department d ON e.department_id = d.id
            JOIN position p ON e.position_id = p.id
            JOIN role r ON e.role_id = r.id
            JOIN village vil ON e.village_id = vil.id
            JOIN district dis ON e.district_id = dis.id
            JOIN city city ON e.city_id = city.id
            JOIN province prov ON e.province_id = prov.id
            JOIN country cnt ON e.country_id = cnt.id
            WHERE e.id = ${userId}::uuid        
        `
    },

    async getDepartmentByName(name: string) {
        return await prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM department WHERE name = ${name}
        `
    },

    async getPositionByName(name: string) {
        return await prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM position WHERE name = ${name}
        `
    },

    async addEmployee(code: string, name: string, email: string, phone: string, departmentId: string, positionId: string, roleId: number, hire_date: Date, identificationNumber: string, image: string, birthDate: Date, birthPlace: string, gender: string, bloodType: string, address: string, villageId: number, districtId: number, cityId: number, provinceId: number, countryId: number, zipCode: string, religion: string, marriedStatus: string, citizenStatus: string) {
        return await prisma.$executeRaw`
            WITH inserted_employee AS (
                INSERT INTO employee (code, name, email, phone, department_id, position_id, role_id, hire_date, status, identification_no, image, birth_date, birth_place, gender, blood_type, address, village_id, district_id, city_id, province_id, country_id, zip_code, religion, married_status, citizen_status, is_active)
                VALUES (${code}, ${name}, ${email}, ${phone}, ${departmentId}::uuid, ${positionId}::uuid, ${roleId}, ${hire_date}, ${'ACTIVE'}::"Status", ${identificationNumber}, ${image}, ${birthDate}, ${birthPlace}, ${gender}, ${bloodType}, ${address}, ${villageId}, ${districtId}, ${cityId}, ${provinceId}, ${countryId}, ${zipCode}, ${religion}, ${marriedStatus}, ${citizenStatus}, ${true})
                RETURNING id, code, email
            )
            INSERT INTO user_credentials (email, password, employee_id, code)
            SELECT email, ${'1234'}, id, code FROM inserted_employee
            RETURNING *
        `
    },

    async updateEmployee(userId: string, code: string, name: string, email: string, phone: string, departmentId: string, positionId: string, roleId: number) {
        return await prisma.$executeRaw`
            UPDATE employee 
            SET code = ${code}, name = ${name}, email = ${email}, phone = ${phone}, department_id = ${departmentId}::uuid, position_id = ${positionId}::uuid, role_id = ${roleId}
            WHERE id = ${userId}::uuid
        `
    },

    async deleteEmployee(userId: string) {
        return await prisma.$executeRaw`
            DELETE FROM employee WHERE id = ${userId}::uuid
        `
    },

    async totalEmployee() {
        return await prisma.$queryRaw <{
            total: number
        }[]>`
            SELECT COUNT(*)::int as total FROM employee
        `
    },

    async inactiveEmployee(userId: string, status: string) { 
        return await prisma.$executeRaw`
            UPDATE employee
            SET status = ${status}::"Status"
            WHERE id = ${userId}::uuid
        `
    }

}