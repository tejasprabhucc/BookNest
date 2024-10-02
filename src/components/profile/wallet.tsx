"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { IMember, IPaymentBase } from "@/src/lib/definitions";
import { useRouter } from "next/navigation";
import { addPayment } from "@/src/lib/actions";

export const WalletCard = ({
  balance,
  user,
}: {
  balance: number;
  user: IMember;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<IPaymentBase>();

  const handlePayNow = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const amount = formData.get("amount");
      const res = await fetch("/api/create-order", {
        method: "POST",
        body: JSON.stringify({ amount: amount }),
      });
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async function (response: any) {
          const paymentDetails: IPaymentBase = {
            memberId: user.id,
            transactionId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount: order.amount,
          };
          setTransactionDetails(paymentDetails);
          const addPaymentResult = await addPayment(paymentDetails);
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
    <div className="flex items-center space-x-2">
      <Wallet className="h-5 w-5 text-muted-foreground" />
      <span className="font-medium">₹{balance.toFixed(2)}</span>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Add Funds
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Funds to Wallet</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePayNow}>
            <div className="grid gap-4 py-4">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="grid justify-between">
                <p className="text-sm text-muted-foreground">
                  Wallet Balance:{" "}
                  <span className="font-medium">₹{balance.toFixed(2)}</span>
                </p>
              </div>
              <Input
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Funds</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const WalletTransactions = ({
  transactions,
}: {
  transactions: any[];
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Transactions</h3>
      {transactions && transactions.length > 0 ? (
        <ul className="space-y-2">
          {transactions.map((transaction, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{transaction.description}</span>
              <span
                className={
                  transaction.type === "credit"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {transaction.type === "credit" ? "+" : "-"}₹
                {transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No recent transactions.</p>
      )}
    </div>
  );
};
