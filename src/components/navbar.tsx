"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const MENU_LINKS = [
    { name: "CREATE YOUR ITENERY", href: "/jump-factory" },
    { name: "VIEW YOUR MEMORIES", href: "/adcker" },
    { name: "LOGIN/SIGNUP", href: "/jochi-labs" },
];

// Accepts forceWhite prop to force hamburger and menu text to always be white
export default function Navbar({ forceWhite = false }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

// Lock body scroll when menu is open
useEffect(() => {
    if (menuOpen) {
    document.body.classList.add("overflow-hidden");
    } else {
    document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
}, [menuOpen]);

// Minimalist effect on scroll
useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Choose text color class depending on section
const colorClass = forceWhite ? "text-white" : "text-foreground";

return (
    <>
    {/* Hamburger / Close Button */}
    <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className={`
        fixed top-6 left-6 z-[120]
        flex flex-col items-center justify-center w-12 h-12 rounded-full
        border-none bg-transparent ${colorClass}
        backdrop-blur transition-all duration-300 text-white
        ${scrolled && !menuOpen ? "opacity-60 scale-90" : "opacity-100 scale-100"}
        `}
        onClick={() => setMenuOpen((v) => !v)}
        style={{
        boxShadow: menuOpen ? "0 0 0 transparent" : "0px 2px 12px rgba(0,0,0,0.05)",
        }}
    >
        <span
        className={`
            block w-8 h-1 rounded transition-all duration-300
            ${menuOpen ? "rotate-45 translate-y-2.5" : ""}
        `}
        style={{ background: "currentColor" }}
        />
        <span
        className={`
            block w-8 h-1 rounded my-1 transition-all duration-300
            ${menuOpen ? "opacity-0" : ""}
        `}
        style={{ background: "currentColor" }}
        />
        <span
        className={`
            block w-8 h-1 rounded transition-all duration-300
            ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}
        `}
        style={{ background: "currentColor" }}
        />
    </button>

    {/* Menu Overlay */}
    <nav
        className={`
        fixed inset-0 z-[110] 
        transition-all duration-500 ease-in-out
        flex justify-center items-center
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{
        backdropFilter: "blur(0.5px)",
        }}
        aria-hidden={!menuOpen}
    >
        <ul
        className={`
            flex flex-col items-center w-full
            max-h-[80vh] overflow-y-auto px-2
            space-y-8 text-3xl md:text-6xl font-extrabold uppercase
            transition-all duration-500
            ${colorClass}
        `}
        >
        {MENU_LINKS.map((item) => (
            <li
            key={item.name}
            className="
                w-full text-center whitespace-normal break-words
                transition-colors transition-opacity duration-300
                hover:text-muted2 hover:opacity-70
            "
            >
            <Link href={item.href} onClick={() => setMenuOpen(false)}>
                {item.name}
            </Link>
            </li>
        ))}
        </ul>
    </nav>
    {/* Semi-transparent overlay with fade */}
    <div
        className={`
        fixed inset-0 z-[100] bg-background/70
        transition-opacity duration-500
        ${menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        `}
        aria-hidden={!menuOpen}
    />
    </>
);
}
