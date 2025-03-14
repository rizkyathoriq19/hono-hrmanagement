import type { Context } from "hono"
import { array, z } from "zod"
import { employeeModel } from "@/models/employee.model"
import { res } from "@/utils/response"

type TRole = "Manager" | "Staff" | "HR"

type TRegister = {
    code: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    role: "Manager" | "Staff" | "HR"
}

type TUpdate = TRegister & {
    status: "ACTIVE" | "INACTIVE"
}

const roleMap: Record<TRole, number> = {
    Manager: 1,
    Staff: 2,
    HR: 3
};

interface EmployeeRaw {
    id: string;
    code: string;
    name: string;
    email: string;
    phone: string;
    department_id: string;
    department_name: string;
    position_id: string;
    position_name: string;
    role_id: number;
    role_name: string;
    hire_date: Date;
    status: string;
}

const registerValidationSchema = z.object({
    code: z.string().nonempty({message: "ID is required"}),
    name: z.string().nonempty({message: "Name is required"}),
    email: z.string().email({message: "Invalid email"}).nonempty({message: "Email is required"}),
    phone: z.string().nonempty({message: "Phone is required"}),
    department: z.string().nonempty({message: "Department is required"}),
    position: z.string().nonempty({message: "Position is required"}),
    role: z.enum(["Manager", "Staff", "HR"], {message: "Invalid role"})
})

const formatEmployeeData = (employee: EmployeeRaw) => ({
    id: employee.id,
    code: employee.code,
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
    hire_date: employee.hire_date,
    status: employee.status,
});

export const employeeController = {
    async getEmployees(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")

            const result = await employeeModel.getEmployees(user.role, user.id) as EmployeeRaw[]

            return res(c, 'get', 200, "Get all employee success", result.map(formatEmployeeData))
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")       
        }
    },

    async addEmployee(c: Context) {
        const body = await c.req.json<TRegister>()
        const { code, name, email, phone, department, position, role } = body

        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            await registerValidationSchema.parseAsync(body)
            
            const uuidDepartment: {id: string}[] = await employeeModel.getDepartmentByName(department)
            const uuidPosition: {id: string}[]  = await employeeModel.getPositionByName(position)

            if (!uuidDepartment.length) return res(c, 'err', 400, "Invalid department")
            if (!uuidPosition.length) return res(c, 'err', 400, "Invalid position")

            const roleId = roleMap[role];

            const result = await employeeModel.addEmployee(
                code, name, email, phone, uuidDepartment[0]?.id, uuidPosition[0]?.id, roleId
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

            const result= await employeeModel.getEmployeeById(userId) as EmployeeRaw[]

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
            const { code, name, email, phone, department, position, role, status } = body

            const userId = c.req.param("id")
            const getEmployeeId = await employeeModel.getEmployeeById(userId)

            if (!getEmployeeId.length) return res(c, 'err', 404, "Employee not found")

            if (user.role === "Staff" && user.id !== userId) { 
                return res(c, 'err', 403, "Forbidden")
            }

            const uuidDepartment = await employeeModel.getDepartmentByName(department)
            const uuidPosition = await employeeModel.getPositionByName(position)

            if (!uuidDepartment.length) return res(c, 'err', 400, "Invalid department")
            if (!uuidPosition.length) return res(c, 'err', 400, "Invalid position")

            const roleId = roleMap[role]

            const result = await employeeModel.updateEmployee(
                userId, code, name, email, phone, uuidDepartment[0]?.id, uuidPosition[0]?.id, roleId, status
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
    }
}