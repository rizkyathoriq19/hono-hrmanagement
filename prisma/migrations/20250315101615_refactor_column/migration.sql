/*
  Warnings:

  - The values [REJECTED] on the enum `LeaveStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [REJECTED] on the enum `ReimbursementStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `checkin` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `checkout` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `workDuration` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `workStatus` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `hireDate` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `employee_training` table. All the data in the column will be lost.
  - You are about to drop the column `trainingId` on the `employee_training` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `leave` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `leave` table. All the data in the column will be lost.
  - You are about to drop the column `leaveType` on the `leave` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `leave` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `loanDate` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `basicSalary` on the `payroll` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `payroll` table. All the data in the column will be lost.
  - You are about to drop the column `netSalary` on the `payroll` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `payroll` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `reimbursement` table. All the data in the column will be lost.
  - You are about to drop the column `submissionDate` on the `reimbursement` table. All the data in the column will be lost.
  - You are about to drop the column `permissionId` on the `role_permission` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `role_permission` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `user_credentials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employee_id,training_id]` on the table `employee_training` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_id,permission_id]` on the table `role_permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employee_id` to the `attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_id` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hire_date` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position_id` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `employee_training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `training_id` to the `employee_training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loan_date` to the `loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basic_salary` to the `payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `net_salary` to the `payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_date` to the `payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_id` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `reimbursement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submission_date` to the `reimbursement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permission_id` to the `role_permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `role_permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `user_credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeaveStatus_new" AS ENUM ('PENDING', 'APPROVED_BY_MANAGER', 'REJECTED_BY_MANAGER', 'APPROVED_BY_HR', 'REJECTED_BY_HR', 'CANCELLED');
ALTER TABLE "leave" ALTER COLUMN "status" TYPE "LeaveStatus_new" USING ("status"::text::"LeaveStatus_new");
ALTER TYPE "LeaveStatus" RENAME TO "LeaveStatus_old";
ALTER TYPE "LeaveStatus_new" RENAME TO "LeaveStatus";
DROP TYPE "LeaveStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ReimbursementStatus_new" AS ENUM ('PENDING', 'APPROVED_BY_MANAGER', 'REJECTED_BY_MANAGER', 'APPROVED_BY_HR', 'REJECTED_BY_HR', 'CANCELLED');
ALTER TABLE "reimbursement" ALTER COLUMN "status" TYPE "ReimbursementStatus_new" USING ("status"::text::"ReimbursementStatus_new");
ALTER TYPE "ReimbursementStatus" RENAME TO "ReimbursementStatus_old";
ALTER TYPE "ReimbursementStatus_new" RENAME TO "ReimbursementStatus";
DROP TYPE "ReimbursementStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_positionId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_roleId_fkey";

-- DropForeignKey
ALTER TABLE "employee_training" DROP CONSTRAINT "employee_training_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "employee_training" DROP CONSTRAINT "employee_training_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "leave" DROP CONSTRAINT "leave_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "loan" DROP CONSTRAINT "loan_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "payroll" DROP CONSTRAINT "payroll_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "reimbursement" DROP CONSTRAINT "reimbursement_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "role_permission" DROP CONSTRAINT "role_permission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "role_permission" DROP CONSTRAINT "role_permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_credentials" DROP CONSTRAINT "user_credentials_employeeId_fkey";

-- DropIndex
DROP INDEX "employee_training_employeeId_trainingId_key";

-- DropIndex
DROP INDEX "role_permission_roleId_permissionId_key";

-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "checkin",
DROP COLUMN "checkout",
DROP COLUMN "employeeId",
DROP COLUMN "workDuration",
DROP COLUMN "workStatus",
ADD COLUMN     "check_in" TIMESTAMP(3),
ADD COLUMN     "check_in_lat" DECIMAL(10,7),
ADD COLUMN     "check_in_long" DECIMAL(10,7),
ADD COLUMN     "check_out" TIMESTAMP(3),
ADD COLUMN     "check_out_lat" DECIMAL(10,7),
ADD COLUMN     "check_out_long" DECIMAL(10,7),
ADD COLUMN     "employee_id" UUID NOT NULL,
ADD COLUMN     "work_duration" INTEGER,
ADD COLUMN     "work_status" "WorkStatus";

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "departmentId",
DROP COLUMN "hireDate",
DROP COLUMN "positionId",
DROP COLUMN "roleId",
ADD COLUMN     "department_id" UUID NOT NULL,
ADD COLUMN     "hire_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "position_id" UUID NOT NULL,
ADD COLUMN     "role_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employee_training" DROP COLUMN "employeeId",
DROP COLUMN "trainingId",
ADD COLUMN     "employee_id" UUID NOT NULL,
ADD COLUMN     "training_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "leave" DROP COLUMN "employeeId",
DROP COLUMN "endDate",
DROP COLUMN "leaveType",
DROP COLUMN "startDate",
ADD COLUMN     "employee_id" UUID NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "leave_type" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "loan" DROP COLUMN "employeeId",
DROP COLUMN "loanDate",
ADD COLUMN     "employee_id" UUID NOT NULL,
ADD COLUMN     "loan_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "payroll" DROP COLUMN "basicSalary",
DROP COLUMN "employeeId",
DROP COLUMN "netSalary",
DROP COLUMN "paymentDate",
ADD COLUMN     "basic_salary" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "employee_id" UUID NOT NULL,
ADD COLUMN     "net_salary" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "payment_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "position" DROP COLUMN "departmentId",
ADD COLUMN     "department_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "reimbursement" DROP COLUMN "employeeId",
DROP COLUMN "submissionDate",
ADD COLUMN     "employee_id" UUID NOT NULL,
ADD COLUMN     "submission_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "role_permission" DROP COLUMN "permissionId",
DROP COLUMN "roleId",
ADD COLUMN     "permission_id" INTEGER NOT NULL,
ADD COLUMN     "role_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_credentials" DROP COLUMN "employeeId",
ADD COLUMN     "employee_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employee_training_employee_id_training_id_key" ON "employee_training"("employee_id", "training_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_permission_role_id_permission_id_key" ON "role_permission"("role_id", "permission_id");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_credentials" ADD CONSTRAINT "user_credentials_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll" ADD CONSTRAINT "payroll_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leave" ADD CONSTRAINT "leave_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reimbursement" ADD CONSTRAINT "reimbursement_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_training" ADD CONSTRAINT "employee_training_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_training" ADD CONSTRAINT "employee_training_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
