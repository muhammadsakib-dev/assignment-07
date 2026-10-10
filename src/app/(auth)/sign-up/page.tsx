
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

export default function SignUp() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callbackQuery, setCallbackQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const callbackUrl = getProductCallbackUrl(
      params.get("callbackUrl")
    );

    if (callbackUrl !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCallbackQuery(
        `?callbackUrl=${encodeURIComponent(callbackUrl)}`
      );
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("সব তথ্য পূরণ করুন।");
      return;
    }

    if (name.length < 3) {
      setMessage("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }

    if (password.length < 8) {
      setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setMessage(
        "পাসওয়ার্ডে অন্তত একটি বড় হাতের ইংরেজি অক্ষর ও একটি সংখ্যা থাকতে হবে।"
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const destination = getProductCallbackUrl(
      params.get("callbackUrl")
    );

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: destination,
      });

      if (error) {
        setMessage(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      router.replace(destination);
      router.refresh();
    } catch {
      setMessage("সাইন আপ করার সময় সমস্যা হয়েছে।");
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
    <div className="mx-auto my-15 w-96 max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
      <Form
        className="mx-auto flex w-full max-w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h3 className="text-center text-xl font-semibold">
          অ্যাকাউন্ট তৈরি করুন
        </h3>

        <p className="text-center text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.trim().length < 3) {
              return "Name must be at least 3 characters";
            }

            return null;
          }}
        >
          <Label>নাম</Label>
          <Input placeholder="যেমন: রহিম উদ্দিন" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
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
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain an uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain a number";
            }

            return null;
          }}
        >
          <Label>পাসওয়ার্ড</Label>

          <div className="relative">
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
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

        <TextField
          isRequired
          name="confirmPassword"
          type="password"
          validate={(value) => {
            if (!value) {
              return "Please confirm your password";
            }

            if (value !== password) {
              return "Passwords do not match";
            }

            return null;
          }}
        >
          <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>

          <Input
            placeholder="আবার লিখুন"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

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
            {isSubmitting
              ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
              : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>
        </div>
      </Form>

      <div className="divider mx-auto max-w-96">অথবা</div>

      <div className="flex items-center justify-center gap-3">
        <Social />
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <h4>
          অ্যাকাউন্ট আছে?{" "}
          <Link
            className="font-medium text-green-700 hover:underline"
            href={`/sign-in${callbackQuery}`}
          >
            সাইন ইন করুন
          </Link>
        </h4>
      </div>
    </div>
  );
}
