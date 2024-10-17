/*
  Warnings:

  - You are about to drop the `Usage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Usage" DROP CONSTRAINT "Usage_userId_fkey";

-- DropTable
DROP TABLE "Usage";

-- CreateTable
CREATE TABLE "FeatureData" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ageGroup" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "featureA" INTEGER NOT NULL,
    "featureB" INTEGER NOT NULL,
    "featureC" INTEGER NOT NULL,
    "featureD" INTEGER NOT NULL,
    "featureE" INTEGER NOT NULL,
    "featureF" INTEGER NOT NULL,

    CONSTRAINT "FeatureData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeatureData_date_ageGroup_gender_idx" ON "FeatureData"("date", "ageGroup", "gender");
