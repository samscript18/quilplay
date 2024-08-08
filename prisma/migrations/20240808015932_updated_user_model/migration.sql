-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ARTIST', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
