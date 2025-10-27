import { redirect } from "next/navigation";

export default function Home() {
  // redirect root to login page
  redirect("/auth/login");
}

