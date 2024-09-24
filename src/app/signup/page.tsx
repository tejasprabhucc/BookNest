import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import React from "react";
import Link from "next/link";
import SignupForm from "@/src/components/signup-form";
import GoogleAuthButton from "@/src/components/googleAuthButton";
import { useTranslations } from "next-intl";

const Signup = () => {
  const t = useTranslations("Signup");
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4  sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
          <CardDescription> {t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <SignupForm />
          <p className="text-center">Or</p>
          <GoogleAuthButton />
          <div>
            <p>
              {t("help")}{" "}
              <Link className="font-bold" href={"/login"}>
                {t("link")}
              </Link>{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
