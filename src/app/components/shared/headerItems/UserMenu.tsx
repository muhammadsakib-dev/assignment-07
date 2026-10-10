import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { createAuthClient } from "better-auth/react";
const { useSession } = createAuthClient();
const UserMenu = () => {
  const { data: session } = useSession();
  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      <li>
        <div  className="justify-between text-[1rem]">
          {session?.user?.name?.toLocaleUpperCase()}
        </div>
      </li>

      <li>
        <Link href="/profile" className="text-[1rem]">
          Profile Settings
        </Link>
      </li>

      <li>
        <Link className="text-[1rem] text-red-500" href="/logout" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </>
  );
};

export default UserMenu;