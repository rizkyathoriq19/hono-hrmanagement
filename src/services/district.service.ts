import { IDistrict } from "@/types/district.type"

export const districtService = {

    format(district: IDistrict) {
        return {
            id: Number(district.id),
            name: district.name,
            alt_name: district.alt_name,
            province: {
                id: Number(district.province_id),
                name: district.province_name,
            },
            city: {
                id: Number(district.city_id),
                name: district.city_name,
            },
            created_at: district.created_at,
            updated_at: district.updated_at,
            deleted_at: district.deleted_at,
        }
    },

}
