import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  Clock,
} from "lucide-react";

interface UserStatsProps {
  userTransactionSummary: {
    borrowedBooks: number;
    pendingRequest: number;
    booksDue: number;
    returnedBooks: number;
  } | null;
}
const LibraryStats = ({ userTransactionSummary }: UserStatsProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Library Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-semibold">
                    {userTransactionSummary
                      ? userTransactionSummary?.borrowedBooks +
                        userTransactionSummary?.returnedBooks
                      : "0"}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                TOTAL BORROWED
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-semibold">
                    {userTransactionSummary
                      ? userTransactionSummary.pendingRequest
                      : "0"}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-yellow-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                PENDING REQUESTS
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarClock className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-semibold">
                    {userTransactionSummary
                      ? userTransactionSummary.booksDue
                      : "0"}
                  </span>
                </div>
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">BOOKS DUE</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LibraryStats;
