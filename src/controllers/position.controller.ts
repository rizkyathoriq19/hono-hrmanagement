import { Context } from "hono"
import { positionModel } from "@/models/position.model"
import { res } from "@/utils/response"

export const positionController = {
    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const result = await positionModel.getAll()

            return res(c, "get", 200, "Get all position success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = c.req.param("id")
            const result = await positionModel.getById(id)

            return res(c, "getDetail", 200, "Get position by id success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async add(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const { name, alt_name, department_id } = await c.req.json<{ name: string, alt_name: string, department_id: string }>()
            const result = await positionModel.add(name, alt_name, department_id)

            return res(c, "post", 201, "Add position success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async update(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = c.req.param("id")
            const { name, alt_name, department_id } = await c.req.json<{ name: string, alt_name: string, department_id: string }>()

            const result = await positionModel.update(id, name, alt_name, department_id)
            return res(c, "put", 200, "Update position success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async delete(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = c.req.param("id")
            const result = await positionModel.delete(id)

            return res(c, "delete", 200, "Delete position success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    }
}