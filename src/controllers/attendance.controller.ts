import type { Context } from "hono"
import { attendanceModel } from "@/models/attendance"

export const attendanceController = {
    async getAll(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401);
            
            const result = await attendanceModel.getAttendances(user.role, user.id)
            console.log(111, result)
            if (!result) return c.json({ status: false, error: "Forbidden" }, 403);

            return c.json({ status: true, message: "Get attendance success",  data: result }, 200);
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500)        
        }
    },

    async getById(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401);

            const userId = c.req.param("id")
            if (!userId) return c.json({ status: false, error: "User not found" }, 403);

            const result = await attendanceModel.getAttendanceById(userId)
            if (!result.length) return c.json({ status: false, error: "Forbidden" }, 403);

            return c.json({ status: true, message: "Get attendance success", data: result[0] }, 200);
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500)                         
        }
    },

    async checkin(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401);

            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const formattedDate = today.toISOString().split("T")[0]
            const hours = new Date().getHours()
            let attendanceStatus

            hours == 8 && hours <= 9 ? attendanceStatus = "PRESENT" 
                : hours > 9 && hours <= 23 ? attendanceStatus = "LATE"
                    : attendanceStatus = "ABSENT"

            const existingAttendance = await attendanceModel.existingAttendance(user.id, formattedDate)
            if (existingAttendance.length > 0) return c.json({ status: false, error: "You already checkin today" }, 400)
            
            const attendance = await attendanceModel.checkIn(user.id, formattedDate, attendanceStatus)

            return c.json({ status: true, message: "Checkin success" }, 200)
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500)          
        }
    },

    async checkout(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401)
            
            const attendanceId = c.req.param("id")
            const attendance = await attendanceModel.checkTodayAttendance(user.id, attendanceId)

            if (!attendance.length) return c.json({ status: false, error: "Attendance not found" }, 404)
            if (attendance[0].checkout) return c.json({ status: false, error: "You already checkout" }, 400)
            
            const now = new Date()
            let workDuration: number = Math.floor((now.getTime() - new Date(attendance[0].checkin).getTime()) / 60000)
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

            return c.json({ status: true, message: "Checkout success" }, 200)
        } catch (error) {
            return c.json({
                status: false,
                error: error instanceof Error ? error.message : "Internal server error"
            }, 500)               
        }
    },
}