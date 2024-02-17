/*
  Warnings:

  - Added the required column `teamMembersId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departament` to the `TeamMemberShip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "teamMembersId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeamMemberShip" ADD COLUMN     "departament" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProjectTeamMemberShip" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTeamMemberShip_id_key" ON "ProjectTeamMemberShip"("id");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamMembersId_fkey" FOREIGN KEY ("teamMembersId") REFERENCES "TeamMemberShip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
