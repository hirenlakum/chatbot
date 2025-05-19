/*
  Warnings:

  - A unique constraint covering the columns `[conid]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_conid_key" ON "Conversation"("conid");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("conid") ON DELETE RESTRICT ON UPDATE CASCADE;
