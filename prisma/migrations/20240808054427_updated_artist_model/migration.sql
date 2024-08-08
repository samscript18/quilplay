-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ARTIST';

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "url" TEXT;
