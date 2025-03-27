import { Context } from "hono"
import { villageModel } from "@/models/village.model"
import { res } from "@/utils/response"

export const villageController = {
    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const result = await villageModel.getAll()

            return res(c, "get", 200, "Get all village success", result)
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
            
            const { id, district_id, name, alt_name, latitude, longitude } = await c.req.json<{
                id: number,
                district_id: number,
                name: string,
                alt_name: string,
                latitude: number,
                longitude: number
            }>()

            const result = await villageModel.add(id, district_id, name, alt_name, latitude, longitude)
            return res(c, "post", 201, "Add village success", result)
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