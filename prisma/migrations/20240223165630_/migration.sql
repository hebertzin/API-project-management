/*
  Warnings:

  - You are about to drop the column `commentId` on the `ProjectIdea` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectIdea" DROP CONSTRAINT "ProjectIdea_commentId_fkey";

-- AlterTable
ALTER TABLE "ProjectIdea" DROP COLUMN "commentId";
