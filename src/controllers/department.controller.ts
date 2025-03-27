import { departmentModel } from "@/models/department.model"
import { res } from "@/utils/response"
import { Context } from "hono"

export const departmentController = {
    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const result = await departmentModel.getAll()

            return res(c, "get", 200, "Get all department success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = c.req.param("id")
            const result = await departmentModel.getById(id)

            return res(c, "getDetail", 200, "get department by id success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async add(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const { name, alt_name } = await c.req.json<{ name: string, alt_name: string }>()
            const result = await departmentModel.add(name, alt_name)

            return res(c, "post", 201, "Add department success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async update(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = c.req.param("id")
            const { name, alt_name } = await c.req.json<{ name: string, alt_name: string }>()

            const result = await departmentModel.update(id, name, alt_name)
            return res(c, "put", 200, "Update department success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async delete(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = c.req.param("id")
            const result = await departmentModel.delete(id)

            return res(c, "delete", 200, "Delete department success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    }
}