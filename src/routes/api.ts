import { Hono } from "hono"
import { authController } from "@/controllers/auth.controller.js"
import { employeeController } from "@/controllers/employee.controller.js"
import { authMiddleware } from "@/middlewares/auth.middleware.js"

const r = new Hono()

// Auth
r.post("/auth/login", authController.login)

// Employee
r.get("/employee/all", authMiddleware, employeeController.getEmployees)
r.get("/employee/:id", authMiddleware, employeeController.getEmployeeById)
r.post("/employee/add", authMiddleware, employeeController.addEmployee)
r.put("/employee/update/:id", authMiddleware, employeeController.updateEmployee)
r.delete("/employee/delete/:id", authMiddleware, employeeController.deleteEmployee)

// Role

export default r