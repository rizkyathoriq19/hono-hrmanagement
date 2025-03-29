import { Hono } from "hono"
import { authController } from "@/controllers/auth.controller.js"
import { dropdownController } from "@/controllers/dropdown.controller.js"
import { employeeController } from "@/controllers/employee.controller.js"
import { attendanceController } from "@/controllers/attendance.controller.js"
import { authMiddleware } from "@/middlewares/auth.middleware.js"
import { roleMiddleware } from "@/middlewares/role.middleware.js"
import { payrollController } from "@/controllers/payroll.controller.js"
import { departmentController } from "@/controllers/department.controller.js"
import { positionController } from "@/controllers/position.controller.js"
import { countryController } from "@/controllers/country.controller"
import { provinceController } from "@/controllers/province.controller"
import { cityController } from "@/controllers/city.controller"
import { districtController } from "@/controllers/district.controller"
import { villageController } from "@/controllers/village.controller"

const r = new Hono()

// Auth
r.post("/auth/login", authController.login)

// Department
r.get("/department/all", authMiddleware, departmentController.getAll)
r.get("/department/:id", authMiddleware, departmentController.getById)
r.post("/department/add", authMiddleware, departmentController.add)
r.put("/department/update/:id", authMiddleware, departmentController.update)
r.delete("/department/delete/:id", authMiddleware, departmentController.delete)

// Position
r.get("/position/all", authMiddleware, positionController.getAll)
r.get("/position/:id", authMiddleware, positionController.getById)
r.post("/position/add", authMiddleware, positionController.add)
r.put("/position/update/:id", authMiddleware, positionController.update)
r.delete("/position/delete/:id", authMiddleware, positionController.delete)

// Country
r.get("/country/all", authMiddleware, countryController.getAll)
r.get("/country/:id", authMiddleware, countryController.getById)
r.post("/country/add", authMiddleware, countryController.add)
r.put("/country/update/:id", authMiddleware, countryController.update)
r.delete("/country/delete/:id", authMiddleware, countryController.delete)

// Province
r.get("/province/all", authMiddleware, provinceController.getAll)
r.get("/province/:id", authMiddleware, provinceController.getById)
r.post("/province/add", authMiddleware, provinceController.add)
r.put("/province/update/:id", authMiddleware, provinceController.update)
r.delete("/province/delete/:id", authMiddleware, provinceController.delete)

// City
r.get("/city/all", authMiddleware, cityController.getAll)
r.get("/city/:id", authMiddleware, cityController.getById)
r.post("/city/add", authMiddleware, cityController.add)
r.put("/city/update/:id", authMiddleware, cityController.update)
r.delete("/city/delete/:id", authMiddleware, cityController.delete)

// District
r.get("/district/all", authMiddleware, districtController.getAll)
r.get("/district/:id", authMiddleware, districtController.getById)
r.post("/district/add", authMiddleware, districtController.add)
r.put("/district/update/:id", authMiddleware, districtController.update)
r.delete("/district/delete/:id", authMiddleware, districtController.delete)

// Village
r.get("/village/all", authMiddleware, villageController.getAll)
r.get("/village/:id", authMiddleware, villageController.getById)
r.post("/village/add", authMiddleware, villageController.add)
r.put("/village/update/:id", authMiddleware, villageController.update)
r.delete("/village/delete/:id", authMiddleware, villageController.delete)

// Dropdown
r.get("/dropdown/department", authMiddleware, dropdownController.getDepartment)
r.get("/dropdown/position/:id", authMiddleware, dropdownController.getPosition)
r.get("/dropdown/role", authMiddleware, dropdownController.getRole)
r.get("/dropdown/country", authMiddleware, dropdownController.getCountry)
r.get("/dropdown/province/:id", authMiddleware, dropdownController.getProvince)
r.get("/dropdown/city/:id", authMiddleware, dropdownController.getCity)
r.get("/dropdown/district/:id", authMiddleware, dropdownController.getDistrict)
r.get("/dropdown/village/:id", authMiddleware, dropdownController.getVillage)
r.get("/dropdown/gender", authMiddleware, dropdownController.getGender)
r.get("/dropdown/blood-type", authMiddleware, dropdownController.getBloodType)
r.get("/dropdown/religion", authMiddleware, dropdownController.getReligion)
r.get("/dropdown/married-status", authMiddleware, dropdownController.getMarriedStatus)
r.get("/dropdown/citizen-status", authMiddleware, dropdownController.getCitizenStatus)

// Employee
r.get("/employee/all", authMiddleware, roleMiddleware("view_employee"), employeeController.getEmployees)
r.get("/employee/:id", authMiddleware, roleMiddleware("view_employee"), employeeController.getEmployeeById)
r.post("/employee/add", authMiddleware, roleMiddleware("create_employee"), employeeController.addEmployee)
r.put("/employee/update/:id", authMiddleware, roleMiddleware("update_employee"), employeeController.updateEmployee)
r.patch("/employee/status/:id", authMiddleware, roleMiddleware("update_employee"), employeeController.statusEmployee)
r.delete("/employee/delete/:id", authMiddleware, roleMiddleware("delete_employee"), employeeController.deleteEmployee)
r.post("/employee/generate-code", authMiddleware, roleMiddleware("create_employee"), employeeController.generateEmployeeCode)

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