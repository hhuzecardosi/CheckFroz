/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Users_id_seq";

-- CreateTable
CREATE TABLE "Subscription" (
    "idSubscription" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "apiKey" TEXT NOT NULL,
    "paymentIntent" TEXT,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("idSubscription")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_idSubscription_key" ON "Subscription"("idSubscription");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_apiKey_key" ON "Subscription"("apiKey");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
