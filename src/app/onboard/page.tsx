"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from "next/navigation";
import { AtSign, Lock, User as UserIcon } from "lucide-react";
import { Skiper26 } from "@/components/skiper26";
import Image from "next/image";
import { User } from '@supabase/supabase-js';

const OnboardingPage: React.FC = () => {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -10 },
  };

  useEffect(() => {
    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setUser(session.user);
            router.push('/dashboard');
        }
    };
    checkUser();
  }, [router]);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (formType === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Check your email for the confirmation link!');
            setFormType("login");
        }
    } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setMessage(error.message);
        } else {
            router.push('/dashboard');
        }
    }
  };

  if (user) {
      return (
          <div className='flex flex-col items-center justify-center w-screen h-screen'>
              Signed in as {user.email}
          </div>
      );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 font-mono dark:bg-gray-900">
      <form onSubmit={handleAuthAction} className="w-full max-w-3xl">
        {/* Boarding Pass Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative flex w-full border-2 border-black bg-white shadow-[8px_8px_0px_#000000] dark:border-white dark:bg-black dark:shadow-[8px_8px_0px_#FFFFFF]"
        >
          {/* Theme Switcher */}
          <div className="absolute top-4 right-4 z-10">
            <Skiper26 />
          </div>

          {/* Main Pass Section */}
          <div className="flex-grow p-6 text-black dark:text-white">
            <header className="flex items-center justify-between border-b-2 border-black pb-2 dark:border-white">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="AtlasAi Logo"
                  width={50}
                  height={50}
                  className="dark:invert"
                />
                <div>
                  <h1 className="text-2xl font-bold">ATLAS</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Official Web Carrier</p>
                </div>
              </div>
              <p className="font-bold">BOARDING PASS</p>
            </header>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={formType}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {formType === "login" ? (
                    <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                  ) : (
                    <SignUpForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} fullName={fullName} setFullName={setFullName} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="mt-4 border-t-2 border-black pt-2 dark:border-white">
              <Barcode />
              <p className="mt-2 text-center text-[10px] tracking-widest text-gray-600 dark:text-gray-400">
                HAVE A SAFE AND SECURE FLIGHT
              </p>
              {message && <p className="mt-2 text-center text-sm text-red-500">{message}</p>}
            </footer>
          </div>

          {/* Stub Section */}
          <div className="flex flex-col justify-between border-l-2 border-dashed border-black bg-gray-50 p-6 text-black dark:border-white dark:bg-gray-900/50 dark:text-white">
            <div>
              <header className="text-center">
                <h2 className="font-bold">ATLAS_AI</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">Web Carrier</p>
              </header>
              <div className="mt-6 space-y-4 text-center">
                <InfoField label="GATE" value={formType.toUpperCase()} />
                <InfoField label="SEAT" value="42A" />
                <InfoField label="FLIGHT" value="AA-2025" />
              </div>
            </div>
            <ActionButton formType={formType} setFormType={setFormType} />
          </div>
        </motion.div>
      </form>
    </main>
  );
};

// Reusable field for the stub
const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

// Reusable input for the form
const BoardingInput = ({ icon, type, placeholder, value, onChange }: { icon: React.ReactNode; type: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
  <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="relative flex items-center">
    <span className="absolute left-3 text-gray-500 dark:text-gray-400">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
      className="w-full border-2 border-black bg-white py-3 pl-10 pr-3 text-black placeholder-gray-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-lime-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-lime-400"
    />
  </motion.div>
);

// Barcode Component
const Barcode = () => {
  const [widths, setWidths] = useState<number[]>([]);

  useEffect(() => {
    const newWidths = [...Array(30)].map(() => Math.floor(Math.random() * 3) + 1);
    setWidths(newWidths);
  }, []);

  return (
    <div className="flex h-12 w-full items-stretch justify-between">
      {widths.map((width, i) => (
        <div
          key={i}
          className="bg-black dark:bg-white"
          style={{ width: `${width}px` }}
        />
      ))}
    </div>
  );
};

// Combined Action Button and Toggle
const ActionButton = ({ formType, setFormType }: { formType: string; setFormType: (type: "login" | "signup") => void; }) => (
  <div className="mt-6 text-center">
    <motion.button
      type="submit"
      whileHover={{ transform: "translate(-4px, -4px)", boxShadow: "8px 8px 0px var(--shadow-color)" }}
      whileTap={{ transform: "translate(0px, 0px)", boxShadow: "4px 4px 0px var(--shadow-color)" }}
      transition={{ duration: 0.1 }}
      className="w-full border-2 border-black bg-lime-400 py-3 font-bold text-black shadow-[4px_4px_0px_#000000] dark:border-white dark:shadow-[4px_4px_0px_#FFFFFF]"
    >
      {formType === "login" ? "BOARD NOW" : "GET TICKET"}
    </motion.button>
    <button
      type="button"
      onClick={() => setFormType(formType === "login" ? "signup" : "login")}
      className="mt-4 text-xs font-bold text-gray-600 underline hover:text-lime-500 dark:text-gray-400 dark:hover:text-lime-400"
    >
      {formType === "login" ? "Need a ticket?" : "Already have one?"}
    </button>
  </div>
);

interface FormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  fullName?: string;
  setFullName?: (value: string) => void;
}

// Login Form Fields
const LoginForm = ({ email, setEmail, password, setPassword }: FormProps) => (
  <div className="space-y-4">
    <InfoField label="PASSENGER" value="RETURNING USER" />
    <BoardingInput icon={<AtSign size={16} />} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
    <BoardingInput icon={<Lock size={16} />} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
  </div>
);

// Sign Up Form Fields
const SignUpForm = ({ email, setEmail, password, setPassword, fullName, setFullName }: FormProps) => (
  <div className="space-y-4">
    <InfoField label="PASSENGER" value="NEW APPLICANT" />
    <BoardingInput icon={<UserIcon size={16} />} type="text" placeholder="Full Name" value={fullName || ''} onChange={(e) => setFullName && setFullName(e.target.value)} />
    <BoardingInput icon={<AtSign size={16} />} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
    <BoardingInput icon={<Lock size={16} />} type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />
  </div>
);

export default OnboardingPage;
