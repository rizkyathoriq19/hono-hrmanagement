import { Context, Next } from "hono"
import { prisma } from "@/lib/encryption"
import { getUserData } from "@/utils/jwt.js"
import type { MiddlewareHandler } from "hono"
import type { IUserToken } from "@/utils/jwt.js"

export const authMiddleware: MiddlewareHandler<{ Variables: { employee: IUserToken } }> = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "")
    if (!token) return c.json({ status: false, message: "Unauthorized" }, 401)
    
    const user = await getUserData(token).catch(() => null)
    if (!user) return c.json({ status: false, message: "Invalid Token" }, 401)
    
    const role = await prisma.$queryRaw <{
        id: string
        name: string
    }[]>`
        SELECT r.id, r.name
        FROM role r
        JOIN employee e ON r.id = e.role_id
        WHERE e.id = ${user.id}::uuid
    `

    if (!role.length) return c.json({ status: false, error: "User not found" }, 401)
    
    const permission = await prisma.$queryRaw <{
        name: string
    }[]>`
        SELECT p.name
        FROM permission p
        JOIN role_permission rp ON p.id = rp.permission_id
        WHERE rp.role_id = ${role[0].id}
    `

    const checkPermission = permission.map(p => p.name)
    
    c.set("employee", { ...user, role: role[0].name, permission: checkPermission })

    await next()
}