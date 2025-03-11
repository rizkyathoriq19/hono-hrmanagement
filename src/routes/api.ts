import { Hono } from "hono"
import { authController } from "@/controllers/auth.controller.js"
import { authMiddleware } from "@/middlewares/auth.middleware.js"

const r = new Hono()

r.post("/auth/register", authController.register)
r.post("/auth/login", authController.login)
r.get("/auth/me", authMiddleware, authController.me)
r.get("/auth/list/roles", authMiddleware, authController.list)

export default r