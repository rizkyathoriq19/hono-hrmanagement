import type { Context, MiddlewareHandler } from "hono"
import { getUserData } from "@/utils/jwt.js"
import type { IUserToken } from "@/utils/jwt.js"

export interface IReqUser extends Context<{ Variables: { employee: IUserToken } }> { }

export const authMiddleware: MiddlewareHandler<{ Variables: { employee: IUserToken } }> = async (c, next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "")
    if (!token) return c.json({ message: "Unauthorized" }, 401)
    
    const user = await getUserData(token).catch(() => null)
    if (!user) return c.json({ message: "Invalid Token" }, 401)
    
    c.set("employee", user)

    await next()
}