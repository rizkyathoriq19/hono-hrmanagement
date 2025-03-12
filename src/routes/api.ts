import { Hono } from "hono"
import { authController } from "@/controllers/auth.controller.js"
import { employeeController } from "@/controllers/employee.controller.js"
import { authMiddleware } from "@/middlewares/auth.middleware.js"
import { roleMiddleware } from "@/middlewares/role.middleware.js"

const r = new Hono()

// Auth
r.post("/auth/login", authController.login)

// Employee
r.get("/employee/all", authMiddleware, roleMiddleware("view_employee"), employeeController.getEmployees)
r.get("/employee/:id", authMiddleware, roleMiddleware("view_employee"), employeeController.getEmployeeById)
r.post("/employee/add", authMiddleware, roleMiddleware("create_employee"), employeeController.addEmployee)
r.put("/employee/update/:id", authMiddleware, roleMiddleware("update_employee"), employeeController.updateEmployee)
r.delete("/employee/delete/:id", authMiddleware, roleMiddleware("delete_employee"), employeeController.deleteEmployee)

// Role

export default r