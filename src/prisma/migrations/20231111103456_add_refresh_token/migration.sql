/*
  Warnings:

  - You are about to drop the column `apiKey` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "apiKey",
ADD COLUMN     "refreshToken" TEXT;
