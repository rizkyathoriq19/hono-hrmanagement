import { Hono } from "hono"
import { authController } from "@/controllers/auth.controller.js"
import { employeeController } from "@/controllers/employee.controller.js"
import { authMiddleware } from "@/middlewares/auth.middleware.js"

const r = new Hono()

// Auth
r.post("/auth/register", authController.addUser)
r.post("/auth/login", authController.login)
r.get("/auth/me", authMiddleware, authController.me)
r.get("/auth/list/roles", authMiddleware, authController.list)

// Employee
r.get("/employee/all", authMiddleware, employeeController.getEmployees)

export default r