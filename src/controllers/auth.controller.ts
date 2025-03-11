import type { Context } from "hono";
import { z } from "zod";
import { prisma } from "@/lib/encryption.js"
import { generateToken } from "@/utils/jwt.js";

type TLogin = {
    identifier: string
    password: string
}

export const authController = {
    async login(c: Context) { 
        const body = await c.req.json<TLogin>()
        const { identifier, password } = body

        try {
            const userByIdentifier = await prisma.$queryRaw<{
                id: string,
                role: string,
            }[]>`
                    SELECT uc.id, e."roleId"
                    FROM "user_credentials" uc
                    JOIN "employee" e ON uc."employeeId" = e."id"
                    WHERE (uc.code = ${identifier} OR uc.email = ${identifier})
                    AND uc.password = crypt(${password}, uc.password)
                `
            
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