/*
  Warnings:

  - You are about to drop the column `checklistId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Checklist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `description` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ChecklistStatus" AS ENUM ('RASCUNHO', 'PRONTO');

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_checklistId_fkey";

-- AlterTable
ALTER TABLE "Checklist" DROP COLUMN "status",
ADD COLUMN     "status" "ChecklistStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "checklistId",
DROP COLUMN "name",
ALTER COLUMN "description" SET NOT NULL;

-- DropEnum
DROP TYPE "checklistStatus";

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "checklistId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("checklistId","itemId")
);

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
