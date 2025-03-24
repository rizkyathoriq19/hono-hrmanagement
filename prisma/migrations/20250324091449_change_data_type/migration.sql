/*
  Warnings:

  - The primary key for the `city` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `district` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `province` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `village` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_province_id_fkey";

-- DropForeignKey
ALTER TABLE "district" DROP CONSTRAINT "district_city_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_city_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_district_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_province_id_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_village_id_fkey";

-- DropForeignKey
ALTER TABLE "village" DROP CONSTRAINT "village_district_id_fkey";

-- AlterTable
ALTER TABLE "city" DROP CONSTRAINT "city_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "province_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "city_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "district" DROP CONSTRAINT "district_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "city_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "district_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "village_id" SET DATA TYPE BIGINT,
ALTER COLUMN "district_id" SET DATA TYPE BIGINT,
ALTER COLUMN "city_id" SET DATA TYPE BIGINT,
ALTER COLUMN "province_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "province" DROP CONSTRAINT "province_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "province_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "village" DROP CONSTRAINT "village_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "district_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "village_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_village_id_fkey" FOREIGN KEY ("village_id") REFERENCES "village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "village" ADD CONSTRAINT "village_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;
