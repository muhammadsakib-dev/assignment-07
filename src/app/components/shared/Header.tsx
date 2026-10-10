
"use client";

import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/app/lib/auth-client";
import AuthLinks from "./headerItems/AuthLinks";
import TodayDate from "./headerItems/TodayDate";
import UserMenu from "./headerItems/UserMenu";

const Header = () => {
  const { data: session, isPending } = authClient.useSession();

  const isSignIn = Boolean(session?.user);

  return (
    <div className="navbar border-b border-gray-300 px-4 py-4 md:px-8 lg:px-32">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://ik.imagekit.io/muhammadsakib/cart.png?updatedAt=1791385677073"
            alt="বাজার দর Logo"
            width={50}
            height={50}
            className="rounded-xl bg-green-700 p-3"
          />

          <div>
            <h3 className="text-xl font-bold text-black">
              বাজার দর
            </h3>

            <time className="text-sm text-gray-500">
              <TodayDate />
            </time>
          </div>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            aria-label="Open navigation menu"
            className="btn btn-circle btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content z-10 mt-8 w-72 rounded-box bg-base-200 p-3 shadow"
          >
            {isPending ? (
              <li>
                <span>Loading...</span>
              </li>
            ) : isSignIn ? (
              <UserMenu />
            ) : (
              <AuthLinks />
            )}
          </ul>
        </div>
      </div>

      {/* Desktop Authentication */}
      <div className="hidden lg:flex">
        {isPending ? (
          <span className="loading loading-spinner loading-lg text-success" />
        ) : isSignIn ? (
          <div className="flex items-center gap-4">
            <h4>
              Welcome,{" "}
              {session?.user?.name?.trim().toLocaleUpperCase() ||
                "USER"}
            </h4>

            <div className="dropdown dropdown-end">
              {/* Avatar Button */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Open user menu"
                className="btn btn-circle btn-ghost avatar"
              >
                <div className="w-10 rounded-full">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                      {session?.user?.name
                        ?.trim()
                        .charAt(0)
                        .toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>

              {/* User Menu */}
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content z-10 mt-8 w-72 rounded-box bg-base-100 p-2 shadow"
              >
                <UserMenu />
              </ul>
            </div>
          </div>
        ) : (
          <ul className="menu menu-horizontal gap-4">
            <AuthLinks />
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
