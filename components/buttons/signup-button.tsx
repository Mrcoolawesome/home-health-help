import Link from "next/link";
import { Button } from "../ui/button";

export default function SignupButton() {
    return (
        <Button asChild size="sm" variant={"default"}>
            <Link href="/auth/sign-up">Sign up</Link>
        </Button>
    );
}