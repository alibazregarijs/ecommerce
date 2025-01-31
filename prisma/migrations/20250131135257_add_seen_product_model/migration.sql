-- CreateTable
CREATE TABLE "SeenProduct" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "productId" INTEGER NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeenProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SeenProduct" ADD CONSTRAINT "SeenProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenProduct" ADD CONSTRAINT "SeenProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
