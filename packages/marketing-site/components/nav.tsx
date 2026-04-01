"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "Product", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Demo", href: "/demo" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <nav
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-5 backdrop-blur-md"
        style={{
          background: "rgba(var(--nav-bg, 10, 10, 11), 0.85)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[var(--text)] no-underline">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L6 10V20C6 29 12.4 35.8 20 38C27.6 35.8 34 29 34 20V10L20 4Z" fill="var(--accent)" opacity="0.15" />
            <path d="M20 4L6 10V20C6 29 12.4 35.8 20 38C27.6 35.8 34 29 34 20V10L20 4Z" stroke="var(--accent)" strokeWidth="2" fill="none" />
            <path d="M14 20L18 24L26 16" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-lg font-bold tracking-tight">ShieldAI</span>
          <span className="ml-1 text-xs font-normal" style={{ color: "var(--muted)" }}>by Delfee</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--muted)" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/shieldai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--muted)" }}
            aria-label="ShieldAI on GitHub"
          >
            GitHub
            <svg className="ml-1 inline-block" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3.5 1.5H10.5V8.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.5 1.5L1.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Desktop right */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/demo" className="btn-ghost !py-2 !px-4 !text-xs">
            Sign in
          </Link>
          <Link href="/pricing" className="btn-primary !py-2 !px-4 !text-xs">
            Start free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative z-[60] flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span
              className="block h-0.5 w-5 transition-all"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(45deg) translate(2.5px, 2.5px)" : "none",
              }}
            />
            <span
              className="block h-0.5 w-5 transition-all"
              style={{
                background: "var(--text)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-5 transition-all"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 pt-16"
          style={{ background: "var(--bg)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4"
          >
            Start free — 5,000 credits
          </Link>
        </div>
      )}
    </>
  );
}
