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
    async getById(c: Context) { },

    async update(c: Context) { },

    async delete(c: Context) { },
}