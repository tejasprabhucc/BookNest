"use client";
import { Label } from "@/src/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createUser } from "@/src/lib/actions";
import { IMemberBase } from "@/src/lib/definitions";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useTranslations } from "next-intl";

const SignupForm = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name")?.toString();
    const age = Number(formData.get("age"));
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString() || null;
    const address = formData.get("address")?.toString() || null;
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (!name || !email || !password || !age) {
      setError("Please fill in all the fields.");
      setPending(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords doesn't match.");
      setPending(false);
      return;
    }

    const newUser: IMemberBase = {
      name,
      age,
      email,
      password,
      phone,
      address,
      image: null,
      role: "user",
    };

    try {
      const createdUser = await createUser(newUser);
      if (createdUser.message === "Registered successfully!") {
        setPending(false);
        router.push("/login");
      } else {
        setError(createdUser.message);
        setPending(false);
      }
    } catch (error) {
      setError(
        "An error occurred while creating the account. Please try again."
      );
      setPending(false);
    }
  };

  const t = useTranslations("Signup");

  return (
    <>
      <form onSubmit={handleSignup}>
        <div className="mt-2">
          <Label htmlFor="name"> {t("name")}</Label>
          <Input
            id="name"
            type="text"
            name="name"
            className="border-2"
            required
          />
        </div>
        <div className="mt-2">
          <Label htmlFor="age"> {t("age")}</Label>
          <Input id="age" type="number" name="age" required />
        </div>
        <div className="mt-2">
          <Label htmlFor="email"> {t("email")}</Label>
          <Input id="email" type="email" name="email" required />
        </div>
        <div className="mt-2">
          <Label htmlFor="phone"> {t("phoneNumber")}</Label>
          <Input id="phone" type="number" name="phone" required />
        </div>
        <div className="mt-2">
          <Label htmlFor="password"> {t("password")}</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        <div className="mt-2">
          <Label htmlFor="confirmPassword"> {t("confirmPassword")}</Label>
          <Input
            id="password"
            type="password"
            name="confirmPassword"
            required
          />
        </div>
        <div
          className="flex items-end space-x-1 my-3"
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <>
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
        </div>

        <Button type="submit" className="w-full mt-3" disabled={pending}>
          {pending ? t("buttonLoading") : t("button")}
        </Button>
      </form>
    </>
  );
};
export default SignupForm;
