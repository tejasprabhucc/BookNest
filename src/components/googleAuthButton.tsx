import React from "react";
import { signIn } from "@/src/auth";
import { Button } from "@/src/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleAuthButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        const result = await signIn("google");
        console.log(result);
      }}
    >
      <Button type="submit" variant="outline" className="w-full">
        <FcGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </form>
  );
};
export default GoogleAuthButton;
