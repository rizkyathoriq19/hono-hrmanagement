import type { Context } from "hono"
import { attendanceModel } from "@/models/attendance.model"
import { res } from "@/utils/response"
import { IAttendance } from "@/types/attendance.type"

const formatAttendanceData = (attendance: IAttendance) => ({
    id: attendance.id,
    employee: {
        id: attendance.employee_id,
        name: attendance.employee_name,
    },
    department: {
        id: attendance.department_id,
        name: attendance.department_name,
    },
    position: {
        id: attendance.position_id,
        name: attendance.position_name,
    },
    checkin: attendance.check_in,
    checkout: attendance.check_out,
    date: attendance.date,
    checkinLat: attendance.check_in_lat,
    checkinLong: attendance.check_in_long,
    checkoutLat: attendance.check_out_lat,
    checkoutLong: attendance.check_out_long,
    workStatus: attendance.work_status,
    workDuration: attendance.work_duration,
    status: attendance.status,
})

export const attendanceController = {
    async getAll(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized") 

            const result = await attendanceModel.getAttendances(user.role, user.id)

            return res(c, 'get', 200, "Get all attendance success", result.map(formatAttendanceData)) 
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")  
        }
    },

    async getById(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized") 

            const userId = c.req.param("id")
            if (!userId) return res(c, 'err', 404, "Employee not found") 

            const result = await attendanceModel.getAttendanceById(userId)

            return res(c, 'getDetail', 200, "Get attendance success", result.map(formatAttendanceData)[0]) 
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")  
        }
    },

    async checkin(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized") 

            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const formattedDate = today.toISOString().split("T")[0]
            const hours = new Date().getHours()
            let attendanceStatus

            hours == 8 && hours <= 9 ? attendanceStatus = "PRESENT" 
                : hours > 9 && hours <= 23 ? attendanceStatus = "LATE"
                    : attendanceStatus = "ABSENT"

            const existingAttendance = await attendanceModel.existingAttendance(user.id, formattedDate)
            if (existingAttendance.length > 0)return res(c, 'err', 400, "You already checkin today") 
            
            const attendance = await attendanceModel.checkIn(user.id, formattedDate, attendanceStatus)

            return res(c, 'post', 200, "Checkin success") 
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")  
        }
    },

    async checkout(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return res(c, 'err', 401, "Unauthorized") 
            
            const attendanceId = c.req.param("id")
            const attendance = await attendanceModel.checkTodayAttendance(user.id, attendanceId)

            if (!attendance.length) return res(c, 'err', 404, "Attendance not found") 
            if (attendance[0].check_out) return res(c, 'err', 400, "You already checkout today") 

            const now = new Date()
            let workDuration: number = Math.floor((now.getTime() - new Date(attendance[0].check_in).getTime()) / 60000)
            workDuration = Math.max(0, workDuration)

            const MIN_FULL_TIME = 480
            const MIN_HALF_DAY = 240
            const OVERTIME_BUFFER = 90
            let workStatus: "FULL_TIME" | "HALF_DAY" | "OVERTIME" | "INSUFFICIENT"

            workDuration >= MIN_FULL_TIME && workDuration < MIN_FULL_TIME + OVERTIME_BUFFER
                ? workStatus = "FULL_TIME" : workDuration >= MIN_HALF_DAY && workDuration < MIN_FULL_TIME
                    ? workStatus = "HALF_DAY" : workDuration >= MIN_FULL_TIME + OVERTIME_BUFFER
                        ? workStatus = "OVERTIME" : workStatus = "INSUFFICIENT"
            
            const result = await attendanceModel.checkOut(workStatus, workDuration, attendanceId)

            return res(c, 'patch', 200, "Checkout success") 
        } catch (error) {
            return res(c, 'err', 500, error instanceof Error ? error.message : "Internal server error")  
        }
    },
}