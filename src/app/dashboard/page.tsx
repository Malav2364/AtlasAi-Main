"use client";

import { Compass, Calendar, Milestone } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the map component with SSR turned off
const OpenFreeMap = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-800"><p>Loading Map...</p></div>,
});

// Reusable Dashboard Widget Component
const DashboardWidget = ({ children, className }: { children: React.ReactNode; className?: string; }) => (
    <div className={`border-2 border-black bg-white p-6 shadow-[4px_4px_0px_#000000] dark:border-white dark:bg-black dark:shadow-[4px_4px_0px_#FFFFFF] ${className}`}>
        {children}
    </div>
);

export default function DashboardPage() {
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, traveler. Here is your mission control.</p>

            {/* Map Widget with neo-brutalist frame */}
            <DashboardWidget className="mt-8 h-96 overflow-hidden p-0">
                <OpenFreeMap />
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
        </>
    );
}