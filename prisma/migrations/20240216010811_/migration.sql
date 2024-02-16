/*
  Warnings:

  - Added the required column `userId` to the `Goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goals" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamMemberShipId" TEXT;

-- CreateTable
CREATE TABLE "TeamMemberShip" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamMemberShip_id_key" ON "TeamMemberShip"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamMemberShipId_fkey" FOREIGN KEY ("teamMemberShipId") REFERENCES "TeamMemberShip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
