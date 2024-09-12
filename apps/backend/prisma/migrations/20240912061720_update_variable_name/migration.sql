/*
  Warnings:

  - You are about to drop the column `likes_count` on the `Likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "likes_count",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;
