import { OpenAPIHono } from "@hono/zod-openapi"
import { authSwagger } from "./auth.swagger"
import { dropdownSwagger } from "./dropdown.swagger"
import { employeeSwagger } from "./employee.swagger"
import { attendanceSwagger } from "./attendance.swagger"
import { payrollSwagger } from "./payroll.swagger"
import { countrySwagger } from "./country.swagger"
import { provinceSwagger } from "./province.swagger"
import { citySwagger } from "./city.swagger"
import { districtSwagger } from "./district.swagger"
import { villageSwagger } from "./village.swagger"
import { departmentSwagger } from "./department.swagger"
import { positionSwagger } from "./position.swagger"
import { roleSwagger } from "./role.swagger"

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
swagger.openAPIRegistry.registerPath(dropdownSwagger.getGenderRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getBloodTypeRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getReligionRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getMarriedStatusRoute())
swagger.openAPIRegistry.registerPath(dropdownSwagger.getCitizenStatusRoute())

// Role
swagger.openAPIRegistry.registerPath(roleSwagger.getRole())
swagger.openAPIRegistry.registerPath(roleSwagger.getRoleByIdRoute())
swagger.openAPIRegistry.registerPath(roleSwagger.addRoleRoute())
swagger.openAPIRegistry.registerPath(roleSwagger.updateRoleRoute())
swagger.openAPIRegistry.registerPath(roleSwagger.deleteRoleRoute())

// Country
swagger.openAPIRegistry.registerPath(countrySwagger.getCountryRoute())
swagger.openAPIRegistry.registerPath(countrySwagger.getCountryByIdRoute())
swagger.openAPIRegistry.registerPath(countrySwagger.addCountryRoute())
swagger.openAPIRegistry.registerPath(countrySwagger.updateCountryRoute())
swagger.openAPIRegistry.registerPath(countrySwagger.deleteCountryRoute())

// Province
swagger.openAPIRegistry.registerPath(provinceSwagger.getProvinceRoute())
swagger.openAPIRegistry.registerPath(provinceSwagger.getProvinceByIdRoute())
swagger.openAPIRegistry.registerPath(provinceSwagger.addProvinceRoute())
swagger.openAPIRegistry.registerPath(provinceSwagger.updateProvinceRoute())
swagger.openAPIRegistry.registerPath(provinceSwagger.deleteProvinceRoute())

// City
swagger.openAPIRegistry.registerPath(citySwagger.getCityRoute())
swagger.openAPIRegistry.registerPath(citySwagger.getCityByIdRoute())
swagger.openAPIRegistry.registerPath(citySwagger.addCityRoute())
swagger.openAPIRegistry.registerPath(citySwagger.updateCityRoute())
swagger.openAPIRegistry.registerPath(citySwagger.deleteCityRoute())

// District
swagger.openAPIRegistry.registerPath(districtSwagger.getDistrictRoute())
swagger.openAPIRegistry.registerPath(districtSwagger.getDistrictByIdRoute())
swagger.openAPIRegistry.registerPath(districtSwagger.addDistrictRoute())
swagger.openAPIRegistry.registerPath(districtSwagger.updateDistrictRoute())
swagger.openAPIRegistry.registerPath(districtSwagger.deleteDistrictRoute())

// Village
swagger.openAPIRegistry.registerPath(villageSwagger.getVillageRoute())
swagger.openAPIRegistry.registerPath(villageSwagger.getVillageByIdRoute())
swagger.openAPIRegistry.registerPath(villageSwagger.addVillageRoute())
swagger.openAPIRegistry.registerPath(villageSwagger.updateVillageRoute())
swagger.openAPIRegistry.registerPath(villageSwagger.deleteVillageRoute())

// Department
swagger.openAPIRegistry.registerPath(departmentSwagger.getDepartmentRoute())
swagger.openAPIRegistry.registerPath(departmentSwagger.getDepartmentByIdRoute())
swagger.openAPIRegistry.registerPath(departmentSwagger.addDepartmentRoute())
swagger.openAPIRegistry.registerPath(departmentSwagger.updateDepartmentRoute())
swagger.openAPIRegistry.registerPath(departmentSwagger.deleteDepartmentRoute())

// Position
swagger.openAPIRegistry.registerPath(positionSwagger.getPositionRoute())
swagger.openAPIRegistry.registerPath(positionSwagger.getPositionByIdRoute())
swagger.openAPIRegistry.registerPath(positionSwagger.addPositionRoute())
swagger.openAPIRegistry.registerPath(positionSwagger.updatePositionRoute())
swagger.openAPIRegistry.registerPath(positionSwagger.deletePositionRoute())

// Employee
swagger.openAPIRegistry.registerPath(employeeSwagger.getEmployeesRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.getEmployeeByIdRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.addEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.updateEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.statusEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.deleteEmployeeRoute())
swagger.openAPIRegistry.registerPath(employeeSwagger.generateCodeRoute())

// Attendance
swagger.openAPIRegistry.registerPath(attendanceSwagger.getAttendancesRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.getAttendanceByIdRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.checkInRoute())
swagger.openAPIRegistry.registerPath(attendanceSwagger.checkOutRoute())

// Payroll
swagger.openAPIRegistry.registerPath(payrollSwagger.getPayrollsRoute())
swagger.openAPIRegistry.registerPath(payrollSwagger.fileUploadPayrollRoute())

export default swagger