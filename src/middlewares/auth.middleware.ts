import { Context, Next } from "hono"
import { getUserData } from "@/utils/jwt.js"
import { authModel } from "@/models/auth.model"
import type { MiddlewareHandler } from "hono"
import type { IUserToken } from "@/utils/jwt.js"

export const authMiddleware: MiddlewareHandler<{ Variables: { employee: IUserToken } }> = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "")
    if (!token) return c.json({ status: false, message: "Unauthorized" }, 401)
    
    const user = await getUserData(token).catch(() => null)
    if (!user) return c.json({ status: false, message: "Invalid Token" }, 401)
    
    const role = await authModel.findRole(user.id)
    if (!role.length) return c.json({ status: false, error: "User not found" }, 401)
    
    const permission = await authModel.findPermission(role[0].id)
    const checkPermission = permission.map(p => p.name)
    
    c.set("employee", { ...user, role: role[0].name, permission: checkPermission })

    await next()
}