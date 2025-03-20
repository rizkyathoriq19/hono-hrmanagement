export type TAddPayroll = {
    employee: string,
    basicSalary: number,
    overtime: number,
    deductions: number,
    netSalary: number,
    paymentDate: Date,
}

export interface IPayroll { 
    code: string
    name: string
    basic_salary: number
    overtime: number
    deductions: number
    net_salary: number
}