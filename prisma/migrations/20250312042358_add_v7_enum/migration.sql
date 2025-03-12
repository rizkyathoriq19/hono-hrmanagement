CREATE EXTENSION IF NOT EXISTS "pg_uuidv7";

/*
  Warnings:

  - The values [APPROVED] on the enum `LeaveStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [APPROVED] on the enum `ReimbursementStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeaveStatus_new" AS ENUM ('PENDING', 'APPROVED_BY_MANAGER', 'APPROVED_BY_HR', 'REJECTED');
ALTER TABLE "leave" ALTER COLUMN "status" TYPE "LeaveStatus_new" USING ("status"::text::"LeaveStatus_new");
ALTER TYPE "LeaveStatus" RENAME TO "LeaveStatus_old";
ALTER TYPE "LeaveStatus_new" RENAME TO "LeaveStatus";
DROP TYPE "LeaveStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ReimbursementStatus_new" AS ENUM ('PENDING', 'APPROVED_BY_MANAGER', 'APPROVED_BY_HR', 'REJECTED');
ALTER TABLE "reimbursement" ALTER COLUMN "status" TYPE "ReimbursementStatus_new" USING ("status"::text::"ReimbursementStatus_new");
ALTER TYPE "ReimbursementStatus" RENAME TO "ReimbursementStatus_old";
ALTER TYPE "ReimbursementStatus_new" RENAME TO "ReimbursementStatus";
DROP TYPE "ReimbursementStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "attendance" ALTER COLUMN "id" SET DEFAULT uuid_generate_v7();

-- AlterTable
ALTER TABLE "department" ALTER COLUMN "id" SET DEFAULT uuid_generate_v7();

-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "id" SET DEFAULT uuid_generate_v7();

-- AlterTable
ALTER TABLE "position" ALTER COLUMN "id" SET DEFAULT uuid_generate_v7();

-- AlterTable
ALTER TABLE "user_credentials" ALTER COLUMN "id" SET DEFAULT uuid_generate_v7();
