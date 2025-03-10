import { Hono } from "hono"
import { authController } from "@/controllers/auth.controller.js"
import { authMiddleware } from "@/middlewares/auth.middleware.js"

const r = new Hono()

r.post("/auth/register", authController.register)

export default r