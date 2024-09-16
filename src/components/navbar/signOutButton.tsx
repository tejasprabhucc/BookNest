import { signOut } from "@/src/auth";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { Button } from "@/src/components/ui/button";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button
        variant={"destructive"}
        type="submit"
        className="flex gap-2 px-2 text-sm"
      >
        <LogOutIcon className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </form>
  );
};

export default SignOutButton;
