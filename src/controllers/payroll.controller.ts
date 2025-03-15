import { Context } from "hono"
import { z } from "zod"
import { payrollModel } from "@/models/payroll.model"
import { res } from "@/utils/response"

type TAddPayroll = {
    employee: string,
    basicSalary: number,
    overtime: number,
    deductions: number,
    netSalary: number,
    paymentDate: Date,
}

export const payrollController = {
    async add(c: Context) { },

    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized") 

            const result = await payrollModel.getPayrolls(user.role, user.id)

            return res(c, 'err', 200, "Get all payroll success", result) 
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")  
        }
    },

    async getById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const payrollId = Number(c.req.param("id"))
            if (!payrollId) return res(c, 'err', 404, "Payroll ID not found")
            
            const result = await payrollModel.getPayrollById(payrollId)

            return res(c, 'getDetail', 200, "Get payroll success", result[0])
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async update(c: Context) { 
        const body = await c.req.json<TAddPayroll>()
        const { employee, basicSalary, overtime, deductions, netSalary,paymentDate } = body
        
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const payrollId = Number(c.req.param("id"))
            if (!payrollId) return res(c, 'err', 404, "Payroll ID not found")
            
        } catch (error) {
            
        }
        
    },

    async delete(c: Context) { },

    async fileUpload(c: Context) { 
        const body = await c.req.parseBody()
        const file = body['xlsx']

        console.log(file)
    },
}