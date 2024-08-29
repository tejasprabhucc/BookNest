"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { createUser } from "@/src/lib/actions";
import { IMemberBase } from "@/src/lib/definitions";
import { Label } from "@/src/components/ui/label";
import { ChromeIcon } from "lucide-react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name")?.toString();
    const age = Number(formData.get("age"));
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password || !age) {
      setError("Please fill in all the fields.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IMemberBase = {
      name,
      age,
      email,
      password: hashedPassword,
      role: "user",
    };

    try {
      const createdUser = await createUser(newUser);
      if (createdUser) {
        router.push("/login");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("An error occurred while creating the account. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>Enter your details to register.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <form onSubmit={handleSignup}>
            <div className="mt-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" name="name" required />
            </div>
            <div className="mt-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" name="age" required />
            </div>
            <div className="mt-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" required />
            </div>
            <div className="mt-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full mt-3">
              Sign up
            </Button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {error && (
                <>
                  <p className="text-sm text-red-500">{error}</p>
                </>
              )}
            </div>
          </form>
          <Button variant="outline" className="w-full">
            <ChromeIcon className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div>
            <p>
              Already have an account?{" "}
              <Link className="font-bold" href={"/login"}>
                Login
              </Link>{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
