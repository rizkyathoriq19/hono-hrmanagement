export type TAddPayroll = {
    code: string
    name: string
    basic_salary: number
    overtime: number
    deductions: number
    net_salary: number
}

export type TUpdatePayroll = TAddPayroll

export interface IPayroll { 
    id: number
    employee_id: string
    employee_name: string
    basic_salary: number
    overtime: number
    deductions: number
    net_salary: number
    payment_date: Date
}