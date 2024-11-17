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
  const { isSignedIn } = useAuth(); // Check authentication status

  useEffect(() => {
    if (isSignedIn) {
      // Redirect logged-in users from "/" or "/authentication" to "/feed"
      if (pathname === "/" || pathname === "/authentication") {
        router.push("/feed");
      }
    } else {
      // Redirect logged-out users to "/" when they try to access anything other than "/" or "/authentication"
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
