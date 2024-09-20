import { BookOpen, ArrowUpRight, Clock } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const UserActivity = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{`Borrowed "The Great Gatsby"`}</p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {`Returned "To Kill a Mockingbird"`}
                </p>
                <p className="text-sm text-muted-foreground">1 week ago</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{`Requested "1984"`}</p>
                <p className="text-sm text-muted-foreground">2 weeks ago</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default UserActivity;
