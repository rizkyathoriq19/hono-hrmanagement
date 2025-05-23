export type TRegister = {
    code: string
    name: string
    email: string
    phone: string
    department: string
    position: string
    role: number
    manager: string
    hire_date: Date
    identification_no: string
    image: string | null
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
    manager_id: string | null
    manager_name: string | null
    hire_date: Date
    status: string
    code: string
    identification_no: string
    image: string | null
    birth_date: Date
    birth_place: string
    gender_id: number
    gender_name: string
    blood_type_id: number | null
    blood_type_name: string | null
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
    religion_id: number
    religion_name: string
    married_status_id: number
    married_status_name: string
    citizen_status_id: number
    citizen_status_name: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}