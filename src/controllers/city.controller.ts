import { Context } from "hono"
import { cityModel } from "@/models/city.model"
import { res } from "@/utils/response"
import { cityService } from "@/services/city.service"

export const cityController = {
    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const result = await cityModel.getAll()

            return res(c, "get", 200, "Get all city success", result.map(cityService.format))
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await cityModel.getById(id)

            return res(c, "getDetail", 200, "Get city by id success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async add(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            
            const { province_id, name, alt_name, latitude, longitude } = await c.req.json<{
                province_id: number,
                name: string,
                alt_name: string,
                latitude: number,
                longitude: number
            }>()


            let id = await cityModel.getLastId(province_id) as { id: number }[]
            if (id.length > 0) { 
                const lastId = Number(id[0].id)
                if (lastId) {
                    const newId = lastId + 1
                    const result = await cityModel.add(newId, province_id, name, alt_name, latitude, longitude)
                    return res(c, "post", 201, "Add city success", result)
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
            const { province_id, name, alt_name, latitude, longitude } = await c.req.json<{
                province_id: number,
                name: string, 
                alt_name: string,
                latitude: number,
                longitude: number
            }>()
            
            const result = await cityModel.update(id, province_id, name, alt_name, latitude, longitude)
            return res(c, "put", 200, "Update city success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async delete(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await cityModel.delete(id)

            return res(c, "delete", 200, "Delete city success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    }
}