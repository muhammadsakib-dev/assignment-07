// Complete Profile Page: profile/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/app/lib/auth-client";
import ProductLoading from "../components/LoadingPage";

export default function ProfilePage() {
  // Router
  const router = useRouter();

  // Session Data
  const { data: session, isPending } = authClient.useSession();

  // State Management
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");

  // Update user name
  const handleUpdateName = async (event: FormEvent<HTMLFormElement>) => {
    // Prevent default form submission
    event.preventDefault();

    // Trim the name input
    const newName = name.trim();

    if (!newName) {
      setMessage("আপনার নাম লিখুন।");
      return;
    }

    setIsUpdating(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        setMessage(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("নাম সফলভাবে আপডেট হয়েছে।");
      setName("");
    } catch {
      setMessage("কোথাও সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    setIsSigningOut(true);
    setMessage("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setMessage(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      router.push("/sign-in");
      router.refresh();
    } catch {
      setMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return <ProductLoading />;
  }

  // Not signed in
  if (!session) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-gray-200 px-4">
        <div className="w-full max-w-xl rounded-xl border border-green-100 bg-white p-6 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            প্রথমে সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইল দেখতে অ্যাকাউন্টে সাইন ইন করতে হবে।
          </p>

          <Link
            href="/sign-in"
            className="mt-5 inline-flex rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-800"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-gray-200 px-4  pt-28">
      <div className="mx-auto max-w-xl">
        <header className="mb-5">
          <h1 className="text-2xl font-bold text-gray-800">আমার প্রোফাইল</h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </header>

        {/* User information */}
        <section className="flex items-center gap-3 rounded-xl border border-green-200 bg-white p-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "প্রোফাইল ছবি"}
              width={64}
              height={64}
              className="size-16 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-green-100 text-lg font-semibold text-green-800">
              {user.name?.charAt(0) || "U"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-semibold text-gray-800">
              {user.name}
            </p>

            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningOut ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
          </button>
        </section>

        {/* Update profile */}
        <section className="mt-4 rounded-xl border border-green-200 bg-white/80 p-5 sm:p-6">
          <h2 className="mb-6 text-lg font-semibold text-gray-800 pb-1 border-b border-gray-200">
            তথ্য
          </h2>

          <form onSubmit={handleUpdateName}>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-gray-400 bg-transparent px-3 py-2.5 my-2 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <button
              type="submit"
              disabled={isUpdating}
              className="mt-3 w-full rounded-md bg-green-700 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>

            {message && (
              <p
                role="status"
                className={`mt-3 text-xs ${
                  message.includes("সফলভাবে")
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
