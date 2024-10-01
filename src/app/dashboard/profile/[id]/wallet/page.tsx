// "use client";
// import { useToast } from "@/src/components/hooks/use-toast";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/src/components/ui/card";
// import { Input } from "@/src/components/ui/input";
// import { IPaymentBase } from "@/src/lib/definitions";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
// import { Loader2 } from "lucide-react";
// import { User } from "next-auth";
// import React, { useState } from "react";
// import { Button } from "react-day-picker";

// const WalletPage = ({ params }: { params: { id: string } }) => {
//   const userData = (await getUserById(Number(params.id))) as IMember;

//   const [loading, setLoading] = useState(false);
//   const [transactionDetails, setTransactionDetails] =
//     useState<IPaymentBase | null>(null);
//   const { toast } = useToast();

//   const handlePayNow = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formData = new FormData(e.target as HTMLFormElement);
//       const amount = formData.get("amount");
//       const res = await fetch("/api/create-order", {
//         method: "POST",
//         body: JSON.stringify({ amount: amount }),
//       });
//       const order = await res.json();

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.id,
//         handler: function (response: any) {
//           const paymentDetails: IPaymentBase = {
//             memberId: userData.id,
//             transactionId: response.razorpay_payment_id,
//             orderId: response.razorpay_order_id,
//             amount: order.amount,
//           };
//           setTransactionDetails(paymentDetails);
//           toast({
//             title: "Payment Successful",
//             description: `Added ₹${order.amount / 100} to your wallet.`,
//           });
//         },
//         prefill: {
//           name: userData?.name,
//           email: userData?.email,
//         },
//         theme: {
//           color: "#111827",
//           background: "#111827",
//         },
//       };

//       const razorpay = new (window as any).Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error("Error creating order:", error);
//       toast({
//         title: "Error",
//         description: "Failed to process payment. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto py-12 px-4">
//       <Card className="max-w-md mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">
//             Add Funds to Wallet
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-4 mb-6">
//             <Avatar className="h-12 w-12">
//               <AvatarImage src={userData.image} alt={userData.name} />
//               <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div>
//               <h2 className="text-lg font-semibold">{userData.name}</h2>
//               <p className="text-sm text-muted-foreground">{userData.email}</p>
//             </div>
//           </div>
//           <div className="mb-4">
//             <p className="text-sm font-medium mb-1">Current Balance</p>
//             <p className="text-2xl font-bold">
//               ₹{userData.walletBalance.toFixed(2)}
//             </p>
//           </div>
//           <form onSubmit={handlePayNow}>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="amount" className="text-sm font-medium">
//                   Amount to Add
//                 </label>
//                 <Input
//                   id="amount"
//                   name="amount"
//                   type="number"
//                   placeholder="Enter amount"
//                   min="1"
//                   step="1"
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing
//                   </>
//                 ) : (
//                   "Add Funds"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WalletPage;
