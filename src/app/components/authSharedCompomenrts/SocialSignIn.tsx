
"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/app/lib/auth-client";

type Provider = "google" | "github";

export function Social() {
  const [loading, setLoading] = useState<Provider | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (provider: Provider) => {
    setLoading(provider);
    setErrorMessage("");

    try {
      // Clear the current application session first.
      const { error: logoutError } = await authClient.signOut();

      if (logoutError) {
        setErrorMessage(logoutError.message || "Sign out failed.");
        return;
      }

      const options = {
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
        ...(provider === "google"
          ? { additionalParams: { prompt: "select_account" } }
          : {}),
      } as const;

      const { error } = await authClient.signIn.social(options);

      if (error) {
        setErrorMessage(error.message || "Social sign-in failed.");
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button
        type="button"
        variant="tertiary"
        className="w-full rounded-lg border border-gray-400"
        isDisabled={loading !== null}
        onPress={() => handleSignIn("google")}
      >
        <Icon icon="devicon:google" />
        {loading === "google"
          ? "Connecting..."
          : "Google দিয়ে চালিয়ে যান"}
      </Button>

      <Button
        type="button"
        variant="tertiary"
        className="w-full rounded-lg border border-gray-400"
        isDisabled={loading !== null}
        onPress={() => handleSignIn("github")}
      >
        <Icon icon="mdi:github" />
        {loading === "github"
          ? "Connecting..."
          : "GitHub দিয়ে চালিয়ে যান"}
      </Button>

      {errorMessage && (
        <p className="text-sm text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
