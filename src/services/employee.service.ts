import { dropdownModel } from "@/models/dropdown.model"

export const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number)
    const fullYear = 2000 + year
    return new Date(fullYear, month - 1, day)
};

export const generateEmployeeCode = async (hire_date: Date, department_id: string) => { 
    try {
        const year = String(hire_date.getFullYear() % 100)
        const month = String(hire_date.getMonth() + 1).padStart(2, "0")
        
        const department = await dropdownModel.getDepartment()
        const lastEmployee = await dropdownModel.getLastEmployeeCode(year, month, department_id)
    
        let increment: string = '001'
        let departmentCode: string = 'HR'
        
        if (lastEmployee.length) {
            const lastIncrement = Number(lastEmployee[0].code.slice(-3)) + 1
            increment = lastIncrement.toString().padStart(3, "0")
        } else { 
            switch (department[0].name) {
                case "Robotic & Automation":
                    departmentCode = "RA"
                    break
                case "Digital Manufacturing":
                    departmentCode = "DM"
                    break
                case "Business & Development":
                    departmentCode = "BD"
                    break
                case "Human Resources":
                    departmentCode = "HR"
                    break
            }
        }

        return `${year}${month}${departmentCode}${increment}`
    } catch (error) {
        const err = error as Error
        return {status: false, message: err.message}
    }
}