" use client";
import Image from "next/image";
import Link from "next/link";
import TodayDate from "../shared/headerItems/TodayDate";


const Hero = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-green-100 bg-[#f8faf7] p-5 shadow-sm sm:flex-row sm:px-8 py-12 ">
        
        {/* Content */}
        <div className="w-full flex-1">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium ">
            <TodayDate />
          </span>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য পণ্যের
            সর্বশেষ বাজারদর জানুন। সঠিক তথ্যের মাধ্যমে আপনার
            দৈনন্দিন বাজার হোক আরও সহজ।
          </p>

          <Link
            href="/market"
            className="mt-5 inline-flex items-center rounded-md bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            সব দাম দেখুন
          </Link>
        </div>

        {/* Hero Image */}
        <div className="flex w-full justify-center sm:w-2/5 sm:justify-end">
          <Image
            src="https://ik.imagekit.io/muhammadsakib/bazar-hero.png"
            alt="তাজা শাকসবজির ঝুড়ি"
            width={240}
            height={180}
            priority
            className="h-auto w-44 object-contain sm:w-52"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
