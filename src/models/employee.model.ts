import { prisma } from "@/lib/encryption"
import { IEmployee } from "@/types/employee.type"

export const employeeModel = {
    async getEmployees(role: string, userId: string, c_page: number, p_limit: number, search: string = '', fDepartment?: string, fPosition?: string, fRole?: number) {
        const searchQuery = `%${search}%`
        const dQuery = fDepartment ? `%${fDepartment}%` : null
        const pQuery = fPosition ? `%${fPosition}%` : null
        const rQuery = fRole && fRole > 0 ? fRole : null

        switch (role) {
            case "HR":
                return await prisma.$queryRaw<IEmployee[]>`
                    SELECT e.id, e.name, e.email, e.phone, 
                        d.id as department_id, d.name as department_name, 
                        p.id as position_id, p.name as position_name, 
                        r.id as role_id, r.name as role_name, 
                        e.manager_id, m.name as manager_name,
                        e.hire_date, e.status, e.code, e.identification_no, e.image,
                        e.birth_date, e.birth_place, e.gender_id, e.blood_type_id, e.address,
                        vil.id as village_id, vil.name as village_name,
                        dis.id as district_id, dis.name as district_name,
                        city.id as city_id, city.name as city_name,
                        prov.id as province_id, prov.name as province_name,
                        cnt.id as country_id, cnt.name as country_name,
                        e.zip_code, e.religion_id, e.married_status_id, e.citizen_status_id,
                        e.created_at, e.updated_at
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    JOIN village vil ON e.village_id = vil.id
                    JOIN district dis ON e.district_id = dis.id
                    JOIN city city ON e.city_id = city.id
                    JOIN province prov ON e.province_id = prov.id
                    JOIN country cnt ON e.country_id = cnt.id
                    LEFT JOIN employee m ON e.manager_id = m.id
                    WHERE (
                        (e.name ILIKE ${searchQuery} OR e.code ILIKE ${searchQuery})
                        AND (d.id::TEXT ILIKE COALESCE(${dQuery}::TEXT, d.id::TEXT))
                        AND (p.id::TEXT ILIKE COALESCE(${pQuery}::TEXT, p.id::TEXT)) 
                        AND (r.id = COALESCE(${rQuery}::INTEGER, r.id))
                    )
                    AND e.deleted_at IS NULL
                    ORDER BY e.updated_at DESC
                    LIMIT ${p_limit} OFFSET ${(c_page - 1) * p_limit}
                `
            case "Manager":
                return await prisma.$queryRaw<IEmployee[]>`
                    SELECT e.id, e.name, e.email, e.phone, 
                        d.id as department_id, d.name as department_name, 
                        p.id as position_id, p.name as position_name, 
                        r.id as role_id, r.name as role_name, 
                        e.manager_id, m.name as manager_name,
                        e.hire_date, e.status, e.code, e.identification_no, e.image,
                        e.birth_date, e.birth_place, e.gender_id, e.blood_type_id, e.address,
                        vil.id as village_id, vil.name as village_name,
                        dis.id as district_id, dis.name as district_name,
                        city.id as city_id, city.name as city_name,
                        prov.id as province_id, prov.name as province_name,
                        cnt.id as country_id, cnt.name as country_name,
                        e.zip_code, e.religion_id, e.married_status_id, e.citizen_status_id,
                        e.created_at, e.updated_at
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    JOIN village vil ON e.village_id = vil.id
                    JOIN district dis ON e.district_id = dis.id
                    JOIN city city ON e.city_id = city.id
                    JOIN province prov ON e.province_id = prov.id
                    JOIN country cnt ON e.country_id = cnt.id
                    LEFT JOIN employee m ON e.manager_id = m.id
                    WHERE (
                        (e.name ILIKE ${searchQuery} OR e.code ILIKE ${searchQuery})
                        AND (p.id::TEXT ILIKE COALESCE(${pQuery}::TEXT, p.id::TEXT)) 
                        AND (r.id = COALESCE(${rQuery}::INTEGER, r.id))
                    )
                    AND e.department_id = (SELECT department_id FROM employee WHERE id = ${userId}::uuid)
                    AND e.deleted_at IS NULL                
                    ORDER BY e.updated_at DESC
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
                e.manager_id, m.name as manager_name,
                e.hire_date, e.status, e.code, e.identification_no, e.image,
                e.birth_date, e.birth_place, 
                gen.id as gender_id, gen.name as gender_name, 
                bt.id as blood_type_id, bt.name as blood_type_name, e.address,
                vil.id as village_id, vil.name as village_name,
                dis.id as district_id, dis.name as district_name,
                city.id as city_id, city.name as city_name,
                prov.id as province_id, prov.name as province_name,
                cnt.id as country_id, cnt.name as country_name,
                e.zip_code, reli.id as religion_id, reli.name as religion_name, 
                ms.id as married_status_id, ms.name as married_status_name, 
                cs.id as citizen_status_id, cs.name as citizen_status_name,
                e.created_at, e.updated_at
            FROM employee e
            JOIN department d ON e.department_id = d.id
            JOIN position p ON e.position_id = p.id
            JOIN role r ON e.role_id = r.id
            JOIN gender gen ON e.gender_id = gen.id
            JOIN blood_type bt ON e.blood_type_id = bt.id
            JOIN village vil ON e.village_id = vil.id
            JOIN district dis ON e.district_id = dis.id
            JOIN city city ON e.city_id = city.id
            JOIN province prov ON e.province_id = prov.id
            JOIN country cnt ON e.country_id = cnt.id
            JOIN religion reli ON e.religion_id = reli.id
            JOIN married_status ms ON e.married_status_id = ms.id
            JOIN citizen_status cs ON e.citizen_status_id = cs.id
            LEFT JOIN employee m ON e.manager_id = m.id
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

    async addEmployee(code: string, name: string, email: string, phone: string, departmentId: string, positionId: string, roleId: number, hire_date: Date, identificationNumber: string, image: string, birthDate: Date, birthPlace: string, gender: number, bloodType: number, address: string, villageId: number, districtId: number, cityId: number, provinceId: number, countryId: number, zipCode: string, religion: number, marriedStatus: number, citizenStatus: number) {
        return await prisma.$executeRaw`
            WITH inserted_employee AS (
                INSERT INTO employee (code, name, email, phone, department_id, position_id, role_id, hire_date, identification_no, image, birth_date, birth_place, gender_id, blood_type_id, address, village_id, district_id, city_id, province_id, country_id, zip_code, religion_id, married_status_id, citizen_status_id, status)
                VALUES (${code}, ${name}, ${email}, ${phone}, ${departmentId}::uuid, ${positionId}::uuid, ${roleId}, ${hire_date}::date, ${identificationNumber}, ${image}, ${birthDate}::date, ${birthPlace}, ${gender}, ${bloodType}, ${address}, ${villageId}, ${districtId}, ${cityId}, ${provinceId}, ${countryId}, ${zipCode}, ${religion}, ${marriedStatus}, ${citizenStatus}, ${"ACTIVE"}::"Status")
                RETURNING id, code, email
            )
            INSERT INTO user_credentials (email, password, employee_id, code)
            SELECT email, ${'1234'}, id, code FROM inserted_employee
            RETURNING *
        `
    },

    async updateEmployee(userId: string, code: string, name: string, email: string, phone: string, departmentId: string, positionId: string, roleId: number, hire_date: Date, identificationNumber: string, image: string | null, birthDate: Date, birthPlace: string, gender: number, bloodType: number, address: string, villageId: number, districtId: number, cityId: number, provinceId: number, countryId: number, zipCode: string, religion: number, marriedStatus: number, citizenStatus: number) {
        return await prisma.$executeRaw`
            UPDATE employee 
            SET code = ${code}, name = ${name}, email = ${email}, phone = ${phone}, department_id = ${departmentId}::uuid, position_id = ${positionId}::uuid, role_id = ${roleId}, hire_date = ${hire_date}::date, identification_no = ${identificationNumber}, image = ${image}, birth_date = ${birthDate}::date, birth_place = ${birthPlace}, gender_id = ${gender}, blood_type_id = ${bloodType}, address = ${address}, village_id = ${villageId}, district_id = ${districtId}, city_id = ${cityId}, province_id = ${provinceId}, country_id = ${countryId}, zip_code = ${zipCode}, religion_id = ${religion}, married_status_id = ${marriedStatus}, citizen_status_id = ${citizenStatus}
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

    async totalFilteredEmployees(role: string, userId: string, search: string = '', fDepartment?: string, fPosition?: string, fRole?: number) {
        const searchQuery = `%${search}%`
        const dQuery = fDepartment ? `%${fDepartment}%` : null
        const pQuery = fPosition ? `%${fPosition}%` : null
        const rQuery = fRole && fRole > 0 ? fRole : null

        switch (role) {
            case "HR":
                return await prisma.$queryRaw<{ total: number }[]>`
                    SELECT COUNT(*)::int as total
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    WHERE (
                        (e.name ILIKE ${searchQuery} OR e.code ILIKE ${searchQuery})
                        AND (d.id::TEXT ILIKE COALESCE(${dQuery}::TEXT, d.id::TEXT))
                        AND (p.id::TEXT ILIKE COALESCE(${pQuery}::TEXT, p.id::TEXT)) 
                        AND (r.id = COALESCE(${rQuery}::INTEGER, r.id))
                    )
                    AND e.deleted_at IS NULL
                `
            case "Manager":
                return await prisma.$queryRaw<{ total: number }[]>`
                    SELECT COUNT(*)::int as total
                    FROM employee e
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    JOIN role r ON e.role_id = r.id
                    WHERE (
                        (e.name ILIKE ${searchQuery} OR e.code ILIKE ${searchQuery})
                        AND (p.id::TEXT ILIKE COALESCE(${pQuery}::TEXT, p.id::TEXT)) 
                        AND (r.id = COALESCE(${rQuery}::INTEGER, r.id))
                    )
                    AND e.department_id = (SELECT department_id FROM employee WHERE id = ${userId}::uuid)
                    AND e.deleted_at IS NULL   
                `
            default:
                return [{ total: 0 }]
        }
    },

    async inactiveEmployee(userId: string, status: string) { 
        return await prisma.$executeRaw`
            UPDATE employee
            SET status = ${status}::"Status"
            WHERE id = ${userId}::uuid
        `
    },

    async getLastEmployeeCode(year: string, month: string, department_id: string) { 
        return await prisma.$queryRaw<{ code: string }[]>`
            SELECT code
            FROM employee
            WHERE TO_CHAR(hire_date, 'YY') = ${year}
            AND TO_CHAR(hire_date, 'MM') = ${month}
            AND department_id = ${department_id}::uuid
            ORDER BY code DESC
            LIMIT 1
        `
    },    

}