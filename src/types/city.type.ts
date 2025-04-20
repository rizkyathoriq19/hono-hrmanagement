export interface ICity {
    id: string
    name: string
    alt_name: string
    province_id: number
    province_name: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}