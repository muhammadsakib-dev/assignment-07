"use client";

import { FormEvent, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { Button, Link } from "@heroui/react";



const ProfilePage = () => {


  const { data: session, isPending } = authClient.useSession();




  const [name, setName] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");



  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-success loading-xl"></span>
      </div>
    );
  }


  if (!session) {
    return (
      <div className="min-h-screen flex  flex-col items-center justify-center">
        <p className="text-4xl text-red-500">Please sign in first.</p> 
        <p className="text-lg text-gray-500 mt-4">You need to be signed in to view this page.</p>
        <Link href="/sign-in"><Button className={`bg-green-700 text-xl p-6 mt-6 rounded-xl`}>Go to Sign In</Button></Link>
      </div>
    );
  }


  const user = session.user;

  
  const handleUpdateName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    setIsUpdating(true);
    setMessage("");

    const { error } = await authClient.updateUser({
      name: name.trim(),
    });

    if (error) {
      setMessage(error.message || "Failed to update name.");
    } else {
      setMessage("Name updated successfully.");
      setName("");
    }

    setIsUpdating(false);
  };

  return (
    <main className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-base-100 p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold">Profile</h1>

          {/* User Info */}
          <div className="mb-8 space-y-4">
            <div>
              <p className="text-sm text-base-content/60">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {/* Update Name */}
          <form onSubmit={handleUpdateName} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Update Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your new name"
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="btn btn-primary w-full"
            >
              {isUpdating ? "Updating..." : "Update Name"}
            </button>

            {message && (
              <p className="text-sm text-base-content/70">{message}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
