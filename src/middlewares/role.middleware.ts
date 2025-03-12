import { Context, Next } from "hono"
import type { MiddlewareHandler } from "hono"

export const roleMiddleware = (requiredPermission: string): MiddlewareHandler => { 
    return async (c: Context, next: Next) => { 
        const user = c.get("employee")
        if (!user) return c.json({ status: false, message: "Unauthorized" }, 401)
        
        if (!user.permission || !Array.isArray(user.permission)) {
            return c.json({ status: false, message: "Permissions not found" }, 403)
        }
        
        if (!user.permission.includes(requiredPermission)) {
            return c.json({ status: false, message: "Forbidden" }, 403)
        }

        await next()
    } 
}

