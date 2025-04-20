import { Context } from "hono"
import { provinceModel } from "@/models/province.model"
import { res } from "@/utils/response"
import { provinceService } from "@/services/province.service"

export const provinceController = {
    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const result = await provinceModel.getAll()

            return res(c, "get", 200, "Get all province success", result.map(provinceService.format))
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await provinceModel.getById(id)

            return res(c, "getDetail", 200, "Get province by id success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async add(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const { country_id, name, alt_name, latitude, longitude } = await c.req.json<{
                country_id: number,
                name: string,
                alt_name: string,
                latitude: number,
                longitude: number
            }>()

            let id = await provinceModel.getTotal() as { total: number }[]
            if (id.length > 0) { 
                const lastId = Number(id[0].total)
                if (lastId) {
                    const newId = lastId + 1
                    const result = await provinceModel.add(newId, country_id, name, alt_name, latitude, longitude)
                    return res(c, "post", 201, "Add province success", result)
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
            const { country_id, name, alt_name, latitude, longitude } = await c.req.json<{
                country_id: number,
                name: string, 
                alt_name: string,
                latitude: number,
                longitude: number
            }>()
            
            const result = await provinceModel.update(id, country_id, name, alt_name, latitude, longitude)
            return res(c, "put", 200, "Update province success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async delete(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await provinceModel.delete(id)

            return res(c, "delete", 200, "Delete province success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    }
}