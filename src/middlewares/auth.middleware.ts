import type { MiddlewareHandler } from "hono"
import { getUserData } from "@/utils/jwt.js"
import type { IUserToken } from "@/utils/jwt.js"

export const authMiddleware: MiddlewareHandler<{ Variables: { user: IUserToken } }> = async (c, next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "")
    if (!token) return c.json({ message: "Unauthorized" }, 401)
    
    const user = await getUserData(token).catch(() => null)
    if (!user) return c.json({ message: "Invalid Token" }, 401)
    
    c.set("user", user)

    await next()
}