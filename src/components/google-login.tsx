import React from "react";
import { signIn } from "@/src/auth";
import { Button } from "./ui/button";
import { ChromeIcon } from "lucide-react";

const GoogleLoginButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" variant="outline" className="w-full">
        <ChromeIcon className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </form>
  );
};
export default GoogleLoginButton;
