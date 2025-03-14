import { Context } from "hono"
import { z } from "zod"
import { payrollModel } from "@/models/payroll.model"

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
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401);

            const result = await payrollModel.getPayrolls(user.role, user.id)

            return c.json({ status: true, message: "Get payroll success", data: result }, 200);
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500)            
        }

    },
    async getById(c: Context) { },

    async update(c: Context) { },

    async delete(c: Context) { },
}