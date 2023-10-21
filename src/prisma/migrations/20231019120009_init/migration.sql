-- CreateTable
CREATE TABLE "PublicationDate" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "publicationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicationDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicationDate_id_key" ON "PublicationDate"("id");
