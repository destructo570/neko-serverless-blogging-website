-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "likes_count" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes_count" BIGINT NOT NULL DEFAULT 0;
