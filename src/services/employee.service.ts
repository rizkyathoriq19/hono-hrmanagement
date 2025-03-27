import { employeeModel } from "@/models/employee.model"
import { departmentModel } from "@/models/department.model"

export const employeeService = {
    parseDate(dateString: string): Date {
        const [year, month, day] = dateString.split("-").map(Number)
        const fullYear = 2000 + year
        return new Date(fullYear, month - 1, day)
    },

    async generateEmployeeCode(hire_date: Date, department_id: string): Promise<string> { 
        try {
            const year = String(hire_date.getFullYear() % 100)
            const month = String(hire_date.getMonth() + 1).padStart(2, "0")
            
            const lastEmployee = await employeeModel.getLastEmployeeCode(year, month, department_id)
            const departmentAltName = await departmentModel.getAltName(department_id)
        
            let increment: string = '001'
            let departmentCode: string = departmentAltName[0].alt_name
            
            if (lastEmployee.length) {
                const lastIncrement = Number(lastEmployee[0].code.slice(-3)) + 1
                increment = lastIncrement.toString().padStart(3, "0")
            }

            return `${year}${month}${departmentCode}${increment}`
        } catch (error) {
            const err = error as Error
            return err.message
        }
    }
}
