import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { IMember } from "@/src/lib/definitions";

const ContactInfo = ({ userData }: { userData: IMember }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{userData.email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{userData.phone}</span>
        </div>
        <div className="flex items-start">
          <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
          <span>{userData.address}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
