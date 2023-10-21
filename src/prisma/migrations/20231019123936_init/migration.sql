/*
  Warnings:

  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Date" DROP CONSTRAINT "Date_naturalId_fkey";

-- DropTable
DROP TABLE "Date";

-- CreateTable
CREATE TABLE "CommentedDate" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "naturalId" INTEGER,

    CONSTRAINT "CommentedDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentedDate" ADD CONSTRAINT "CommentedDate_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Natural"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;
