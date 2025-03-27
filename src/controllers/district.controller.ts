import { Context } from "hono"
import { districtModel } from "@/models/district.model"
import { res } from "@/utils/response"

export const districtController = {
    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const result = await districtModel.getAll()

            return res(c, "get", 200, "Get all district success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await districtModel.getById(id)

            return res(c, "getDetail", 200, "Get district by id success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async add(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const { id, province_id, name, alt_name, latitude, longitude } = await c.req.json<{
                id: number,
                province_id: number,
                name: string,
                alt_name: string,
                latitude: number,
                longitude: number
            }>()

            const result = await districtModel.add(id, province_id, name, alt_name, latitude, longitude)
            return res(c, "post", 201, "Add district success", result)
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
            
            const result = await districtModel.update(id, province_id, name, alt_name, latitude, longitude)
            return res(c, "put", 200, "Update district success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async delete(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await districtModel.delete(id)

            return res(c, "delete", 200, "Delete district success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    }
}