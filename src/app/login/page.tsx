import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import React from "react";
import Link from "next/link";
import LoginForm from "@/src/components/login-form";
import GoogleAuthButton from "@/src/components/googleAuthButton";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations("Login");
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 shadow-md sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <p className="text-center">Or</p>
          <GoogleAuthButton />
          <div>
            <p>
              {t("help")}{" "}
              <Link className="font-bold" href={"/signup"}>
                {t("link")}
              </Link>{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
