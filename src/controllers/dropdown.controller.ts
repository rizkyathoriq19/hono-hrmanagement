import type { Context } from "hono"
import { dropdownModel } from "@/models/dropdown.model"
import { res } from "@/utils/response"

const formatDropdown = (data: any) => ({
    id: Number(data.id),
    name: data.name
})

export const dropdownController = {
    async getDepartment(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getDepartment()
            return res(c, 'getDetail', 200, "Get department success", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getPosition(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const departmentId = c.req.param("id")
            const result = await dropdownModel.getPosition(departmentId)

            return res(c, 'getDetail', 200, "Get position success", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getRole(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getRole()
            return res(c, 'get', 200, "Get role success", result)
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getCountry(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getCountry()

            return res(c, 'getDetail', 200, "Get country success", result.map(formatDropdown))
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
            return res(c, 'getDetail', 200, "Get province success", result.map(formatDropdown))
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
            return res(c, 'getDetail', 200, "Get city success", result.map(formatDropdown))
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
            return res(c, 'getDetail', 200, "Get district success", result.map(formatDropdown))
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
            return res(c, 'getDetail', 200, "Get village success", result.map(formatDropdown))
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },

    async getGender(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getGender()

            return res(c, 'getDetail', 200, "Get country success", result.map(formatDropdown))
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }        
    },

    async getBloodType(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getBloodType()

            return res(c, 'getDetail', 200, "Get country success", result.map(formatDropdown))
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }        
    },

    async getReligion(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getReligion()

            return res(c, 'getDetail', 200, "Get country success", result.map(formatDropdown))
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }        
    },

    async getMarriedStatus(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getMarriedStatus()

            return res(c, 'getDetail', 200, "Get country success", result.map(formatDropdown))
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }        
    },
    
    async getCitizenStatus(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized")
            
            const result = await dropdownModel.getCitizenStatus()

            return res(c, 'getDetail', 200, "Get country success", result.map(formatDropdown))
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }        
    },
}