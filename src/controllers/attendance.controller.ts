import type { Context } from "hono"
import { prisma } from "@/lib/encryption.js"
import { z } from "zod"
import type { Employee, Attendance } from "@prisma/client"

export const attendanceController = {
    async getAll(c: Context) {
        let result: Employee[] = []
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401);
            
            if (user.role === "HR") {
                result = await prisma.$queryRaw`
                    SELECT at.id, e.name as employee, d.name as department, p.title as position, at.checkin, at.checkout, at.date, at.status
                    FROM attendance at
                    JOIN employee e ON at."employeeId" = e.id
                    JOIN department d ON e."departmentId" = d.id
                    JOIN position p ON e."positionId" = p.id
                `
            } else if (user.role === "Manager") {
                result = await prisma.$queryRaw`
                    SELECT at.id, e.name as employee, d.name as department, p.title as position, at.checkin, at.checkout, at.date, at.status
                    FROM attendance at
                    JOIN employee e ON at."employeeId" = e.id
                    JOIN department d ON e."departmentId" = d.id
                    JOIN position p ON e."positionId" = p.id
                    WHERE e."departmentId" = (SELECT "departmentId" FROM employee WHERE id = ${user.id}::uuid)
                `                
            } else return c.json({ status: false, error: "Forbidden" }, 403);

            return c.json({ status: true, message: "Get attendance success",  data: result }, 200);
        } catch (error) {
            if (error instanceof Error) {
                return c.json({ status: false, error: error.message }, 500);
            }
            return c.json({status: false, error: "Internal server error" }, 500);            
        }
    },

    async getById(c: Context) {
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401);

            const userId = c.req.param("id")
            if (!userId) return c.json({ status: false, error: "User not found" }, 403);

            const result = await prisma.$queryRaw <{
                id: string,
                employee: string,
                department: string,
                position: string,
                checkin: Date,
                checkout: Date,
                date: Date,
                workStatus: "FULL_TIME" | "HALF_DAY" | "OVERTIME" | "INSUFFICIENT",
                workDuration: number,
                status: "PRESENT" | "ABSENT" | "LATE"
            }[]>`
                SELECT at.id, e.name as employee, d.name as department, p.title as position, at.checkin, at.checkout, at.date, at."workStatus", at."workDuration", at.status
                FROM attendance at
                JOIN employee e ON at."employeeId" = e.id
                JOIN department d ON e."departmentId" = d.ID
                JOIN position p ON e."positionId" = p.id
                WHERE at."employeeId" = ${userId}::uuid
            `

            return c.json({ status: true, message: "Get attendance success", data: result[0] }, 200);
        } catch (error) {
            if (error instanceof Error) {
                return c.json({ status: false, error: error.message }, 500);
            }
            return c.json({status: false, error: "Internal server error" }, 500);                        
        }
    },

    async checkin(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401);

            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const formattedDate = today.toISOString().split("T")[0]

            const existingAttendance = await prisma.$queryRaw < { checkin: Date}[]>`
                SELECT at."checkin"
                FROM attendance at
                WHERE at."employeeId" = ${user.id}::uuid 
                AND at."date" = ${formattedDate}::date
            `
            if (existingAttendance.length > 0) return c.json({ status: false, error: "You already checkin today" }, 400)
            
            const attendance = await prisma.$queryRawUnsafe<{ id: string, checkin: Date }[]>(`
                INSERT INTO attendance ("employeeId", "checkin", "date", "status")
                VALUES ($1::uuid, NOW(), $2::date, $3::"AttendanceStatus")
                RETURNING id, "checkin";
            `, user.id, formattedDate, "PRESENT")

            return c.json({ status: true, message: "Checkin success", data: attendance[0] }, 200)
        } catch (error) {
            if (error instanceof Error) {
                return c.json({ status: false, error: error.message }, 500);
            }
            return c.json({status: false, error: "Internal server error" }, 500);             
        }
    },

    async checkout(c: Context) { 
        try {
            const user = c.get("employee")
            if (!user) return c.json({ status: false, error: "Unauthorized" }, 401)
            
            const attendanceId = c.req.param("id")
            const attendance = await prisma.$queryRaw<{ id: string, checkin: Date, checkout: Date }[]>`
                SELECT at.id, at."checkin", at."checkout"
                FROM attendance at
                WHERE at.id = ${attendanceId}::uuid AND at."employeeId" = ${user.id}::uuid
            `

            if (!attendance) return c.json({ status: false, error: "Attendance not found" }, 404)
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
            
            const result = await prisma.$queryRawUnsafe<Attendance[]>(`
                UPDATE attendance
                SET "checkout" = NOW(), "workStatus" = $1::"WorkStatus", "workDuration" = $2
                WHERE id = $3::uuid
                RETURNING id, "checkin", "checkout", "workStatus", "workDuration";
            `, workStatus, workDuration, attendanceId) 

            return c.json({ status: true, message: "Checkout success", data: result[0] }, 200)
        } catch (error) {
            if (error instanceof Error) {
                return c.json({ status: false, error: error.message }, 500);
            }
            return c.json({status: false, error: "Internal server error" }, 500);             
        }
    },
}