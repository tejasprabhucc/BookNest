import { signOut } from "@/src/auth";
import { LogOut, LogOutIcon } from "lucide-react";
import React from "react";
import { Button } from "@/src/components/ui/button";

const SignOutButton = () => {
  return (
    <form
      className="m-0 p-0"
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button
        variant="ghost"
        type="submit"
        className="p-2 text-sm text-red-500 text-left hover:text-black"
      >
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </form>
  );
};

export default SignOutButton;
