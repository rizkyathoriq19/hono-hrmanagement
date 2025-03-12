import type { Context } from "hono"
import { prisma } from "@/lib/encryption.js"
import { z } from "zod"
import type { Employee } from "@prisma/client"

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

    async getById(c: Context) { },

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

    },

    async update(c: Context) { },

}