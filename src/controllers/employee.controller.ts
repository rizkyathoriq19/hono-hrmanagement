import type { Context } from "hono"
import { z } from "zod"
import { employeeModel } from "@/models/employee.model"

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

const roleMap: Record<string, number> = {
    "Manager": 1,
    "Staff": 2,
    "HR": 3
};

const registerValidationSchema = z.object({
    code: z.string().nonempty({message: "ID is required"}),
    name: z.string().nonempty({message: "Name is required"}),
    email: z.string().email({message: "Invalid email"}).nonempty({message: "Email is required"}),
    phone: z.string().nonempty({message: "Phone is required"}),
    department: z.string().nonempty({message: "Department is required"}),
    position: z.string().nonempty({message: "Position is required"}),
    role: z.enum(["Manager", "Staff", "HR"], {message: "Invalid role"})
})

export const employeeController = {
    async getEmployees(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401);

            const result = await employeeModel.getEmployees(user.role, user.id);

            return c.json({ status: true, message:"Get all employee data success", data: result }, 200);
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500);          
        }
    },

    async addEmployee(c: Context) {
        const body = await c.req.json<TRegister>()
        const { code, name, email, phone, department, position, role } = body

        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401)
            
            await registerValidationSchema.parseAsync(body)
            
            const uuidDepartment: {id: string}[] = await employeeModel.getDepartmentByName(department)
            const uuidPosition: {id: string}[]  = await employeeModel.getPositionByTitle(position)

            if (!uuidDepartment.length) return c.json({ status: false, error: "Invalid department" }, 400);
            if (!uuidPosition.length) return c.json({ status: false, error: "Invalid position" }, 400);

            const roleId = roleMap[role];

            const result = await employeeModel.addEmployee(
                code, name, email, phone, uuidDepartment[0]?.id, uuidPosition[0]?.id, roleId
            )
            
            if (!result) return c.json({ status: false, error: "Failed to insert employee" }, 500);
            return c.json({ status: true, message: "Add Employee Success", data: result,}, 201);
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof z.ZodError
                    ? error.errors.map(e => e.message).join(", ")
                    : error instanceof Error ? error.message : "Internal server error"
            }, 500);          
        }
    },

    async getEmployeeById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401)
            
            const userId = c.req.param("id")
            const result = await employeeModel.getEmployeeById(userId)

            if (!result.length) return c.json({ status: false, error: "Employee not found" }, 404);

            return c.json({status: true, message: "Get data success", data: result}, 200)            
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500);
        }
    },
        
    async updateEmployee(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return c.json({ error: "Unauthorized" }, 401)
                
            const body = await c.req.json<TUpdate>()
            const { code, name, email, phone, department, position, role, status } = body

            const userId = c.req.param("id")
            const getEmployeeId = await employeeModel.getEmployeeById(userId)

            if (!getEmployeeId.length) return c.json({ status: false, error: "Employee not Found" }, 400)

            if (user.role === "Staff" && user.id !== userId) { 
                return c.json({ status: false, error: "Forbidden" }, 403)
            }

            const uuidDepartment = await employeeModel.getDepartmentByName(department)
            const uuidPosition = await employeeModel.getPositionByTitle(position)

            if (!uuidDepartment.length) return c.json({ status: false, error: "Invalid department" }, 400)
            if (!uuidPosition.length) return c.json({ status: false, error: "Invalid position" }, 400)

            const roleId = roleMap[role]

            const result = await employeeModel.updateEmployee(
                userId, code, name, email, phone, uuidDepartment[0]?.id, uuidPosition[0]?.id, roleId, status
            )

            return c.json({ status: true, message: "Update Employee Success" }, 200)
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500)
        }
    },

    async deleteEmployee(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return c.json({ error: "Unauthorized" }, 401)
            
            const userId = c.req.param("id") 
            const getEmployeeId = await employeeModel.getEmployeeById(userId)

            if (!getEmployeeId.length) return c.json({ status: false, error: "Employee not Found" }, 400)            

            if ((user.role === "Staff"  || user.role === "Manager") && user.id !== userId) { 
                return c.json({ status: false, error: "Forbidden" }, 403)
            }
            
            const result = await employeeModel.deleteEmployee(userId)

            return c.json({ status: true, message: "Delete Employee Success" }, 200)
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500)
        }
    }
}