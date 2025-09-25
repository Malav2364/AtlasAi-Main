"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const MENU_LINKS = [
{ name: "Create Your Itenery", href: "/travel" },
{ name: "Visit your Memories", href: "/memories" },
{ name: "Login/Signup", href: "/authenticate" },
];

export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
    if (menuOpen) {
    document.body.classList.add("overflow-hidden");
    } else {
    document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
}, [menuOpen]);

useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);

return (
    <>
    {/* Hamburger / Close Button */}
    <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className={`
        fixed top-6 left-6 z-[120]
        flex flex-col items-center justify-center w-12 h-12 rounded-2xl
        border-none
        transition-all duration-300
        ${scrolled && !menuOpen ? "opacity-60 scale-90" : "opacity-100 scale-100"}
        `}
        onClick={() => setMenuOpen((v) => !v)}
        style={{
        boxShadow: menuOpen ? "0 0 0 transparent" : "0px 2px 16px 0 rgba(0,0,0,0.08)",
        }}
    >
        {/* Hamburger Icon: glass foreground; using black bars for Apple style */}
        <span
        className={`
            block w-8 h-1 rounded transition-all duration-300 bg-white
            ${menuOpen ? "rotate-45 translate-y-2.5" : ""}
        `}
        />
        <span
        className={`
            block w-8 h-1 rounded my-1 transition-all duration-300 bg-white
            ${menuOpen ? "opacity-0" : ""}
        `}
        />
        <span
        className={`
            block w-8 h-1 rounded transition-all duration-300 bg-white
            ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}
        `}
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
        style={{ backdropFilter: "blur(2px)" }}
        aria-hidden={!menuOpen}
    >
        <ul
        className="
            flex flex-col items-center w-full
            max-h-[80vh] overflow-y-auto px-2
            space-y-8 text-3xl md:text-6xl font-extrabold text-black uppercase
            transition-all duration-500
            "
        >
        {MENU_LINKS.map((item) => (
            <li
            key={item.name}
            className="
                w-full text-center whitespace-normal break-words
                transition-colors transition-opacity duration-300
                hover:text-neutral-500 hover:opacity-70
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
        fixed inset-0 z-[100] bg-white/60 backdrop-blur-2xl
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
