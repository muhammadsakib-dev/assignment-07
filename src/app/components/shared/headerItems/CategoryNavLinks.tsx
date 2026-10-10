
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryNavLinksProps {
  categories: Category[];
}

const CategoryNavLinksContent = ({
  categories,
}: CategoryNavLinksProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row flex-wrap gap-4 lg:gap-8">
      {categories.map((category) => {
        const href = `/categories/${category.slug}`;

        const isActive =
          pathname === href ||
          pathname.startsWith(`${href}/`);

        return (
          <Link
            href={href}
            key={category.id}
            className={`flex items-center gap-1 ${
              isActive ? "font-semibold" : ""
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

const CategoryNavLinks = ({
  categories,
}: CategoryNavLinksProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-row flex-wrap gap-4 lg:gap-8">
          {categories.map((category) => (
            <span key={category.id} className="flex items-center gap-1">
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </span>
          ))}
        </div>
      }
    >
      <CategoryNavLinksContent categories={categories} />
    </Suspense>
  );
};

export default CategoryNavLinks;
