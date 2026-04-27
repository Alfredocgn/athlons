-- AlterTable
ALTER TABLE "User" ADD COLUMN     "enableEmailNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "enablePushNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "preferredDistance" DOUBLE PRECISION,
ADD COLUMN     "socialLinks" JSONB,
ADD COLUMN     "weeklyGoal" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION;
