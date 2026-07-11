"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT, type L10n } from "@/lib/i18n";

type NavItem = {
  href: string;
  label: L10n;
  icon: (active: boolean) => React.ReactNode;
};

const stroke = (active: boolean) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: active ? 2.2 : 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const ITEMS: NavItem[] = [
  {
    href: "/",
    label: { en: "Home", no: "Hjem" },
    icon: (a) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke(a)}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    ),
  },
  {
    href: "/lessons",
    label: { en: "Lessons", no: "Leksjoner" },
    icon: (a) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke(a)}>
        <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
        <path d="M4 19a2 2 0 0 1 2-2h13" />
      </svg>
    ),
  },
  {
    href: "/chat",
    label: { en: "Coach", no: "Coach" },
    icon: (a) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke(a)}>
        <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
      </svg>
    ),
  },
  {
    href: "/sources",
    label: { en: "Science", no: "Forskning" },
    icon: (a) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke(a)}>
        <path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3" />
        <path d="M7.5 3h9" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const t = useT();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-tq-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-2xl">
        {ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                active ? "text-tq-600" : "text-slate-400 hover:text-tq-500"
              }`}
            >
              {item.icon(active)}
              {t(item.label)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
