-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('FULL_TIME', 'HALF_DAY', 'OVERTIME', 'INSUFFICIENT');

-- AlterTable
ALTER TABLE "attendance" ADD COLUMN     "workDuration" INTEGER,
ADD COLUMN     "workStatus" "WorkStatus";
