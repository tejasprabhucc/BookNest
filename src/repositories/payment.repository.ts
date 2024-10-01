import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { count, eq, sql } from "drizzle-orm";
import { IPayment, IPaymentBase } from "../lib/definitions";
import { payments } from "../drizzle/schema";
import { PaymentBaseSchema, PaymentSchema } from "../models/payment.schema";

export class PaymentRepository {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: IPaymentBase): Promise<IPayment | undefined> {
    const validatedData = { ...PaymentSchema.parse(data) };

    const newPayment = {
      ...validatedData,
      memberId: BigInt(validatedData.memberId),
    };
    try {
      const [result] = await this.db
        .insert(payments)
        .values(newPayment)
        .returning({ id: payments.id });

      return await this.getById(result.id);
    } catch (error) {
      throw new Error(
        `Error creating payement entry: ${(error as Error).message}`
      );
    }
  }

  async getById(id: number): Promise<IPayment | undefined> {
    try {
      const [payment] = await this.db
        .select()
        .from(payments)
        .where(eq(payments.id, id))
        .limit(1);

      if (!payment) {
        throw new Error("Member not found");
      }
      return payment as unknown as IPayment;
    } catch (error) {
      throw new Error(`Payment data not found`);
    }
  }

  async getByTransactionId(transactionId: string): Promise<IPayment | null> {
    try {
      if (!this.db) {
        return null;
      }
      const [selectedPayment] = await this.db
        .select()
        .from(payments)
        .where(eq(payments.transactionId, transactionId));
      if (!selectedPayment) return null;
      return selectedPayment as unknown as IPayment;
    } catch (error) {
      throw new Error(`Payment data not found`);
    }
  }
}
