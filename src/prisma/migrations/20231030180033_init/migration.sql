/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Alias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BirthDate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BirthPlace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Identification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `IdentityDocument` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Address_id_seq";

-- AlterTable
ALTER TABLE "Alias" DROP CONSTRAINT "Alias_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Alias_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Alias_id_seq";

-- AlterTable
ALTER TABLE "BirthDate" DROP CONSTRAINT "BirthDate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BirthDate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BirthDate_id_seq";

-- AlterTable
ALTER TABLE "BirthPlace" DROP CONSTRAINT "BirthPlace_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BirthPlace_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BirthPlace_id_seq";

-- AlterTable
ALTER TABLE "Identification" DROP CONSTRAINT "Identification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Identification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Identification_id_seq";

-- AlterTable
ALTER TABLE "IdentityDocument" DROP CONSTRAINT "IdentityDocument_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "IdentityDocument_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "IdentityDocument_id_seq";
