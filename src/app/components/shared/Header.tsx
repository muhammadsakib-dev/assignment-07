import Image from "next/image";
import Link from "next/link";
import TodayDate from "./headerItems/TodayDate";
import AuthLinks from "./headerItems/AuthLinks";
import UserMenu from "./headerItems/UserMenu";

const Header = () => {
  // Authentication state
  // Fake state for now, will be replaced with actual auth logic
  const isSignIn = true; // Change this to false to test the unauthenticated state

  return (
    <div className="navbar px-4 py-4  md:px-8 lg:px-32 border-b border-gray-300">
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
            <h3 className="text-xl font-bold">বাজার দর</h3>

            <time className="text-sm text-gray-500">
              <TodayDate />
            </time>
          </div>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
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
            className="menu menu-sm dropdown-content z-10 mt-8 w-72 rounded-box bg-base-200 p-3 shadow "
          >
            {isSignIn ? <UserMenu /> : <AuthLinks />}
          </ul>
        </div>
      </div>

      {/* Desktop Authentication */}
      <div className="hidden lg:flex">
        {isSignIn ? (
          <div className="flex items-center gap-4">
            <h4>Welcome, John Doe</h4>
            <div className="dropdown dropdown-end">
              {/* Avatar Button */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-ghost avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    src="https://ik.imagekit.io/muhammadsakib/default-image.jpg?updatedAt=1791385520606"
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              {/* User Menu */}

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content z-10 mt-8 w-90 rounded-box bg-base-100 p-2 shadow"
              >
                <UserMenu />
              </ul>
            </div>
          </div>
        ) : (
          <>
            <ul className="menu menu-horizontal gap-4">
              <AuthLinks />
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
