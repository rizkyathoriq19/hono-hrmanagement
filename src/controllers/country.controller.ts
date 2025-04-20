import { Context } from "hono"
import { countryModel } from "@/models/country.model"
import { res } from "@/utils/response"

export const countryController = {
    async getAll(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const result = await countryModel.getAll()

            return res(c, "get", 200, "Get all country success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getById(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await countryModel.getById(id)

            return res(c, "getDetail", 200, "Get country by id success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async add(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const { name, alt_name } = await c.req.json<{
                name: string,
                alt_name: string,
            }>()

            let id = await countryModel.getTotal() as { total: number }[]
            if (id.length > 0) { 
                const lastId = Number(id[0].total)
                if (lastId) {
                    const newId = lastId + 1
                    const result = await countryModel.add(newId, name, alt_name)
                    return res(c, "post", 201, "Add country success", result)
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
            const { name, alt_name } = await c.req.json<{
                name: string, 
                alt_name: string
            }>()
            
            const result = await countryModel.update(id, name, alt_name)
            return res(c, "put", 200, "Update country success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async delete(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, "err", 401, "Unauthorized")
            
            const id = Number(c.req.param("id"))
            const result = await countryModel.delete(id)

            return res(c, "delete", 200, "Delete country success", result)
        } catch (error) {
            return res(c, "err", 500, error instanceof Error ? error.message : "Internal server error")
        }
    }
}