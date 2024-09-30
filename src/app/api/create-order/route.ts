import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const options = {
      amount: 30000,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    try {
      const order = await razorpay.orders.create(options);
      return NextResponse.json(order);
    } catch (error) {
      return NextResponse.error();
    }
  } catch (err) {
    console.error(err);
  }
}

// const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//   req.body;
