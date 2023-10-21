/*
  Warnings:

  - You are about to drop the `CommentedData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentedDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentedData" DROP CONSTRAINT "CommentedData_entityId_fkey";

-- DropForeignKey
ALTER TABLE "CommentedData" DROP CONSTRAINT "CommentedData_legalId_fkey";

-- DropForeignKey
ALTER TABLE "CommentedData" DROP CONSTRAINT "CommentedData_vesselId_fkey";

-- DropForeignKey
ALTER TABLE "CommentedDate" DROP CONSTRAINT "CommentedDate_naturalId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_legalId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_naturalId_fkey";

-- DropTable
DROP TABLE "CommentedData";

-- DropTable
DROP TABLE "CommentedDate";

-- DropTable
DROP TABLE "Location";

-- CreateTable
CREATE TABLE "Alias" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "comment" TEXT,
    "entityId" INTEGER,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identification" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "comment" TEXT,
    "legalId" INTEGER,
    "vesselId" INTEGER,

    CONSTRAINT "Identification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BirthDate" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "naturalId" INTEGER,

    CONSTRAINT "BirthDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "naturalId" INTEGER,
    "legalId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BirthPlace" (
    "id" SERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "naturalId" INTEGER,

    CONSTRAINT "BirthPlace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alias" ADD CONSTRAINT "Alias_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("registreId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identification" ADD CONSTRAINT "Identification_legalId_fkey" FOREIGN KEY ("legalId") REFERENCES "Legal"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identification" ADD CONSTRAINT "Identification_vesselId_fkey" FOREIGN KEY ("vesselId") REFERENCES "Vessel"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BirthDate" ADD CONSTRAINT "BirthDate_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Natural"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Natural"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_legalId_fkey" FOREIGN KEY ("legalId") REFERENCES "Legal"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BirthPlace" ADD CONSTRAINT "BirthPlace_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Natural"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;
