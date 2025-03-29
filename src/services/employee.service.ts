import { employeeModel } from "@/models/employee.model"
import { departmentModel } from "@/models/department.model"
import { IEmployee } from "@/types/employee.type"

export const employeeService = {
    parseDate(dateString: string): Date {
        const [year, month, day] = dateString.split("-").map(Number)
        const fullYear = 2000 + year
        return new Date(fullYear, month - 1, day)
    },

    async generateEmployeeCode(hire_date: Date, department_id: string): Promise<string> { 
        try {
            const year = String(hire_date.getFullYear() % 100)
            const month = String(hire_date.getMonth() + 1).padStart(2, "0")
            
            const lastEmployee = await employeeModel.getLastEmployeeCode(year, month, department_id)
            const departmentAltName = await departmentModel.getAltName(department_id)
        
            let increment: string = '001'
            let departmentCode: string = departmentAltName[0].alt_name
            
            if (lastEmployee.length) {
                const lastIncrement = Number(lastEmployee[0].code.slice(-3)) + 1
                increment = lastIncrement.toString().padStart(3, "0")
            }

            return `${year}${month}${departmentCode}${increment}`
        } catch (error) {
            const err = error as Error
            return err.message
        }
    },

    formatEmployeesData(employees: IEmployee) {
        return {
            id: employees.id,
            name: employees.name,
            email: employees.email,
            phone: employees.phone,
            department: {
                id: employees.department_id,
                name: employees.department_name,
            },
            position: {
                id: employees.position_id,
                name: employees.position_name,
            },
            role: {
                id: employees.role_id,
                name: employees.role_name,
            },
            manager: {
                id: employees.manager_id,
                name: employees.manager_name
            },
            hire_date: employees.hire_date,
            status: employees.status,
            code: employees.code,
        }
    },
    
    formatEmployeeData(employee: IEmployee) {
        return {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            department: {
                id: employee.department_id,
                name: employee.department_name,
            },
            position: {
                id: employee.position_id,
                name: employee.position_name,
            },
            role: {
                id: employee.role_id,
                name: employee.role_name,
            },
            manager: {
                id: employee.manager_id,
                name: employee.manager_name
            },
            hire_date: employee.hire_date,
            status: employee.status,
            code: employee.code,
            identification_no: employee.identification_no,
            image: employee.image,
            birth_date: employee.birth_date,
            birth_place: employee.birth_place,
            gender: {
                id: employee.gender_id,
                name: employee.gender_name,
            },
            blood_type: {
                id: employee.blood_type_id,
                name: employee.blood_type_name,
            },
            address: employee.address,
            village: {
                id: Number(employee.village_id),
                name: employee.village_name,
            },
            district: {
                id: Number(employee.district_id),
                name: employee.district_name,
            },
            city: {
                id: Number(employee.city_id),
                name: employee.city_name,
            },
            province: {
                id: Number(employee.province_id),
                name: employee.province_name,
            },
            country: {
                id: employee.country_id,
                name: employee.country_name,
            },
            zip_code: employee.zip_code,
            religion: {
                id: employee.religion_id,
                name: employee.religion_name,
            },
            married_status: {
                id: employee.married_status_id,
                name: employee.married_status_name,
            },
            citizen_status: {
                id: employee.citizen_status_id,
                name: employee.citizen_status_name,
            },
            created_at: employee.created_at,
            updated_at: employee.updated_at,
        }
    }
}
