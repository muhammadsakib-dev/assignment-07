"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");

  // Update user name
  const handleUpdateName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F1F5F0]">
        <p className="text-sm text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  // Not signed in
  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F1F5F0] px-4">
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
    <main className="min-h-screen bg-[#F1F5F0] px-4 py-10">
      <div className="mx-auto max-w-xl">
        {/* Page Heading */}
        <header className="mb-5">
          <h1 className="text-xl font-bold text-gray-800">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </header>

        {/* User Information */}
        <section className="flex items-center gap-3 rounded-xl border border-[#E3EBE3] bg-white/80 p-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "প্রোফাইল ছবি"}
              className="size-12 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-lg font-semibold text-green-800">
              {user.name?.charAt(0) || "U"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-800">
              {user.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 rounded-md border border-red-300 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningOut ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
          </button>
        </section>

        {/* Update Profile Form */}
        <section className="mt-4 rounded-xl border border-[#E3EBE3] bg-white/80 p-5 sm:p-6">
          <h2 className="mb-6 text-sm font-semibold text-gray-800">
            তথ্য
          </h2>

          <form onSubmit={handleUpdateName}>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-[#E3EBE3] bg-transparent px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <button
              type="submit"
              disabled={isUpdating}
              className="mt-3 w-full rounded-md bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
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
};

export default ProfilePage;