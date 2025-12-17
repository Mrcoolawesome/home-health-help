import Link from "next/link";
import { Button } from "../base-ui/button";

export default function HospiceSignUpButton() {
  return (
    <Button asChild size="sm" variant={"default"}>
      <Link href="/auth/sign-up/hospice">Sign up</Link>
    </Button>
  );
}
