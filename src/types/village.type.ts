export interface IVillage {
    id: string
    name: string
    alt_name: string
    province_id: number
    province_name: string
    city_id: number
    city_name: string
    district_id: number
    district_name: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}