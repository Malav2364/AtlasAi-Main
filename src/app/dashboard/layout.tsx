"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { LayoutDashboard, Plane, Settings, LogOut, Milestone } from 'lucide-react';
import Image from 'next/image';

// Reusable Sidebar Link Component
const SidebarLink = ({ icon, label, href = '#', active = false }: { icon: React.ReactNode; label: string; href?: string; active?: boolean; }) => (
    <a href={href} className={`flex items-center gap-3 px-3 py-2 font-bold transition-colors ${
        active 
        ? 'bg-lime-400 text-black' 
        : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
    }`}>
        {icon}
        <span>{label}</span>
    </a>
);

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            } else {
                router.push('/onboard');
            }
            setLoading(false);
        };

        checkSession();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/onboard');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p className="font-mono text-lg text-gray-800 dark:text-gray-200">AUTHENTICATING...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 font-mono text-black dark:bg-gray-900 dark:text-white">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r-2 border-black bg-white dark:border-white dark:bg-black md:flex">
                <div className="flex items-center gap-3 border-b-2 border-black p-4 dark:border-white">
                    <Image src="/logo.png" alt="AtlasAi Logo" width={50} height={50} className="dark:invert" />
                    <h1 className="text-xl font-bold">ATLAS_AI</h1>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" href="/dashboard" active={pathname === '/dashboard'} />
                    <SidebarLink icon={<Plane size={20} />} label="My Trips" href="#" />
                    <SidebarLink icon={<Settings size={20} />} label="Settings" href="#" />
                    <SidebarLink icon={<Milestone size={20} />} label="Memories" href="/dashboard/memories" active={pathname === '/dashboard/memories'} />
                </nav>
                <div className="border-t-2 border-black p-4 dark:border-white">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Signed in as:</p>
                    <p className="break-all text-sm font-bold">{user.email}</p>
                    <button onClick={handleSignOut} className="mt-4 flex w-full items-center justify-center gap-2 border-2 border-black bg-gray-200 py-2 font-bold transition-colors hover:bg-red-400 dark:border-white dark:bg-gray-800 dark:hover:bg-red-500">
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
