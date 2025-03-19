import type { Context } from "hono"
import { generateToken } from "@/utils/jwt.js"
import { dropdownModel } from "@/models/dropdown.model"
import { res } from "@/utils/response"

export const dropdownController = {
    async getCountry(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getCountry()
            return res(c, 'get', 200, "Get country success", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getProvince(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const countryId = Number(c.req.param("id"))
            const result = await dropdownModel.getProvince(countryId)
            return res(c, 'get', 200, "Get province success", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getCity(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const provinceId = Number(c.req.param("id"))
            const result = await dropdownModel.getCity(provinceId)
            return res(c, 'get', 200, "Get city success", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getDistrict(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const cityId = Number(c.req.param("id"))
            const result = await dropdownModel.getDistrict(cityId)
            return res(c, 'get', 200, "Get district success", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getVillage(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const districtId = Number(c.req.param("id"))
            const result = await dropdownModel.getVillage(districtId)
            return res(c, 'get', 200, "Get village success", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },
}