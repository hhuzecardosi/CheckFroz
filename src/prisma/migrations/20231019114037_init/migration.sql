-- CreateEnum
CREATE TYPE "Nature" AS ENUM ('NATURAL', 'LEGAL', 'VESSEL');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('FRANCE', 'RUSSIE', 'UKRAINE');

-- CreateTable
CREATE TABLE "CommentedData" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "comment" TEXT,
    "entityId" INTEGER,
    "legalId" INTEGER,
    "vesselId" INTEGER,

    CONSTRAINT "CommentedData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Date" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "naturalId" INTEGER,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "naturalId" INTEGER,
    "legalId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityDocument" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "isPassport" BOOLEAN NOT NULL,
    "naturalId" INTEGER,

    CONSTRAINT "IdentityDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Natural" (
    "entityId" INTEGER NOT NULL,
    "firstName" TEXT,
    "sex" BOOLEAN,
    "nationality" "Country"[],
    "title" TEXT
);

-- CreateTable
CREATE TABLE "Legal" (
    "entityId" INTEGER NOT NULL,
    "phones" TEXT,
    "web" TEXT,
    "mail" TEXT
);

-- CreateTable
CREATE TABLE "Vessel" (
    "entityId" INTEGER NOT NULL,
    "OMINumber" INTEGER
);

-- CreateTable
CREATE TABLE "Entity" (
    "registreId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nature" "Nature" NOT NULL,
    "EUReference" TEXT,
    "UNReference" TEXT,
    "juridicalBasis" TEXT[],
    "motifs" TEXT,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("registreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Natural_entityId_key" ON "Natural"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Legal_entityId_key" ON "Legal"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Vessel_entityId_key" ON "Vessel"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_registreId_key" ON "Entity"("registreId");

-- AddForeignKey
ALTER TABLE "CommentedData" ADD CONSTRAINT "CommentedData_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("registreId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentedData" ADD CONSTRAINT "CommentedData_legalId_fkey" FOREIGN KEY ("legalId") REFERENCES "Legal"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentedData" ADD CONSTRAINT "CommentedData_vesselId_fkey" FOREIGN KEY ("vesselId") REFERENCES "Vessel"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Date" ADD CONSTRAINT "Date_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Natural"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Natural"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_legalId_fkey" FOREIGN KEY ("legalId") REFERENCES "Legal"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityDocument" ADD CONSTRAINT "IdentityDocument_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Natural"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Natural" ADD CONSTRAINT "Natural_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("registreId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Legal" ADD CONSTRAINT "Legal_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("registreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vessel" ADD CONSTRAINT "Vessel_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("registreId") ON DELETE RESTRICT ON UPDATE CASCADE;
