"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    alert("User logged out!");
    router.replace("/dashboard");
  }, [router]);
  return null;
}
