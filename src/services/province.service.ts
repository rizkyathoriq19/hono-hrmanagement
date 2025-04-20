import { IProvince } from "@/types/province.type"

export const provinceService = {

    format(provinces: IProvince) {
        return {
            id: Number(provinces.id),
            name: provinces.name,
            alt_name: provinces.alt_name,
            country: {
                id: provinces.country_id,
                name: provinces.country_name,
            },
            created_at: provinces.created_at,
            updated_at: provinces.updated_at,
            deleted_at: provinces.deleted_at,
        }
    },

}
