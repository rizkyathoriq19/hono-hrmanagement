import { prisma } from "@/lib/encryption";
import type { Attendance } from "@prisma/client";

export const attendanceModel = {
    async getAttendances(role: string, userId: string) {
        switch (role) { 
            case "HR":
                return await prisma.$queryRaw<Attendance[]>`
                    SELECT at.id, e.name as employee, d.name as department, p.title as position, at.checkin, at.checkout, at.date, at."workStatus", at."workDuration", at.status
                    FROM attendance at
                    JOIN employee e ON at."employeeId" = e.id
                    JOIN department d ON e."departmentId" = d.id
                    JOIN position p ON e."positionId" = p.id
                `
            case "Manager":
                return await prisma.$queryRaw<Attendance[]>`
                    SELECT at.id, e.name as employee, d.name as department, p.title as position, at.checkin, at.checkout, at.date, at."workStatus", at."workDuration", at.status
                    FROM attendance at
                    JOIN employee e ON at."employeeId" = e.id
                    JOIN department d ON e."departmentId" = d.id
                    JOIN position p ON e."positionId" = p.id
                    WHERE e."departmentId" = (SELECT "departmentId" FROM employee WHERE id = ${userId}::uuid)
                ` 
            default:
                return { status: false, error: "Forbidden" }
        }               
    },

    async getAttendanceById(userId: string) {
        return await prisma.$queryRaw<Attendance[]>`
            SELECT at.id, e.name as employee, d.name as department, p.title as position, at.checkin, at.checkout, at.date, at."workStatus", at."workDuration", at.status
            FROM attendance at
            JOIN employee e ON at."employeeId" = e.id
            JOIN department d ON e."departmentId" = d.ID
            JOIN position p ON e."positionId" = p.id
            WHERE at."employeeId" = ${userId}::uuid
        `
    },

    async existingAttendance(userId: string, formattedDate: string) {
        return await prisma.$queryRaw<{ checkin: Date }[]>`
            SELECT at."checkin"
            FROM attendance at
            WHERE at."employeeId" = ${userId}::uuid
            AND at."date" = ${formattedDate}::date
        `
    },

    async checkTodayAttendance(userId: string, attendanceId: string) { 
        return await prisma.$queryRaw<{ id: string, checkin: Date, checkout: Date }[]>`
            SELECT at.id, at."checkin", at."checkout"
            FROM attendance at
            WHERE at.id = ${attendanceId}::uuid AND at."employeeId" = ${userId}::uuid
        `
    },

    async checkIn(userId: string, formattedDate: string, status: string) {
        return await prisma.$executeRaw`
            INSERT INTO attendance ("employeeId", "checkin", "date", "status")
            VALUES (${userId}::uuid, NOW(), ${formattedDate}::date, ${status}::"AttendanceStatus")
        `
    },

    async checkOut(workStatus: string, workDuration: number, attendanceId: string) {
        return await prisma.$executeRaw`
            UPDATE attendance
            SET "checkout" = NOW(), "workStatus" = ${workStatus}::"WorkStatus", "workDuration" = ${workDuration}
            WHERE id = ${attendanceId}::uuid
        `
    }
}