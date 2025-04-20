export interface IProvince {
    id: string
    name: string
    alt_name: string
    country_id: number
    country_name: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}