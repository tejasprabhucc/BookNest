"use client";
import React, { useActionState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { authenticate } from "../lib/actions";

const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <>
      <form action={formAction} className="space-y-3">
        <div className="mt-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="mt-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button className="mt-4 w-full">Log in</Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
};
export default LoginForm;
