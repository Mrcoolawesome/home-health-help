import Link from "next/link";
import { Button } from "../base-ui/button";

export default function LoginButton() {
  return (
    <Button asChild size="sm" variant={"outline"}>
      <Link href="/auth/login">Sign in</Link>
    </Button>
  );
}
