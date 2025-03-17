type TRole = "Manager" | "Staff" | "HR"

export type TRegister = {
    code: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    role: "Manager" | "Staff" | "HR"
    identification_no: string
    image: string
    birth_date: Date
    birth_place: string
    gender: string
    blood_type: string
    address: string
    village: number
    district: number
    city: number
    province: number
    country: number
    zip_code: string
    religion: "ISLAN" | "CHRISTIAN" | "CHATOLIC" | "HINDU" | "BUDDHIST" | "CONFUCIAN" | "OTHER"
    married_status: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED"
    citizen_status: "CITIZEN" | "PERMANENT_RESIDENT" | "TEMPORARY_RESIDENT" | "FOREIGNER"
}

export type TUpdate = TRegister

export type TStatus = {
    status: "ACTIVE" | "INACTIVE"
}

export const roleMap: Record<TRole, number> = {
    Manager: 1,
    Staff: 2,
    HR: 3
};

export interface IEmployee {
    id: string
    name: string
    email: string
    phone: string | null
    department_id: string
    department_name: string
    position_id: string
    position_name: string
    role_id: number
    role_name: string
    hire_date: Date
    status: string
    code: string
    identification_no: string
    image: string | null
    birth_date: Date
    birth_place: string
    gender: string
    blood_type: string | null
    address: string
    village_id: number
    village_name: string
    district_id: number
    district_name: string
    city_id: number
    city_name: string
    province_id: number
    province_name: string
    country_id: number
    country_name: string
    zip_code: string
    religion: string
    married_status: string
    citizen_status: string
    is_active: boolean
    created_at: Date
    updated_at: Date
}