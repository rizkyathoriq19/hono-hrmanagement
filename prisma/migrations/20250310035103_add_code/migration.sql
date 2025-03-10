/*
  Warnings:

  - You are about to drop the column `departmentCode` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `employeeCode` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `positionCode` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `employeeCode` on the `user_credentials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `position` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `user_credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `user_credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "department_departmentCode_key";

-- DropIndex
DROP INDEX "employee_employeeCode_key";

-- DropIndex
DROP INDEX "position_positionCode_key";

-- DropIndex
DROP INDEX "user_credentials_employeeCode_key";

-- AlterTable
ALTER TABLE "department" DROP COLUMN "departmentCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "employeeCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "position" DROP COLUMN "positionCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_credentials" DROP COLUMN "employeeCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "department_code_key" ON "department"("code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_code_key" ON "employee"("code");

-- CreateIndex
CREATE UNIQUE INDEX "position_code_key" ON "position"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_code_key" ON "user_credentials"("code");
