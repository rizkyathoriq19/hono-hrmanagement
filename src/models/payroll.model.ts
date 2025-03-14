import { prisma } from "@/lib/encryption"
import type { Payroll } from "@prisma/client"

export const payrollModel = {
    async addPayroll(userId: string, basicSalary: number, overtime: number, deductions: number, netSalary: number, paymentDate: string) { 
        return await prisma.$executeRaw`
            INSERT INTO payroll (employeeId, "basicSalary", overtime, deductions, "netSalary", "paymentDate")
            VALUES (${userId}::uuid, ${basicSalary}, ${overtime}, ${deductions}, ${netSalary}, ${paymentDate}::date)
        `
    },

    async getPayrolls(role: string, userId: string) {
        switch (role) { 
            case "HR":
                return await prisma.$queryRaw<Payroll[]>`
                    SELECT p.id, e.name as employee, p."basicSalary", p.overtime, p.deductions, p."netSalary", p."paymentDate"
                    FROM payroll p
                    JOIN employee e ON p."employeeId" = e.id
                `
            case "Manager":
                return await prisma.$queryRaw<Payroll[]>`
                    SELECT p.id, e.name as employee, p."basicSalary", p.overtime, p.deductions, p."netSalary", p."paymentDate"
                    FROM payroll p
                    JOIN employee e ON p."employeeId" = e.id
                    WHERE e."departmentId" = (SELECT "departmentId" FROM employee WHERE id = ${userId}::uuid)
                `
            default:
                return { status: false, error: "Forbidden" }
        } 
    },

    async getPayrollById(payrollId: number) { 
        return await prisma.$queryRaw<Payroll[]>`
            SELECT p.id, e.name as employee, p."basicSalary", p.overtime, p.deductions, p."netSalary", p."paymentDate"
            FROM payroll p
            JOIN employee e ON p."employeeId" = e.id
            WHERE p.id = ${payrollId}
        `
    },
    
    async updatePayroll(payrollId: number, basicSalary: number, overtime: number, deductions: number, netSalary: number, paymentDate: string) { 
        return await prisma.$executeRaw`
            UPDATE payroll
            SET "basicSalary" = ${basicSalary}, overtime = ${overtime}, deductions = ${deductions}, "netSalary" = ${netSalary}, "paymentDate" = ${paymentDate}::date
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