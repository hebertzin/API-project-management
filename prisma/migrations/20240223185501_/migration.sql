/*
  Warnings:

  - You are about to drop the `FollowProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FollowProject" DROP CONSTRAINT "FollowProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "FollowProject" DROP CONSTRAINT "FollowProject_userId_fkey";

-- DropTable
DROP TABLE "FollowProject";

-- CreateTable
CREATE TABLE "ProjectsFollowers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsFollowers_id_key" ON "ProjectsFollowers"("id");

-- AddForeignKey
ALTER TABLE "ProjectsFollowers" ADD CONSTRAINT "ProjectsFollowers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsFollowers" ADD CONSTRAINT "ProjectsFollowers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
