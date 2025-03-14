import { OpenAPIHono } from "@hono/zod-openapi"
import { authSwagger } from "./auth.swagger"
import { employeeSwagger } from "./employee.swagger"
import { attendanceSwagger } from "./attendance.swagger"

const swagger = new OpenAPIHono()

swagger.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer'
})

// Auth
swagger.openAPIRegistry.registerPath(authSwagger.loginRoute())

// Employee
swagger.openAPIRegistry.registerPath(employeeSwagger.getEmployeesRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.getEmployeeByIdRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.addEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.updateEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.deleteEmployeeRoute())

// Attendance
swagger.openAPIRegistry.registerPath(attendanceSwagger.getAttendancesRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.getAttendanceByIdRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.checkInRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.checkOutRoute())

export default swagger