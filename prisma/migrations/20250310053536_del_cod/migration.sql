/*
  Warnings:

  - You are about to drop the column `code` on the `user_credentials` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_credentials_code_key";

-- AlterTable
ALTER TABLE "user_credentials" DROP COLUMN "code";
