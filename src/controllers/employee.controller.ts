import type { Context } from "hono"
import { z } from "zod"
import { employeeModel } from "@/models/employee.model"
import { employeeService } from "@/services/employee.service"
import { res } from "@/utils/response"
import { TRegister, TUpdate, TStatus } from "@/types/employee.type"
import cloudinary from "@/utils/cloudinary"
import xlsx from "xlsx"
import { departmentModel } from "@/models/department.model"
import { positionModel } from "@/models/position.model"
import { roleModel } from "@/models/role.model"
import { dropdownModel } from "@/models/dropdown.model"
import { countryModel } from "@/models/country.model"
import { provinceModel } from "@/models/province.model"
import { cityModel } from "@/models/city.model"
import { districtModel } from "@/models/district.model"
import { villageModel } from "@/models/village.model"

const registerValidationSchema = z.object({
    code: z.string().nonempty({ message: "ID is required" }),
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }).nonempty({ message: "Email is required" }),
    phone: z.string(),
    department: z.string().nonempty({ message: "Department is required" }),
    position: z.string().nonempty({ message: "Position is required" }),
    role: z.number({ message: "Role is required" }),
    hire_date: z.string().nonempty({ message: "Hire date is required" }), 
    identification_no: z.string().nonempty({ message: "Identification number is required" }),
    image: z.instanceof(File, { message: "Image must be a file" }), 
    birth_date: z.string().nonempty({ message: "Birth date is required" }), 
    birth_place: z.string(),
    gender: z.coerce.number().int().min(1, { message: "Invalid gender" }),
    blood_type: z.coerce.number().int().optional(),
    address: z.string().nonempty({ message: "Address is required" }),
    village: z.coerce.number().int().min(1, { message: "Village must be a number" }),
    district: z.coerce.number().int().min(1, { message: "District must be a number" }),
    city: z.coerce.number().int().min(1, { message: "City must be a number" }),
    province: z.coerce.number().int().min(1, { message: "Province must be a number" }),
    country: z.coerce.number().int().min(1, { message: "Country must be a number" }),
    zip_code: z.string().nonempty({ message: "Zip code is required" }),
    religion: z.coerce.number().int().min(1, { message: "Religion must be a number" }),
    married_status: z.coerce.number().int().min(1, { message: "Married status must be a number" }),
    citizen_status: z.coerce.number().int().min(1, { message: "Citizen status must be a number" }),
    manager: z.string(),
});

