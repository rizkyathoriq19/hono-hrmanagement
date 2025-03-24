import { Context } from "hono"
import { z } from "zod"
import { payrollModel } from "@/models/payroll.model"
import { res } from "@/utils/response"
import { TAddPayroll, IPayroll } from "@/types/payroll.type"
import xlsx from "xlsx"

const formatPayroll = (payroll: IPayroll) => ({ 
    id: payroll.id,
    employee: {
        id: payroll.employee_id,
        name: payroll.employee_name
    },
    basicSalary: payroll.basic_salary,
    overtime: payroll.overtime,
    deductions: payroll.deductions,
    netSalary: payroll.net_salary,
    paymentDate: payroll.payment_date
})

export const payrollController = {
    async add(c: Context) { },

    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized") 

            const result = await payrollModel.getPayrolls(user.role, user.id)

            return res(c, 'get', 200, "Get all payroll success", result.map(formatPayroll)) 
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
        // const { employee, basicSalary, overtime, deductions, netSalary,paymentDate } = body
        
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const payrollId = Number(c.req.param("id"))
            if (!payrollId) return res(c, 'err', 404, "Payroll ID not found")
            
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")            
        }
        
    },

    async delete(c: Context) { },

    async fileUpload(c: Context) { 
        try {
            const body = await c.req.parseBody()
            const file = body['payroll'] as File

            if (!file) return res(c, 'err', 404, "File not found")

            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            
            const workBook = xlsx.read(buffer, { type: 'buffer' })
            const sheetName = workBook.SheetNames[0]
            const sheet = workBook.Sheets[sheetName]

            const data: TAddPayroll[] = xlsx.utils.sheet_to_json<TAddPayroll>(sheet)
            if (!data) return res(c, 'err', 400, "File not valid")

            const result = await payrollModel.fileUpload(data)

            return res(c, 'postBatch', 200, "File uploaded", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")           
        }
    },
}