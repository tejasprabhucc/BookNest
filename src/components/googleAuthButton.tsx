import React from "react";
import { signIn } from "@/src/auth";
import { Button } from "@/src/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";

const GoogleAuthButton = () => {
  const t = useTranslations("Login");
  return (
    <form
      action={async () => {
        "use server";
        const result = await signIn("google", { redirectTo: "/bashboard" });
        console.log(result);
      }}
    >
      <Button type="submit" variant="outline" className="w-full">
        <FcGoogle className="mr-2 h-4 w-4" />
        {t("googleButton")}
      </Button>
    </form>
  );
};
export default GoogleAuthButton;
