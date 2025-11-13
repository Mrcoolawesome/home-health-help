import Link from "next/link";
import { Button } from "../ui/button";

export default function MarketerSignUpButton() {
  return (
    <Button asChild size="sm" variant={"default"}>
      <Link href="/auth/sign-up/marketer">Sign up</Link>
    </Button>
  );
}
