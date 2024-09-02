import { signIn } from "@/src/auth";
import { Button } from "./button";
import { ChromeIcon } from "lucide-react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" variant="outline" className="w-full">
        <ChromeIcon className="mr-2 h-4 w-4" />
        Signin with Google
      </Button>
    </form>
  );
}
