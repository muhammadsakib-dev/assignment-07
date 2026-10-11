// Complete CategoryNavLinksContent.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types/Category";

const CategoryNavLinksContent = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row flex-wrap gap-4 lg:gap-8">

      {categories.map((category) => {
        const href = `/categories/${category.slug}`;

        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            href={href}
            key={category.id}
            className={`flex items-center gap-1 ${
              isActive ? "font-semibold rounded-2xl bg-green-200 px-3 py-1" : ""
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}

    </div>
  );
};

export default CategoryNavLinksContent;
