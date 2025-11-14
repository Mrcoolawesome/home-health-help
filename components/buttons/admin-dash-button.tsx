import Link from "next/link";
import { Button } from "../ui/button";

export default function AdminDashboardButton() {
  return (
    <Button asChild size="sm" variant={"outline"}>
      <Link href="/admin/dashboard">Dashboard</Link>
    </Button>
  );
}
