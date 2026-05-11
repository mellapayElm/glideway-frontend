"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Protected({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "ADMIN" | "DRIVER" | "RIDER";
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user?.role) {
      router.replace("/login");
      return;
    }

    if (role && user.role !== role) {
      if (user.role === "ADMIN") router.replace("/admin");
      else if (user.role === "DRIVER") router.replace("/driver");
      else router.replace("/");
      return;
    }

    setAllowed(true);
  }, [router, role]);

  if (!allowed) return null;

  return <>{children}</>;
}