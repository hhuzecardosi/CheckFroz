/*
  Warnings:

  - The `phones` column on the `Legal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `web` column on the `Legal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mail` column on the `Legal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nationality` column on the `Natural` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Legal" DROP COLUMN "phones",
ADD COLUMN     "phones" TEXT[],
DROP COLUMN "web",
ADD COLUMN     "web" TEXT[],
DROP COLUMN "mail",
ADD COLUMN     "mail" TEXT[];

-- AlterTable
ALTER TABLE "Natural" DROP COLUMN "nationality",
ADD COLUMN     "nationality" TEXT[];

-- DropEnum
DROP TYPE "Country";
