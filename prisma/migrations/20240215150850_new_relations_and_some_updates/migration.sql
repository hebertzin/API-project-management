/*
  Warnings:

  - You are about to drop the column `update` on the `Updates` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Updates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Updates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectsId` to the `Updates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Updates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Updates" DROP COLUMN "update",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "projectsId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Updates" ADD CONSTRAINT "Updates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Updates" ADD CONSTRAINT "Updates_projectsId_fkey" FOREIGN KEY ("projectsId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
