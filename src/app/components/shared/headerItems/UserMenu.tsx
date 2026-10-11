// complete UserMenu component: src/app/components/shared/headerItems/UserMenu.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

export default function UserMenu() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error);
        setLogoutError(error.message || "Unable to sign out.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);

      setLogoutError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <li>
        <div className="justify-between text-[1rem]">
          {session?.user?.name ?? "User"}
          <span className="text-sm font-bold text-red-500">New</span>
        </div>
      </li>

      <li>
        <Link href="/profile" className="text-[1rem]">
          Profile Settings
        </Link>
      </li>

      <li>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full text-left text-[1rem] text-red-500 disabled:opacity-50"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>

        {logoutError && (
          <p role="alert" className="mt-2 text-sm text-red-500">
            {logoutError}
          </p>
        )}
      </li>
    </>
  );
}
