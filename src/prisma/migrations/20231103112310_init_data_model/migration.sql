-- CreateEnum
CREATE TYPE "Nature" AS ENUM ('NATURAL', 'LEGAL', 'VESSEL');

-- CreateTable
CREATE TABLE "Alias" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "comment" TEXT,
    "entityId" INTEGER,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identification" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "comment" TEXT,
    "legalId" INTEGER,
    "vesselId" INTEGER,

    CONSTRAINT "Identification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BirthDate" (
    "id" TEXT NOT NULL,
    "day" INTEGER,
    "month" INTEGER,
    "year" INTEGER,
    "comment" TEXT NOT NULL,
    "naturalId" INTEGER,

    CONSTRAINT "BirthDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "naturalId" INTEGER,
    "legalId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BirthPlace" (
    "id" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "naturalId" INTEGER,

    CONSTRAINT "BirthPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityDocument" (
    "id" TEXT NOT NULL,
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
    "nationality" TEXT[],
    "title" TEXT
);

-- CreateTable
CREATE TABLE "Legal" (
    "entityId" INTEGER NOT NULL,
    "phones" TEXT[],
    "web" TEXT[],
    "mail" TEXT[]
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

-- CreateTable
CREATE TABLE "PublicationDate" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "publicationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicationDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Natural_entityId_key" ON "Natural"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Legal_entityId_key" ON "Legal"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Vessel_entityId_key" ON "Vessel"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_registreId_key" ON "Entity"("registreId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationDate_id_key" ON "PublicationDate"("id");

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

-- AddForeignKey
ALTER TABLE "IdentityDocument" ADD CONSTRAINT "IdentityDocument_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Natural"("entityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Natural" ADD CONSTRAINT "Natural_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("registreId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Legal" ADD CONSTRAINT "Legal_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("registreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vessel" ADD CONSTRAINT "Vessel_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("registreId") ON DELETE RESTRICT ON UPDATE CASCADE;
