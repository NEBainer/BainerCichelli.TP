/*
  Warnings:

  - You are about to drop the column `activo` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `categoria` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marca` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "activo",
DROP COLUMN "descripcion",
ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "marca" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;
