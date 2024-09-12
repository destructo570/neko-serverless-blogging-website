/*
  Warnings:

  - You are about to drop the column `amount` on the `Likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "amount",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;
