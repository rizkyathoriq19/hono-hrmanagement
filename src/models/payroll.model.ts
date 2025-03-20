import { prisma } from "@/lib/encryption"   
import { IPayroll } from "@/types/payroll.type"
import { Prisma } from "@prisma/client"
import type { Payroll } from "@prisma/client"

export const payrollModel = {
    async addPayroll(userId: string, basicSalary: number, overtime: number, deductions: number, netSalary: number, paymentDate: string) { 
        return await prisma.$executeRaw`
            INSERT INTO payroll (employee_id, basic_salary, overtime, deductions, net_salary, payment_date)
            VALUES (${userId}::uuid, ${basicSalary}, ${overtime}, ${deductions}, ${netSalary}, ${paymentDate}::date)
        `
    },

    async fileUpload(data: IPayroll[]) { 
        const employees = await prisma.$queryRaw<{ id: string, code: string, name: string }[]>`
            SELECT id, code, name FROM employee WHERE code IN (${Prisma.join(data.map(d => d.code))})
        `

        const employeeMap = new Map(employees.map(e => [`${e.code}-${e.name}`, e.id]))
        const payrollData = data
            .map(row => ({
                employee_id: employeeMap.get(`${row.code}-${row.name}`),
                basic_salary: row.basic_salary,
                overtime: row.overtime,
                deductions: row.deductions,
                net_salary: row.net_salary,
            }))
            .filter(row => row.employee_id)

        const placeholders = payrollData
            .map((_, i) => `($${i * 5 + 1}::uuid, $${i * 5 + 2}::decimal(10,2), $${i * 5 + 3}::decimal(10,2), $${i * 5 + 4}::decimal(10,2), $${i * 5 + 5}::decimal(10,2), NOW())`)
            .join(", ")

        const values = payrollData.flatMap(row => [
            row.employee_id,
            row.basic_salary,
            row.overtime,
            row.deductions,
            row.net_salary,
        ])

        await prisma.$executeRawUnsafe(
            `INSERT INTO payroll (employee_id, basic_salary, overtime, deductions, net_salary, payment_date) VALUES ${placeholders}`,
            ...values
        )

        return payrollData.length
    },

    async getPayrolls(role: string, userId: string) {
        switch (role) { 
            case "HR":
                return await prisma.$queryRaw<Payroll[]>`
                    SELECT p.id, e.name as employee, p.basic_salary, p.overtime, p.deductions, p.net_salary, p.payment_date
                    FROM payroll p
                    JOIN employee e ON p.employee_id = e.id
                `
            case "Manager":
                return await prisma.$queryRaw<Payroll[]>`
                    SELECT p.id, e.name as employee, p.basic_salary, p.overtime, p.deductions, p.net_salary, p.payment_date
                    FROM payroll p
                    JOIN employee e ON p.employee_id = e.id
                    WHERE e.department_id = (SELECT department_id FROM employee WHERE id = ${userId}::uuid)
                `
            default:
                return { status: false, error: "Forbidden" }
        } 
    },

    async getPayrollById(payrollId: number) { 
        return await prisma.$queryRaw<Payroll[]>`
            SELECT p.id, e.name as employee, p.basic_salary, p.overtime, p.deductions, p.net_salary, p.payment_date
            FROM payroll p
            JOIN employee e ON p.employee_id = e.id
            WHERE p.id = ${payrollId}
        `
    },
    
    async updatePayroll(payrollId: number, basicSalary: number, overtime: number, deductions: number, netSalary: number, paymentDate: string) { 
        return await prisma.$executeRaw`
            UPDATE payroll
            SET basic_salary = ${basicSalary}, overtime = ${overtime}, deductions = ${deductions}, net_salary = ${netSalary}, payment_date = ${paymentDate}::date
            WHERE id = ${payrollId}
        `
    },

    async deletePayroll(payrollId: number) { 
        return await prisma.$executeRaw`
            DELETE FROM payroll
            WHERE id = ${payrollId}
        `
    },
}