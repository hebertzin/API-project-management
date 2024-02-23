/*
  Warnings:

  - The values [min,medium,high] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `url` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('CONFIRMED', 'PENDING', 'FAILED');

-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('MIN', 'MEDIUM', 'HIGH');
ALTER TABLE "Goals" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TABLE "Projects" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
COMMIT;

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "visibility" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "InviteUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FollowProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectIdea" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InviteUser_id_key" ON "InviteUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FollowProject_id_key" ON "FollowProject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectIdea_id_key" ON "ProjectIdea"("id");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteUser" ADD CONSTRAINT "InviteUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteUser" ADD CONSTRAINT "InviteUser_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowProject" ADD CONSTRAINT "FollowProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowProject" ADD CONSTRAINT "FollowProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectIdea" ADD CONSTRAINT "ProjectIdea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectIdea" ADD CONSTRAINT "ProjectIdea_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
