// Complete Component: Hero.tsx
"use client";

import Image from "next/image";
import TodayDate from "../shared/headerItems/TodayDate";

const Hero = () => {
  // Scroll to products section
  const handleClick = () => {
    const element = document.getElementById("products");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="my-10 flex items-center justify-between gap-6 rounded-xl border border-green-100 bg-white p-5 pb-12 shadow-md max-sm:flex-col-reverse max-sm:text-center sm:px-8">
      {/* Content */}
      <div className="w-full flex-1">
        <span className="inline-block rounded-full bg-green-200 px-3 py-1 text-xs font-medium text-green-700">
          <TodayDate />
        </span>

        <h1 className="my-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="max-w-xl text-sm leading-relaxed text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <div
          onClick={handleClick}
          className="btn mt-6 cursor-pointer rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          সব দাম দেখুন
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex w-full justify-center sm:w-2/5 sm:justify-end">
        <Image
          src="https://ik.imagekit.io/muhammadsakib/bazar-hero.png"
          alt="তাজা শাকসবজির ঝুড়ি"
          width={315}
          height={263}
          priority
          className="h-auto w-72 object-contain max-sm:w-56"
        />
      </div>
    </div>
  );
};

export default Hero;
