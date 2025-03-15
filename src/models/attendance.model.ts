import { prisma } from "@/lib/encryption";
import type { Attendance } from "@prisma/client";

export const attendanceModel = {
    async getAttendances(role: string, userId: string) {
        switch (role) { 
            case "HR":
                return await prisma.$queryRaw<Attendance[]>`
                    SELECT at.id, e.name as employee, d.name as department, p.name as position, at.check_in, at.check_out, at.date, at.work_status, at.work_duration, at.status
                    FROM attendance at
                    JOIN employee e ON at.employee_id = e.id
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                `
            case "Manager":
                return await prisma.$queryRaw<Attendance[]>`
                    SELECT at.id, e.name as employee, d.name as department, p.name as position, at.check_in, at.check_out, at.date, at.work_status, at.work_duration, at.status
                    FROM attendance at
                    JOIN employee e ON at.employee_id = e.id
                    JOIN department d ON e.department_id = d.id
                    JOIN position p ON e.position_id = p.id
                    WHERE e.department_id = (SELECT department_id FROM employee WHERE id = ${userId}::uuid)
                ` 
            default:
                return { status: false, error: "Forbidden" }
        }               
    },

    async getAttendanceById(userId: string) {
        return await prisma.$queryRaw<Attendance[]>`
            SELECT at.id, e.name as employee, d.name as department, p.name as position, at.check_in, at.check_out, at.date, at.work_status, at.work_duration, at.status
            FROM attendance at
            JOIN employee e ON at.employee_id = e.id
            JOIN department d ON e.department_id = d.ID
            JOIN position p ON e.position_id = p.id
            WHERE at.employee_id = ${userId}::uuid
        `
    },

    async existingAttendance(userId: string, formattedDate: string) {
        return await prisma.$queryRaw<{ checkin: Date }[]>`
            SELECT at.check_in
            FROM attendance at
            WHERE at.employee_id = ${userId}::uuid
            AND at.date = ${formattedDate}::date
        `
    },

    async checkTodayAttendance(userId: string, attendanceId: string) { 
        return await prisma.$queryRaw<{ id: string, checkin: Date, checkout: Date }[]>`
            SELECT at.id, at.check_in, at.check_out
            FROM attendance at
            WHERE at.id = ${attendanceId}::uuid AND at.employee_id = ${userId}::uuid
        `
    },

    async checkIn(userId: string, formattedDate: string, status: string) {
        return await prisma.$executeRaw`
            INSERT INTO attendance (employee_id, check_in, date, status)
            VALUES (${userId}::uuid, NOW(), ${formattedDate}::date, ${status}::"AttendanceStatus")
        `
    },

    async checkOut(workStatus: string, workDuration: number, attendanceId: string) {
        return await prisma.$executeRaw`
            UPDATE attendance
            SET check_out = NOW(), work_status = ${workStatus}::"WorkStatus", work_duration = ${workDuration}
            WHERE id = ${attendanceId}::uuid
        `
    }
}