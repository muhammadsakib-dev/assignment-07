"use client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { FormEvent, useState } from "react";
import { Social } from "@/app/components/authSharedCompomenrts/SocialSignIn";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        String(value),
      ]),
    ) as Record<string, string>;

    const { data: signUpData, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    console.log("signUpData", signUpData);
  };


  const passwordShowOrHide = (
    <Button
      type="button"
      isIconOnly
      onClick={() => setShowPassword(!showPassword)}
      className="min-w-8 text-gray-500 bg-white"
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
            if (value.length < 3) {
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

        {/* Password */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
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

        {/* Confirm Password */}
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

        {/* Submit */}
        <div className="flex justify-center gap-2">
          <Button
            type="submit"
            className="mt-3 w-full rounded-lg bg-green-700 py-5 shadow-lg shadow-green-300"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>
        </div>
      </Form>

      {/* Social Login */}
      <div className="divider mx-auto max-w-96">অথবা</div>

      <div className="flex items-center justify-center gap-3">
        <Social />
      </div>

      {/* Sign In */}
      <div className="mt-5 flex items-center justify-center gap-2">
        <h4>
          অ্যাকাউন্ট আছে?{" "}
          <Link
            className="font-medium text-green-700 hover:underline"
            href="/sign-in"
          >
            সাইন ইন করুন
          </Link>
        </h4>
      </div>
    </div>
  );
}
