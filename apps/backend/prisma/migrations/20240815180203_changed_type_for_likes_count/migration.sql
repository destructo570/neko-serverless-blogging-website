/*
  Warnings:

  - You are about to alter the column `likes_count` on the `Likes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `likes_count` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Likes" ALTER COLUMN "likes_count" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "likes_count" SET DATA TYPE INTEGER;
