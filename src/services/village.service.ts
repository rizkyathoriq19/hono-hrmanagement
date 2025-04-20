import { IVillage } from "@/types/village.type"

export const villageService = {

    format(village: IVillage) {
        return {
            id: Number(village.id),
            name: village.name,
            alt_name: village.alt_name,
            province: {
                id: Number(village.province_id),
                name: village.province_name,
            },
            city: {
                id: Number(village.city_id),
                name: village.city_name,
            },
            district: {
                id: Number(village.district_id),
                name: village.district_name,
            },
            created_at: village.created_at,
            updated_at: village.updated_at,
            deleted_at: village.deleted_at,
        }
    },

}
