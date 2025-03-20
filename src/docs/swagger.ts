import { OpenAPIHono } from "@hono/zod-openapi"
import { authSwagger } from "./auth.swagger"
import { dropdownSwagger } from "./dropdown.swagger"
import { employeeSwagger } from "./employee.swagger"
import { attendanceSwagger } from "./attendance.swagger"
import { payrollSwagger } from "./payroll.swagger"

const swagger = new OpenAPIHono()

swagger.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer'
})

// Auth
swagger.openAPIRegistry.registerPath(authSwagger.loginRoute())

// Dropdown
swagger.openAPIRegistry.registerPath(dropdownSwagger.getDepartmentRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getPositionRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getRoleRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getCountryRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getProvinceRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getCityRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getDistrictRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getVillageRoute())

// Employee
swagger.openAPIRegistry.registerPath(employeeSwagger.getEmployeesRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.getEmployeeByIdRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.addEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.updateEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.statusEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.deleteEmployeeRoute())

// Attendance
swagger.openAPIRegistry.registerPath(attendanceSwagger.getAttendancesRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.getAttendanceByIdRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.checkInRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.checkOutRoute())

// Payroll
swagger.openAPIRegistry.registerPath(payrollSwagger.getPayrollsRoute())

export default swagger