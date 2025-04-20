import { ICity } from "@/types/city.type"

export const cityService = {

    format(city: ICity) {
        return {
            id: Number(city.id),
            name: city.name,
            alt_name: city.alt_name,
            province: {
                id: Number(city.province_id),
                name: city.province_name,
            },
            created_at: city.created_at,
            updated_at: city.updated_at,
            deleted_at: city.deleted_at,
        }
    },

}
