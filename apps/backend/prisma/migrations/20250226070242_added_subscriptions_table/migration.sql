-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" TEXT NOT NULL,
    "razorSubscriptionId" TEXT NOT NULL DEFAULT '',
    "razorPaymentId" TEXT NOT NULL DEFAULT '',
    "razorSignature" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_id_key" ON "Subscriptions"("id");

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
