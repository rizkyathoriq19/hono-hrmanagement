-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHIST', 'CONFUCIAN', 'OTHER');

-- CreateEnum
CREATE TYPE "MarriedStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "CitizenStatus" AS ENUM ('CITIZEN', 'PERMANENT_RESIDENT', 'TEMPORARY_RESIDENT', 'FOREIGNER');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE');

-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('FULL_TIME', 'HALF_DAY', 'OVERTIME', 'INSUFFICIENT');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED_BY_MANAGER', 'REJECTED_BY_MANAGER', 'APPROVED_BY_HR', 'REJECTED_BY_HR', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReimbursementStatus" AS ENUM ('PENDING', 'APPROVED_BY_MANAGER', 'REJECTED_BY_MANAGER', 'APPROVED_BY_HR', 'REJECTED_BY_HR', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TrainingStatus" AS ENUM ('ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ONGOING', 'PAID');

-- CreateTable
CREATE TABLE "employee" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v7(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "department_id" UUID NOT NULL,
    "position_id" UUID NOT NULL,
    "role_id" INTEGER NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "code" TEXT NOT NULL,
    "identification_no" TEXT NOT NULL,
    "image" TEXT,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "birth_place" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "blood_type" "BloodType",
    "address" TEXT NOT NULL,
    "village_id" BIGINT NOT NULL,
    "district_id" BIGINT NOT NULL,
    "city_id" BIGINT NOT NULL,
    "province_id" BIGINT NOT NULL,
    "country_id" BIGINT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "religion" "Religion" NOT NULL,
    "married_status" "MarriedStatus" NOT NULL,
    "citizen_status" "CitizenStatus" NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_credentials" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v7(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "employee_id" UUID NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "user_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v7(),
    "name" TEXT NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "position" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v7(),
    "name" TEXT NOT NULL,
    "department_id" UUID NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v7(),
    "employee_id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "check_in" TIMESTAMP(3),
    "check_out" TIMESTAMP(3),
    "check_in_lat" DECIMAL(10,7),
    "check_in_long" DECIMAL(10,7),
    "check_out_lat" DECIMAL(10,7),
    "check_out_long" DECIMAL(10,7),
    "work_duration" INTEGER,
    "work_status" "WorkStatus",
    "status" "AttendanceStatus" NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payroll" (
    "id" BIGSERIAL NOT NULL,
    "employee_id" UUID NOT NULL,
    "basic_salary" DECIMAL(10,2) NOT NULL,
    "overtime" DECIMAL(10,2) NOT NULL,
    "deductions" DECIMAL(10,2) NOT NULL,
    "net_salary" DECIMAL(10,2) NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leave" (
    "id" BIGSERIAL NOT NULL,
    "employee_id" UUID NOT NULL,
    "leave_type" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "LeaveStatus" NOT NULL,

    CONSTRAINT "leave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reimbursement" (
    "id" BIGSERIAL NOT NULL,
    "employee_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" TEXT,
    "submission_date" TIMESTAMP(3) NOT NULL,
    "status" "ReimbursementStatus" NOT NULL,

    CONSTRAINT "reimbursement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "trainer" TEXT NOT NULL,

    CONSTRAINT "training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_training" (
    "id" BIGSERIAL NOT NULL,
    "employee_id" UUID NOT NULL,
    "training_id" BIGINT NOT NULL,
    "status" "TrainingStatus" NOT NULL,

    CONSTRAINT "employee_training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
    "id" BIGSERIAL NOT NULL,
    "employee_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "loan_date" TIMESTAMP(3) NOT NULL,
    "installment" DECIMAL(10,2) NOT NULL,
    "status" "LoanStatus" NOT NULL,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "alt_name" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "province" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alt_name" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "country_id" BIGINT NOT NULL,

    CONSTRAINT "province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alt_name" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "province_id" BIGINT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alt_name" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "city_id" BIGINT NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "village" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alt_name" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "district_id" BIGINT NOT NULL,

    CONSTRAINT "village_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_code_key" ON "employee"("code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_identification_no_key" ON "employee"("identification_no");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_email_key" ON "user_credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_code_key" ON "user_credentials"("code");

-- CreateIndex
CREATE UNIQUE INDEX "department_name_key" ON "department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permission_name_key" ON "permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_permission_role_id_permission_id_key" ON "role_permission"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_training_employee_id_training_id_key" ON "employee_training"("employee_id", "training_id");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "province" ADD CONSTRAINT "province_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "village" ADD CONSTRAINT "village_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;
