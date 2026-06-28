/*
  Warnings:

  - You are about to drop the column `type` on the `Institution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "type";

-- CreateTable
CREATE TABLE "InstitutionLicense" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "type" "InstitutionType" NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstitutionLicense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionLicense_institutionId_type_key" ON "InstitutionLicense"("institutionId", "type");

-- AddForeignKey
ALTER TABLE "InstitutionLicense" ADD CONSTRAINT "InstitutionLicense_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
