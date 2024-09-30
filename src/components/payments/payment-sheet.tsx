"use client";

import { IMember, IProfessor } from "@/src/lib/definitions";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface TransactionDetails {
  professorId: number;
  userId: number;
  paymentId: string;
  orderId: string;
}

const PaymentSheet = ({
  user,
  professorId,
}: {
  user: IMember;
  professorId: number;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails>();

  const handlePayNow = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-order", { method: "POST" });
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: function (response: any) {
          setTransactionDetails({
            professorId: professorId,
            userId: user.id,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          });
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#111827",
          background: "#111827",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {transactionDetails ? "Payment Successful" : "Payment Summary"}
          </CardTitle>
          <p className="text-center text-muted-foreground">
            {transactionDetails
              ? "Thank you for your payment"
              : "Please review your payment details"}
          </p>
        </CardHeader>
        <CardContent>
          {!transactionDetails ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Consultation Fee</span>
                <span className="font-bold">₹300</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Professor ID</span>
                <span>{professorId}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>₹300</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center text-green-500 mb-4">
                <CheckCircle className="w-16 h-16" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Professor ID:{" "}
                  <span className="font-medium">
                    {transactionDetails.professorId}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Payment ID:{" "}
                  <span className="font-medium">
                    {transactionDetails.paymentId}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Order ID:{" "}
                  <span className="font-medium">
                    {transactionDetails.orderId}
                  </span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {!transactionDetails ? (
            <Button
              className="w-full"
              onClick={handlePayNow}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Processing
                </span>
              ) : (
                "Pay Now"
              )}
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() =>
                router.push(`/dashboard/professors/${professorId}/schedule`)
              }
            >
              Continue To Select Booking Date
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push(`/dashboard/professors`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSheet;
