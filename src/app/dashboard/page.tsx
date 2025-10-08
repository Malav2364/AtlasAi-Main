"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

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
                <p className="text-gray-800 dark:text-gray-200">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return null; // Or a redirect component, though useEffect should handle it.
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-mono">
            <div className="w-full max-w-md p-8 space-y-6 bg-white border-2 border-black shadow-[8px_8px_0px_#000000] dark:bg-black dark:border-white dark:shadow-[8px_8px_0px_#FFFFFF]">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Welcome to your protected space.</p>
                </div>
                
                <div className="text-center text-black dark:text-white">
                    <p>Signed in as:</p>
                    <p className="font-bold break-all">{user.email}</p>
                </div>

                <button
                    onClick={handleSignOut}
                    className="w-full border-2 border-black bg-lime-400 py-3 font-bold text-black shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:shadow-[4px_4px_0px_#FFFFFF]"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
