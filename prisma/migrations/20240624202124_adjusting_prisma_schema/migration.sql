/*
  Warnings:

  - You are about to drop the column `password` on the `auth0Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth0Users" DROP COLUMN "password";
