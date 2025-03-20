import { Hono } from "hono"
import { authController } from "@/controllers/auth.controller.js"
import { dropdownController } from "@/controllers/dropdown.controller.js"
import { employeeController } from "@/controllers/employee.controller.js"
import { attendanceController } from "@/controllers/attendance.controller.js"
import { authMiddleware } from "@/middlewares/auth.middleware.js"
import { roleMiddleware } from "@/middlewares/role.middleware.js"
import { payrollController } from "@/controllers/payroll.controller.js"

const r = new Hono()

// Auth
r.post("/auth/login", authController.login)

// Dropdown
r.get("/dropdown/department", authMiddleware, dropdownController.getDepartment)
r.get("/dropdown/position/:id", authMiddleware, dropdownController.getPosition)
r.get("/dropdown/role", authMiddleware, dropdownController.getRole)
r.get("/dropdown/country", authMiddleware, dropdownController.getCountry)
r.get("/dropdown/province/:id", authMiddleware, dropdownController.getProvince)
r.get("/dropdown/city/:id", authMiddleware, dropdownController.getCity)
r.get("/dropdown/district/:id", authMiddleware, dropdownController.getDistrict)
r.get("/dropdown/village/:id", authMiddleware, dropdownController.getVillage)

// Employee
r.get("/employee/all", authMiddleware, roleMiddleware("view_employee"), employeeController.getEmployees)
r.get("/employee/:id", authMiddleware, roleMiddleware("view_employee"), employeeController.getEmployeeById)
r.post("/employee/add", authMiddleware, roleMiddleware("create_employee"), employeeController.addEmployee)
r.put("/employee/update/:id", authMiddleware, roleMiddleware("update_employee"), employeeController.updateEmployee)
r.patch("/employee/status/:id", authMiddleware, roleMiddleware("update_employee"), employeeController.statusEmployee)
r.delete("/employee/delete/:id", authMiddleware, roleMiddleware("delete_employee"), employeeController.deleteEmployee)

// Attendance
r.get("/attendance/all", authMiddleware, roleMiddleware("view_attendance"), attendanceController.getAll)
r.get("/attendance/:id", authMiddleware, roleMiddleware("view_attendance"), attendanceController.getById) 
r.post("/attendance/checkinout", authMiddleware, roleMiddleware("check_in_out_attendance"), attendanceController.checkin)
r.patch("/attendance/checkinout/:id", authMiddleware, roleMiddleware("check_in_out_attendance"), attendanceController.checkout)

// Payroll
r.get("/payroll/all", authMiddleware, roleMiddleware("view_payroll"), payrollController.getAll)
r.get("/payroll/:id", authMiddleware, roleMiddleware("view_payroll"), payrollController.getById)
r.post("/payroll/add", authMiddleware, roleMiddleware("create_payroll"), payrollController.add)
r.post("/payroll/upload", authMiddleware, roleMiddleware("create_payroll"), payrollController.fileUpload)
r.put("/payroll/update/:id", authMiddleware, roleMiddleware("update_payroll"), payrollController.update)
r.delete("/payroll/delete/:id", authMiddleware, roleMiddleware("delete_payroll"), payrollController.delete)

export default r