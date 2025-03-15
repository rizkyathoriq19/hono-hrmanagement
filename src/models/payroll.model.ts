import { prisma } from "@/lib/encryption"
import type { Payroll } from "@prisma/client"

export const payrollModel = {
    async addPayroll(userId: string, basicSalary: number, overtime: number, deductions: number, netSalary: number, paymentDate: string) { 
        return await prisma.$executeRaw`
            INSERT INTO payroll (employee_id, basic_salary, overtime, deductions, net_salary, payment_date)
            VALUES (${userId}::uuid, ${basicSalary}, ${overtime}, ${deductions}, ${netSalary}, ${paymentDate}::date)
        `
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
            JOIN employee e ON p."employeeId" = e.id
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