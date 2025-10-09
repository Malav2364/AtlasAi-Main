"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { LayoutDashboard, Map, Plane, Settings, LogOut, Compass, Calendar, Milestone } from 'lucide-react';
import Image from 'next/image';

// Reusable Sidebar Link Component
const SidebarLink = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean; }) => (
    <a href="#" className={`flex items-center gap-3 px-3 py-2 font-bold transition-colors ${
        active 
        ? 'bg-lime-400 text-black' 
        : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
    }`}>
        {icon}
        <span>{label}</span>
    </a>
);

// Reusable Dashboard Widget Component
const DashboardWidget = ({ children, className }: { children: React.ReactNode; className?: string; }) => (
    <div className={`border-2 border-black bg-white p-6 shadow-[4px_4px_0px_#000000] dark:border-white dark:bg-black dark:shadow-[4px_4px_0px_#FFFFFF] ${className}`}>
        {children}
    </div>
);

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
                    <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <SidebarLink icon={<Plane size={20} />} label="My Trips" />
                    <SidebarLink icon={<Settings size={20} />} label="Settings" />
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
                <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back, traveler. Here is your mission control.</p>

                {/* Map Widget - Reverted to placeholder */}
                <DashboardWidget className="mt-8 h-96">
                    <h2 className="flex items-center gap-2 text-xl font-bold">
                        <Map size={20} />
                        <span>World Map</span>
                    </h2>
                    <div className="mt-4 flex h-full items-center justify-center border-t-2 border-dashed border-black text-gray-400 dark:border-white">
                        <p>[ Interactive Map Component Goes Here ]</p>
                    </div>
                </DashboardWidget>

                {/* Stats and Actions Grid */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Upcoming Trip Widget */}
                    <DashboardWidget>
                        <h2 className="flex items-center gap-2 text-xl font-bold">
                            <Compass size={20} />
                            <span>Next Destination</span>
                        </h2>
                        <div className="mt-4 border-t-2 border-dashed border-black pt-4 dark:border-white">
                            <p className="text-2xl md:text-4xl font-bold">TOKYO, JAPAN</p>
                            <div className="mt-2 flex flex-col gap-2 text-base md:flex-row md:gap-6 md:text-lg">
                                <p><span className="text-gray-500">FLIGHT:</span> AA-2025</p>
                                <p><span className="text-gray-500">DEPARTS:</span> 25 OCT 2025</p>
                            </div>
                        </div>
                    </DashboardWidget>

                    {/* Stats Widget */}
                    <DashboardWidget>
                        <h2 className="flex items-center gap-2 text-xl font-bold">
                            <Milestone size={20} />
                            <span>Travel Stats</span>
                        </h2>
                        <div className="mt-4 space-y-2 border-t-2 border-dashed border-black pt-4 dark:border-white">
                            <p><span className="font-bold">Countries Visited:</span> 12</p>
                            <p><span className="font-bold">Miles Traveled:</span> 45,890</p>
                            <p><span className="font-bold">Current Streak:</span> 3 Trips</p>
                        </div>
                    </DashboardWidget>

                    {/* Quick Actions Widget */}
                    <DashboardWidget className="lg:col-span-2">
                        <h2 className="flex items-center gap-2 text-xl font-bold">
                            <Calendar size={20} />
                            <span>Quick Actions</span>
                        </h2>
                        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                            <button className="border-2 border-black bg-lime-400 px-6 py-3 font-bold text-black shadow-[4px_4px_0px_#000000] transition-transform hover:-translate-y-1 dark:shadow-[4px_4px_0px_#FFFFFF]">
                                Plan New Trip
                            </button>
                            <button className="border-2 border-black bg-white px-6 py-3 font-bold text-black shadow-[4px_4px_0px_#000000] transition-transform hover:-translate-y-1 dark:border-white dark:bg-black dark:text-white dark:shadow-[4px_4px_0px_#FFFFFF]">
                                View Full Map
                            </button>
                        </div>
                    </DashboardWidget>
                </div>

                {/* ADDED: Section with more content to ensure scrolling */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Past Trips</h2>
                    <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
                        <DashboardWidget>
                            <p className="font-bold">PARIS, FRANCE</p>
                            <p className="text-sm text-gray-500">15 JUN 2025</p>
                        </DashboardWidget>
                        <DashboardWidget>
                            <p className="font-bold">ROME, ITALY</p>
                            <p className="text-sm text-gray-500">02 APR 2025</p>
                        </DashboardWidget>
                        <DashboardWidget>
                            <p className="font-bold">CAIRO, EGYPT</p>
                            <p className="text-sm text-gray-500">11 JAN 2025</p>
                        </DashboardWidget>
                        <DashboardWidget>
                            <p className="font-bold">SYDNEY, AUSTRALIA</p>
                            <p className="text-sm text-gray-500">30 NOV 2024</p>
                        </DashboardWidget>
                    </div>
                </div>
            </main>
        </div>
    );
}