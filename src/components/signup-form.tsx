"use client";
import { Label } from "@/src/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createUser } from "../lib/actions";
import { IMemberBase } from "../lib/definitions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SignupForm = () => {
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
    const newUser: IMemberBase = {
      name,
      age,
      email,
      password,
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
      alert("An error occurred while creating the account. Please try again.");
    }
  };
  return (
    <>
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
    </>
  );
};
export default SignupForm;
