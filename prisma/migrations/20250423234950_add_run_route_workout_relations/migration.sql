-- AlterTable
ALTER TABLE "Run" ADD COLUMN     "routeId" TEXT;

-- AlterTable
ALTER TABLE "WorkoutSession" ADD COLUMN     "runId" TEXT;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE SET NULL ON UPDATE CASCADE;
