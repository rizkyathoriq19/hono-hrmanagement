/*
  Warnings:

  - You are about to drop the column `code` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `position` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `user_credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `user_credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "department_code_key";

-- DropIndex
DROP INDEX "position_code_key";

-- AlterTable
ALTER TABLE "department" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "position" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "user_credentials" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_code_key" ON "user_credentials"("code");
