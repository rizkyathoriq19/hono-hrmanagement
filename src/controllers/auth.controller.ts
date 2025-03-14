import type { Context } from "hono"
import { z } from "zod"
import { generateToken } from "@/utils/jwt.js"
import { authModel } from "@/models/auth.model"

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
                return c.json({ error: "Invalid credentials" }, 401);
            }

            const token = await generateToken({
                id: userByIdentifier[0].id,
                role: userByIdentifier[0].role
            })

            return c.json({ user: userByIdentifier[0], token }, 200)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return c.json(
                    { error: error.errors.map((e) => e.message).join(", ") },
                    400
                );
            } else if (error instanceof Error) {
                return c.json({ error: error.message }, 500);
            }
            return c.json({ error: "Internal server error" }, 500);                  
        }
    },
}