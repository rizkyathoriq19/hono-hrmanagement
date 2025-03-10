/*
  Warnings:

  - A unique constraint covering the columns `[departmentCode]` on the table `department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeCode]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[positionCode]` on the table `position` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeCode]` on the table `user_credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentCode` to the `department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeCode` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionCode` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeCode` to the `user_credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "department" ADD COLUMN     "departmentCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "employeeCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "position" ADD COLUMN     "positionCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_credentials" ADD COLUMN     "employeeCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "department_departmentCode_key" ON "department"("departmentCode");

-- CreateIndex
CREATE UNIQUE INDEX "employee_employeeCode_key" ON "employee"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "position_positionCode_key" ON "position"("positionCode");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_employeeCode_key" ON "user_credentials"("employeeCode");
