// complete SignUp page: src/app/(auth)/sign-up/page.tsx
"use client";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Social } from "@/app/components/authSharedCompomenrts/SocialSignIn";

const getProductCallbackUrl = (callbackUrl: string | null) => {
  if (!callbackUrl) return "/";

  try {
    const url = new URL(callbackUrl, window.location.origin);

    if (
      url.origin === window.location.origin &&
      url.pathname.startsWith("/products/") &&
      !url.pathname.includes("\\")
    ) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return "/";
  }

  return "/";
};

export default function SignIn() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callbackQuery, setCallbackQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const callbackUrl = getProductCallbackUrl(params.get("callbackUrl"));

    if (callbackUrl !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCallbackQuery(`?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    if (!email || !password) {
      setMessage("ইমেইল ও পাসওয়ার্ড লিখুন।");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const destination = getProductCallbackUrl(params.get("callbackUrl"));

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: destination,
      });

      if (error) {
        setMessage(error.message || "সাইন ইন ব্যর্থ হয়েছে।");
        return;
      }

      router.replace(destination);
      router.refresh();
    } catch {
      setMessage("সাইন ইন করার সময় সমস্যা হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordShowOrHide = (
    <Button
      type="button"
      isIconOnly
      onPress={() => setShowPassword((previous) => !previous)}
      className="min-w-8 bg-white text-gray-500"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeSlash /> : <Eye />}
    </Button>
  );

  return (
    <div className="mx-auto my-15 w-96 max-w-lg rounded-2xl border border-gray-200 bg-white p-6 text-black shadow-lg sm:p-8">
      <Form
        className="mx-auto flex w-full max-w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h3 className="text-center text-xl font-semibold">সাইন ইন করুন</h3>

        <p className="text-center text-sm text-gray-500">
          আপনার অ্যাকাউন্টে সাইন ইন করে বিস্তারিত দাম দেখুন।
        </p>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>ইমেইল</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="password"
          type={showPassword ? "text" : "password"}
          validate={(value) => {
            if (!value) {
              return "Please enter your password";
            }

            return null;
          }}
        >
          <Label>পাসওয়ার্ড</Label>

          <div className="relative">
            <Input
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />

            <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2">
              {passwordShowOrHide}
            </div>
          </div>

          <FieldError />
        </TextField>

        {message && (
          <p className="text-sm text-red-600" role="alert">
            {message}
          </p>
        )}

        <div className="flex justify-center gap-2">
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="mt-3 w-full rounded-lg bg-green-700 py-5 shadow-lg shadow-green-300"
          >
            {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </Button>
        </div>
      </Form>

      <div className="divider mx-auto max-w-96">অথবা</div>

      <div className="flex items-center justify-center gap-3">
        <Social />
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <h4>
          অ্যাকাউন্ট নেই?{" "}
          <Link
            className="font-medium text-green-700 hover:underline"
            href={`/sign-up${callbackQuery}`}
          >
            সাইন আপ করুন
          </Link>
        </h4>
      </div>
    </div>
  );
}
