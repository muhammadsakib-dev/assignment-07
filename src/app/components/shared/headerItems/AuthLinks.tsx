import Link from "next/link";

const AuthLinks = () => {
  return (
    <>
     
        <li>
        <Link className="text-[1rem] text-black bg-gray-200" href="/sign-in">
          সাইন ইন
        </Link>
      </li>

      <li className="rounded-md bg-green-700 text-white hover:bg-green-800">
        <Link className="text-[1rem] shadow-lg shadow-green-300 " href="/sign-up">
          সাইন আপ
        </Link>
      </li>
      
    </>
  );
};

export default AuthLinks;