import { Hono } from "hono"
import { authController } from "@/controllers/auth.controller.js"
import { employeeController } from "@/controllers/employee.controller.js"
import { attendanceController } from "@/controllers/attendance.controller.js"
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

// Attendance
r.get("/attendance/all", authMiddleware, roleMiddleware("view_attendance"), attendanceController.getAll)
r.get("/attendance/:id", authMiddleware, roleMiddleware("view_attendance"), attendanceController.getById) 
r.post("/attendance/checkinout", authMiddleware, roleMiddleware("check_in_out_attendance"), attendanceController.checkin)
r.patch("/attendance/checkinout/:id", authMiddleware, roleMiddleware("check_in_out_attendance"), attendanceController.checkout)
r.put("/attendance/update/:id", authMiddleware, roleMiddleware("update_attendance"), attendanceController.update)

export default r