"use client";

import { cn } from "@/utils/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Key", href: "/", highlightRegex: /^\/$/ },
  { label: "Chord", href: "/chord", highlightRegex: /^\/chord.*/ },
] satisfies { label: string; href: string; highlightRegex: RegExp }[];

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="mb-8">
      <nav aria-label="main-nav">
        <ul className="flex items-center justify-center gap-2 px-4">
          {NAV_ITEMS.map(({ label, href, highlightRegex }) => {
            const isCurrent = highlightRegex.test(pathname ?? "");
            return (
              <li className="inline-block py-4" key={label}>
                <Link
                  aria-current={isCurrent ? "page" : undefined}
                  href={href}
                  className={cn(
                    "p-2 text-xl font-bold uppercase",
                    isCurrent && "text-red-400 underline",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
