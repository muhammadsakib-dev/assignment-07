import Link from "next/link";

const UserMenu = () => {
  return (
    <>
      <li>
        <Link href="/profile" className="justify-between text-[1rem]">
          muhammadsakib079@gmail.com
        </Link>
      </li>

      <li>
        <Link className="text-[1rem]" href="/settings">
          Settings
        </Link>
      </li>

      <li>
        <Link className="text-[1rem] text-red-500" href="/logout">
          Logout
        </Link>
      </li>
    </>
  );
};

export default UserMenu;