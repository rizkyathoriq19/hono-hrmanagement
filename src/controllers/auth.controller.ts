import type { Context } from "hono"
import { z } from "zod"
import { generateToken } from "@/utils/jwt.js"
import { authModel } from "@/models/auth.model"
import { res } from "@/utils/response"

type TLogin = {
    identifier: string
    password: string
}

export const authController = {
    async login(c: Context) { 
        const body = await c.req.json<TLogin>()
        const { identifier, password } = body

        try {
            const userByIdentifier = await authModel.userByIdentifier(identifier, password)
            
            if(userByIdentifier.length === 0) {
                return res(c, 'err', 404, "User not found")
            }

            const token = await generateToken({
                id: userByIdentifier[0].id,
                role: userByIdentifier[0].role
            })

            return res(c, 'login', 200, "Login successful", { token, user: userByIdentifier[0] })
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")
        }
    },
}