export const employeeController = {
    async getEmployees(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")

            const c_page = Number(c.req.query("page")) || 1
            const p_limit = Number(c.req.query("limit")) || 10
            const search = c.req.query("search")
            const fDepartment = c.req.query("department")
            const fPosition = c.req.query("position")
            const fRole = Number(c.req.query("role"))

            const t_items = await employeeModel.totalFilteredEmployees(user.role, user.id, search, fDepartment, fPosition, fRole)
            const t_page = Math.ceil(t_items[0].total / p_limit)

            const result = await employeeModel.getEmployees(user.role, user.id, c_page, p_limit, search, fDepartment, fPosition, fRole)

            return res(c, 'get', 200, "Get all employee success", result.map(employeeService.formatEmployeesData), c_page, t_page, t_items[0].total)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")       
        }
    },

    async addEmployee(c: Context) {
        const formData = await c.req.formData()
        const formImage = await c.req.parseBody()

        const body = Object.fromEntries(formData) as unknown as TRegister
        const { code, name, email, phone, department, position, role, hire_date, identification_no, birth_date, birth_place, gender, blood_type, address, village, district, city, province, country, zip_code, religion, married_status, citizen_status } = body
        const file = formImage['image'] as File

        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            // await registerValidationSchema.parseAsync(body)
            
            const buffer = Buffer.from(await file.arrayBuffer())
            const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => { 
                cloudinary.uploader.upload_stream({
                    resource_type: "auto",
                    folder: "employee"
                }, (error, result) => { 
                    if (error || !result) return reject(error)
                    resolve(result)
                }).end(buffer)
            })

            const image: string = uploadResult.secure_url

            const result = await employeeModel.addEmployee(
                code, name, email, phone, department, position, Number(role), hire_date, identification_no, image, birth_date, birth_place, Number(gender), Number(blood_type), address, Number(village), Number(district), Number(city), Number(province), Number(country), zip_code, Number(religion), Number(married_status), Number(citizen_status)
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
            
            return res(c, 'getDetail', 200, "Get employee success", result.map(employeeService.formatEmployeeData)[0])           
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")  
        }
    },
        
    async updateEmployee(c: Context) {
        const formData = await c.req.formData()
        const formImage = await c.req.parseBody()

        const body = Object.fromEntries(formData) as unknown as TUpdate
        const { code, name, email, phone, department, position, role, hire_date, identification_no, birth_date, birth_place, gender, blood_type, address, village, district, city, province, country, zip_code, religion, married_status, citizen_status } = body
        const file = formImage['image'] as File

        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")

            const userId = c.req.param("id")
            const getEmployeeId = await employeeModel.getEmployeeById(userId)

            if (!getEmployeeId.length) return res(c, 'err', 404, "Employee not found")

            if (user.role === "Staff" && user.id !== userId) { 
                return res(c, 'err', 403, "Forbidden")
            }

            const findUser = await employeeModel.getEmployeeById(userId)
            let image = findUser[0].image

            if (file) {
                const buffer = Buffer.from(await file.arrayBuffer())

                if (image) {
                    const oldImagePublicId = image.split("/").pop()?.split(".")[0]
                    if (oldImagePublicId) {
                        await cloudinary.uploader.destroy(`employee/${oldImagePublicId}`)
                    }
                }

                const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => { 
                    cloudinary.uploader.upload_stream({
                        resource_type: "auto",
                        folder: "employee"
                    }, (error, result) => { 
                        if (error || !result) return reject(error)
                        resolve(result)
                    }).end(buffer)
                })

                image = uploadResult.secure_url
            }

            const result = await employeeModel.updateEmployee(
                userId, code, name, email, phone, department, position, Number(role), hire_date, identification_no, image, birth_date, birth_place, Number(gender),Number(blood_type), address, Number(village), Number(district), Number(city), Number(province), Number(country), zip_code, Number(religion), Number(married_status), Number(citizen_status)
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
    },

    async uploadFile(c: Context) {
        try {
            const body = await c.req.parseBody()
            const file = body['employee'] as File

            if (!file) return res(c, 'err', 404, "File not found")

            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            const workBook = xlsx.read(buffer, { type: 'buffer' })
            const sheetName = workBook.SheetNames[0]
            const sheet = workBook.Sheets[sheetName]

            const data: TRegister[] = xlsx.utils.sheet_to_json<TRegister>(sheet)
            if (!data) return res(c, 'err', 400, "File not valid")
            
            const department = await departmentModel.getAll() as unknown as { id: string, name: string }[]
            const position = await positionModel.getAll() as unknown as { id: string, name: string }[]
            const role = await roleModel.getAll() as unknown as { id: number, name: string }[]
            const gender = await dropdownModel.getGender() as unknown as { id: number, name: string }[]
            const bloodType = await dropdownModel.getBloodType() as unknown as { id: number, name: string }[]
            const country = await countryModel.getAll() as unknown as { id: number, name: string }[]
            const province = await provinceModel.getAll() as unknown as { id: number, name: string }[]
            const city = await cityModel.getAll() as unknown as { id: number, name: string }[]
            const district = await districtModel.getAll() as unknown as { id: number, name: string }[]
            const village = await villageModel.getAll() as unknown as { id: number, name: string }[]
            const religion = await dropdownModel.getReligion() as unknown as { id: number, name: string }[]
            const marriedStatus = await dropdownModel.getMarriedStatus() as unknown as { id: number, name: string }[]
            const citizenStatus = await dropdownModel.getCitizenStatus() as unknown as { id: number, name: string }[]

            const departmentMap = new Map(department.map((d) => [d.name, d.id]))
            const positionMap = new Map(position.map((p) => [p.name, p.id]))
            const roleMap = new Map(role.map((r) => [r.name, r.id]))
            const genderMap = new Map(gender.map((g) => [g.name, g.id]))
            const bloodTypeMap = new Map(bloodType.map((b) => [b.name, b.id]))
            const countryMap = new Map(country.map((c) => [c.name, c.id]))
            const provinceMap = new Map(province.map((p) => [p.name, p.id]))
            const cityMap = new Map(city.map((c) => [c.name, c.id]))
            const districtMap = new Map(district.map((d) => [d.name, d.id]))
            const villageMap = new Map(village.map((v) => [v.name, v.id]))
            const religionMap = new Map(religion.map((r) => [r.name, r.id]))
            const marriedStatusMap = new Map(marriedStatus.map((m) => [m.name, m.id]))
            const citizenStatusMap = new Map(citizenStatus.map((c) => [c.name, c.id]))
            

        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error") 
        }
    },

    async exportFile(c: Context) {
        try {

        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error") 
        }
    }
}