"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

const UserMenu = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <li>
        <div className="justify-between text-[1rem]">
          {session?.user?.name?.toUpperCase() ?? "User"}
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
      </li>
    </>
  );
};

export default UserMenu;