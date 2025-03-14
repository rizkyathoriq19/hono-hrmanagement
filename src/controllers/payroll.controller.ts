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
    async getAll(c: Context) { },
    async getById(c: Context) { },
    async update(c: Context) { },
    async delete(c: Context) { },
}