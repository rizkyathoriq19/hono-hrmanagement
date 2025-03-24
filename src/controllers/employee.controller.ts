import type { Context } from "hono"
import { z } from "zod"
import { employeeModel } from "@/models/employee.model"
import { employeeService } from "@/services/employee.service"
import { res } from "@/utils/response"
import { IEmployee, TRegister, TUpdate, TStatus } from "@/types/employee.type"

const registerValidationSchema = z.object({
    code: z.string().nonempty({message: "ID is required"}),
    name: z.string().nonempty({message: "Name is required"}),
    email: z.string().email({message: "Invalid email"}).nonempty({message: "Email is required"}),
    phone: z.string(),
    department: z.string().nonempty({message: "Department is required"}),
    position: z.string().nonempty({message: "Position is required"}),
    role: z.number({message: "Role is required"}),
    hire_date: z.date({ message: "Invalid date" }),
    identification_no: z.string().nonempty({message: "Identification number is required"}),
    image: z.string(),
    birth_date: z.date({ message: "Invalid date" }),
    birth_place: z.string(),
    gender: z.enum(["Male", "Female"]),
    blood_type: z.enum(["A", "B", "AB", "O"]),
    address: z.string().nonempty({message: "Address is required"}),
    village: z.string().nonempty({ message: "Village is required" }),
    district: z.string().nonempty({ message: "District is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    province: z.string().nonempty({ message: "Province is required" }),
    country: z.string().nonempty({ message: "Country is required" }),
    zip_code: z.string().nonempty({ message: "Zip code is required" }),
    religion: z.enum(["Islam", "Christian", "Catholic", "Hindu", "Buddha", "Confucian", "Other"], { message: "Invalid religion" }),
    married_status: z.enum(["Single", "Married", "Divorced", "Widowed"], { message: "Invalid married status" }),
    citizen_status: z.enum(["Citizen", "Permanent_Resident", "Temporary_Resident", "Foreigner"], { message: "Invalid citizen status" }),
    manager: z.string(),
})

const formatEmployeesData = (employees: IEmployee) => ({
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
})

const formatEmployeeData = (employee: IEmployee) => ({
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
    gender: employee.gender,
    blood_type: employee.blood_type,
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
        id: Number(employee.country_id),
        name: employee.country_name,
    },
    zip_code: employee.zip_code,
    religion: employee.religion,
    married_status: employee.married_status,
    citizen_status: employee.citizen_status,
    is_active: employee.is_active,
    created_at: employee.created_at,
    updated_at: employee.updated_at,
});

export const employeeController = {
    async getEmployees(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")

            const c_page = Number(c.req.query("page")) || 1
            const p_limit = Number(c.req.query("limit")) || 10
            const search = c.req.query("search")
            const t_items = await employeeModel.totalEmployee()
            const t_page = Math.ceil(t_items[0].total / p_limit)
            
            const result = await employeeModel.getEmployees(user.role, user.id, c_page, p_limit, search)

            return res(c, 'get', 200, "Get all employee success", result.map(formatEmployeesData), c_page, t_page, t_items[0].total)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")       
        }
    },

    async addEmployee(c: Context) {
        const body = await c.req.json<TRegister>()
        const { code, name, email, phone, departmentId, positionId, roleId, hire_date, identification_no, image, birth_date, birth_place, gender, blood_type, address, village, district, city, province, country, zip_code, religion, married_status, citizen_status, managerId } = body

        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            await registerValidationSchema.parseAsync(body)

            const result = await employeeModel.addEmployee(
                code, name, email, phone, departmentId, positionId, roleId, hire_date, identification_no, image, birth_date, birth_place, gender, blood_type, address, village, district, city, province, country, zip_code, religion, married_status, citizen_status, managerId
            )
            
            if (!result) return res(c, 'err', 500, "Failed to add employee")
            return res(c, 'post', 201, "Add employee success")
        } catch (error) {
            return res(c, 'err', 500, error instanceof z.ZodError 
                ? error.errors.map(e => e.message).join(", ") : error instanceof Error
                    ? error.message : "Internal server error")     
        }
    },

    async getEmployeeById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const userId = c.req.param("id")
            if (!userId.length) return res(c, 'err', 404, "Employee not found")

            const result = await employeeModel.getEmployeeById(userId)
            
            return res(c, 'getDetail', 200, "Get employee success", result.map(formatEmployeeData)[0])           
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")  
        }
    },
        
    async updateEmployee(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
                
            const body = await c.req.json<TUpdate>()
            const { code, name, email, phone, departmentId, positionId, roleId, hire_date, identification_no, image, birth_date, birth_place, gender, blood_type, address, village, district, city, province, country, zip_code, religion, married_status, citizen_status, managerId} = body

            const userId = c.req.param("id")
            const getEmployeeId = await employeeModel.getEmployeeById(userId)

            if (!getEmployeeId.length) return res(c, 'err', 404, "Employee not found")

            if (user.role === "Staff" && user.id !== userId) { 
                return res(c, 'err', 403, "Forbidden")
            }

            const result = await employeeModel.updateEmployee(
                userId, code, name, email, phone, departmentId, positionId, roleId, hire_date, identification_no, image, birth_date, birth_place, gender, blood_type, address, village, district, city, province, country, zip_code, religion, married_status, citizen_status, managerId
            )

            return res(c, 'put', 200, "Update employee success")
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")  
        }
    },

    async deleteEmployee(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const userId = c.req.param("id") 
            const getEmployeeId = await employeeModel.getEmployeeById(userId)

            if (!getEmployeeId.length) return res(c, 'err', 404, "Employee not found")           

            if ((user.role === "Staff"  || user.role === "Manager") && user.id !== userId) { 
                return res(c, 'err', 403, "Forbidden")
            }
            
            const result = await employeeModel.deleteEmployee(userId)

            return res(c, 'delete', 200, "Delete employee success")
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error") 
        }
    },

    async statusEmployee(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const body = await c.req.json<TStatus>()
            const { status } = body

            const userId = c.req.param("id")

            const result = await employeeModel.inactiveEmployee(userId, status)

            const message = status == 'ACTIVE' ? "Active employee success" : "Inactive employee success"
            return res(c, 'patch', 200, message)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error") 
        }
    },

    async generateEmployeeCode(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const { hire_date, department_id } = await c.req.json<{ hire_date: string, department_id: string }>()

            const date = employeeService.parseDate(hire_date)
            const generateCode = await employeeService.generateEmployeeCode(date, department_id)

            return res(c, 'getDetail', 200, "Generate employee code success", generateCode)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error") 
        }
    }
}