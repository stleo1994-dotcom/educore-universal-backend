/*
  Warnings:

  - A unique constraint covering the columns `[institutionId,belongsTo,name]` on the table `Level` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `belongsTo` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Level_institutionId_name_key";

-- AlterTable
ALTER TABLE "Level" ADD COLUMN     "belongsTo" "InstitutionType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Level_institutionId_belongsTo_name_key" ON "Level"("institutionId", "belongsTo", "name");
