// Component: CategoryNavLinks
"use client";
import { Suspense } from "react";
import type { Category } from "@/types/Category";
import CategoryNavLinksContent from "./CategoryNavLinksContent";

const CategoryNavLinks = ({
  categories,
}: {
  categories: Category[];
}) => {

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
