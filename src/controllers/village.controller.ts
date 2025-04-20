import { Context } from "hono"
import { villageModel } from "@/models/village.model"
import { res } from "@/utils/response"
import { villageService } from "@/services/village.service"

export const villageController = {
    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const result = await villageModel.getAll()

            return res(c, "get", 200, "Get all village success", result.map(villageService.format))
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await villageModel.getById(id)

            return res(c, "getDetail", 200, "Get village by id success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async add(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const { province_id, city_id, district_id, name, alt_name, latitude, longitude } = await c.req.json<{
                province_id: number,
                city_id: number,
                district_id: number,
                name: string,
                alt_name: string,
                latitude: number,
                longitude: number
            }>()

            const newProvinceId = Number(district_id.toString().slice(0, 2))
            const newCityId = Number(district_id.toString().slice(2, 4))
            const newDistrictId = Number(district_id.toString().slice(4, 7))
            let id = await villageModel.getLastId(newProvinceId, newCityId, newDistrictId) as { id: number }[]
            if (id.length > 0) {
                const lastId = Number(id[0].id)
                if (lastId) {
                    const newId = lastId + 1
                    const result = await villageModel.add(newId, district_id, name, alt_name, latitude, longitude)
                    return res(c, "post", 201, "Add village success", result)
                }
            }    

        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async update(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const { district_id, name, alt_name, latitude, longitude } = await c.req.json<{
                district_id: number,
                name: string, 
                alt_name: string,
                latitude: number,
                longitude: number
            }>()
            
            const result = await villageModel.update(id, district_id, name, alt_name, latitude, longitude)
            return res(c, "put", 200, "Update village success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async delete(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await villageModel.delete(id)

            return res(c, "delete", 200, "Delete village success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    }
}