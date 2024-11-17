"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      if (pathname === "/" || pathname === "/authentication") {
        router.push("/feed");
      }
    } else {
      if (pathname !== "/" && pathname !== "/authentication") {
        router.push("/");
      }
    }
  }, [isSignedIn, pathname, router]);

  return (
    <>
      <SignedOut>
        <SignInButton />
        {children}
      </SignedOut>
      <SignedIn>
        <UserButton />
        {children}
      </SignedIn>
    </>
  );
}
