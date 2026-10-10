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

export default function SignIn() {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        String(value),
      ]),
    ) as Record<string, string>;

    const { data: signInData, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe,
      callbackURL: "http://localhost:3000/", // Redirect to dashboard after successful sign-in
    });

    console.log("signInData", signInData);

    if (error) {
      console.error("Sign in error:", error);
      return;
    }

    // Redirect or show success message here
  };

  const passwordShowOrHide = (
    <Button
      type="button"
      isIconOnly
      onClick={() => setShowPassword(!showPassword)}
      className="min-w-8 bg-white text-gray-500"
    >
      {showPassword ? <EyeSlash /> : <Eye />}
    </Button>
  );

  console.log();
  return (
    <>
      <div className="mx-auto my-15 w-96 max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 text-black">
        <Form
          className="mx-auto flex w-full max-w-96 flex-col gap-4"
          onSubmit={onSubmit}
        >
          <h3 className="text-center text-xl font-semibold">সাইন ইন করুন</h3>

          <p className="text-center text-sm text-gray-500">
            আপনার অ্যাকাউন্টে সাইন ইন করে বিস্তারিত দাম দেখুন।
          </p>

          {/* Email */}
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

      
          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Label htmlFor="rememberMe">Remember me</Label>
          </div>

          {/* Submit */}
          <div className="flex justify-center gap-2">
            <Button
              type="submit"
              className="mt-3 w-full rounded-lg bg-green-700 py-5 shadow-lg shadow-green-300"
            >
              সাইন ইন
            </Button>
          </div>
        </Form>

        {/* Social Login */}
        <div className="divider mx-auto max-w-96">অথবা</div>

        <div className="flex items-center justify-center gap-3">
          <Social />
        </div>

        {/* Sign Up */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <h4>
            অ্যাকাউন্ট নেই?{" "}
            <Link
              className="font-medium text-green-700 hover:underline"
              href="/sign-up"
            >
              সাইন আপ করুন
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
}
