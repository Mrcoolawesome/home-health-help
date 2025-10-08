import Link from "next/link";
import { Button } from "./ui/button";

export default function SignUpDirection() {
    return (
        <div>
            <Button size="lg" variant="link">
                <Link href="/auth/sign-up/doctor">I'm a doctor</Link>
            </Button> 
            <Button size="lg" variant="link">
                <Link href="/auth/sign-up/home-health">I'm a home healthcare specialist</Link>    
            </Button>      
        </div>
    );
}