/*
  Warnings:

  - The primary key for the `city` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `city` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `province_id` on the `city` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `country` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `district` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `district` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `city_id` on the `district` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `village_id` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `district_id` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `city_id` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `province_id` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `country_id` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `employee_training` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `employee_training` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `training_id` on the `employee_training` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `leave` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `leave` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `loan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `loan` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `payroll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `payroll` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `province` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `province` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `country_id` on the `province` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `reimbursement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `reimbursement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `training` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `training` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `village` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `village` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `district_id` on the `village` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_province_id_fkey";

-- DropForeignKey
ALTER TABLE "district" DROP CONSTRAINT "district_city_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_city_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_country_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_district_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_province_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_village_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_training" DROP CONSTRAINT "employee_training_training_id_fkey";

-- DropForeignKey
ALTER TABLE "province" DROP CONSTRAINT "province_country_id_fkey";

-- DropForeignKey
ALTER TABLE "village" DROP CONSTRAINT "village_district_id_fkey";

-- AlterTable
ALTER TABLE "city" DROP CONSTRAINT "city_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "province_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "city_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "country" DROP CONSTRAINT "country_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "country_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "department" ADD COLUMN     "alt_name" VARCHAR(10);

-- AlterTable
ALTER TABLE "district" DROP CONSTRAINT "district_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "city_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "district_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "village_id" SET DATA TYPE INTEGER,
ALTER COLUMN "district_id" SET DATA TYPE INTEGER,
ALTER COLUMN "city_id" SET DATA TYPE INTEGER,
ALTER COLUMN "province_id" SET DATA TYPE INTEGER,
ALTER COLUMN "country_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "employee_training" DROP CONSTRAINT "employee_training_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "training_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "employee_training_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "leave" DROP CONSTRAINT "leave_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "leave_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "loan" DROP CONSTRAINT "loan_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "loan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "payroll" DROP CONSTRAINT "payroll_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "payroll_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "position" ADD COLUMN     "alt_name" VARCHAR(10);

-- AlterTable
ALTER TABLE "province" DROP CONSTRAINT "province_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "country_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "province_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reimbursement" DROP CONSTRAINT "reimbursement_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "reimbursement_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "training" DROP CONSTRAINT "training_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "training_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "village" DROP CONSTRAINT "village_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "district_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "village_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_village_id_fkey" FOREIGN KEY ("village_id") REFERENCES "village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_training" ADD CONSTRAINT "employee_training_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "province" ADD CONSTRAINT "province_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "village" ADD CONSTRAINT "village_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;
