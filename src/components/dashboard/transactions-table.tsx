import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import {
  AcceptButton,
  DeleteButton,
  RejectButton,
  ReturnButton,
} from "@/src/components/ui/customButtons";
import { ITransactionDetails } from "@/src/repositories/transaction.repository";

const TransactionsTable = ({
  transactions,
  actions,
}: {
  transactions: ITransactionDetails[];
  actions: boolean;
}) => {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "requested":
      case "pending":
        return "secondary";
      case "returned":
        return "outline";
      case "issued":
        return "outline";
      default:
        return "secondary";
    }
  };
  const getBadgeClassName = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-900";
      case "returned":
        return "bg-green-100 text-green-900 ";
      case "issued":
        return "bg-blue-100 text-blue-900 ";
      default:
        return "bg-gray-100 text-gray-900 ";
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {actions && <TableHead>Member</TableHead>}
            <TableHead>Book</TableHead>
            <TableHead>Date of Issue</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
            {actions && <TableHead>Delete</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              {actions && <TableCell>{transaction.member?.name}</TableCell>}
              <TableCell>{transaction.book.title}</TableCell>
              <TableCell>{transaction.dateOfIssue || "-"}</TableCell>
              <TableCell>{transaction.dueDate || "-"}</TableCell>
              <TableCell>
                <div className="w-full flex items-center gap-2">
                  <Badge
                    variant={"outline"}
                    className={
                      getBadgeClassName(transaction.bookStatus) +
                      "flex-1 p-2 w-full justify-center items-center rounded-lg border border-slate-300"
                    }
                  >
                    {transaction.bookStatus.charAt(0).toUpperCase() +
                      transaction.bookStatus.slice(1)}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                {actions &&
                  transaction.bookStatus === "pending" &&
                  (transaction.book.availableNumOfCopies > 0 ? (
                    <div className="flex gap-6">
                      <AcceptButton transactionId={transaction.id} />
                      <RejectButton transactionId={transaction.id} />
                    </div>
                  ) : (
                    <p className="text-red-600">Book Unavailable</p>
                  ))}
                {actions && transaction.bookStatus === "issued" && (
                  <ReturnButton transactionId={transaction.id} />
                )}
              </TableCell>
              <TableCell>
                {actions && <DeleteButton data={transaction} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionsTable;
