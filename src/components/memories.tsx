"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, BookOpen, ArrowRight, X, Plane, Hotel, Train, Bus, Camera,
    ArrowLeft, ChevronsRight, Paperclip, UserCircle,
} from 'lucide-react';
import { Trip, Memory, Booking, ItineraryItem, Companion, JournalEntry } from "@/types";

// --- THEME --- //
const theme = {
    colors: {
        neoLime: '#A3E635', 
    },
    shadows: {
        neoBlack: '8px 8px 0px #000000',
        neoWhite: '8px 8px 0px #FFFFFF',
        neoBlackSmall: '4px 4px 0px #000000',
        neoWhiteSmall: '4px 4px 0px #FFFFFF',
    }
};

// --- TYPE DEFINITIONS --- //
interface StubFieldProps {
    label: string;
    value: string | number;
}
interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
}
interface TravelCardProps {
    trip: Trip;
    onSelect: (trip: Trip) => void;
}
interface BookingPassProps {
    booking: Booking;
}
interface ItineraryCardProps {
    item: ItineraryItem;
}
interface CompanionCardProps {
    companion: Companion;
}
interface JournalEntryCardProps {
    entry: JournalEntry;
}
interface MemoryCardProps {
    memory: Memory;
    onClick: () => void;
}
interface TripDetailViewProps {
    trip: Trip;
    onDeselect: () => void;
    onShowSlideshow: (memories: Memory[], startIndex: number) => void;
}
interface CreativeSlideshowProps {
    memories: Memory[];
    onClose: () => void;
    startIndex: number;
}


// --- HELPER & STYLING COMPONENTS --- //
const Barcode = () => (
    <div className="flex h-10 w-full items-stretch justify-between">
        {[...Array(30)].map((_, i) => (
            <div key={i} className="bg-black dark:bg-white" style={{ width: `${Math.floor(Math.random() * 3) + 1}px` }} />
        ))}
    </div>
);
const StubField: React.FC<StubFieldProps> = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-black tracking-tighter text-2xl">{value}</p>
    </div>
);
const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => (
    <div className="flex items-center gap-3 p-2 border-2 border-black dark:border-white bg-[var(--neo-lime)] text-black"
        style={{boxShadow: theme.shadows.neoBlackSmall}}>
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
    </div>
);

// --- CORE UI COMPONENTS --- //
const TravelCard: React.FC<TravelCardProps> = ({ trip, onSelect }) => (
    <motion.div
        layoutId={`card-container-${trip.id}`} onClick={() => onSelect(trip)}
        className="relative cursor-pointer w-full h-80 overflow-hidden border-2 border-black dark:border-white group"
        style={{'--neo-lime': theme.colors.neoLime} as React.CSSProperties}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }} whileHover={{ scale: 1.02 }}
    >
        <motion.div layoutId={`card-image-${trip.id}`} className="absolute inset-0">
            <Image
                src={trip.coverImage}
                alt={trip.destination}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
        </motion.div>
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-5 text-white">
            <div className="flex justify-between items-start">
                <div className="font-mono text-xs border-2 border-white bg-black/50 px-2 py-1">
                    {new Date(trip.startDate).getFullYear()}
                </div>
                <div className="text-right">
                    <h3 className="text-4xl font-black tracking-tighter">{trip.airportCode}</h3>
                    <p className="font-mono text-sm">{trip.country.toUpperCase()}</p>
                </div>
            </div>
            <div className="relative">
                <div className="absolute bottom-10 right-0 p-3 bg-white group-hover:bg-[var(--neo-lime)] transition-colors duration-300">
                    <ArrowRight className="text-black h-8 w-8 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <h2 className="text-3xl font-bold">{trip.destination}</h2>
                <p className="font-mono">
                    {`${new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                </p>
            </div>
        </div>
    </motion.div>
);

const BookingPass: React.FC<BookingPassProps> = ({ booking }) => {
    const passType = {
        flight: { icon: <Plane/>, title: "Flight Pass" },
        hotel: { icon: <Hotel/>, title: "Hotel Voucher" },
        train: { icon: <Train/>, title: "Rail Ticket" },
        bus: { icon: <Bus/>, title: "Bus Ticket" },
    }[booking.type];
    return (
        <div className="flex w-full border-2 border-black dark:border-white bg-white dark:bg-black" style={{boxShadow: theme.shadows.neoBlackSmall}}>
            <div className="flex-grow p-4">
                <header className="flex items-center justify-between border-b-2 border-dashed border-black dark:border-white pb-2">
                    <div className="flex items-center gap-3">{passType.icon}<h4 className="font-bold">{passType.title}</h4></div>
                    <p className="font-mono text-xs">{booking.number || booking.confirmation}</p>
                </header>
                <div className="mt-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{booking.type === 'hotel' ? 'PROPERTY' : 'PROVIDER'}</p>
                    <h5 className="text-lg font-bold">{booking.name || booking.airline || booking.provider}</h5>
                    {booking.from && booking.to &&
                        (<div className="flex items-center gap-2 mt-2">
                            <p className="font-black text-2xl">{booking.from}</p>
                            <ArrowRight className="h-5 w-5 text-gray-400"/>
                            <p className="font-black text-2xl">{booking.to}</p>
                        </div>)
                    }
                    <p className="text-sm mt-2">{booking.details}</p>
                </div>
                <div className="mt-4"><Barcode /></div>
            </div>
            <div className="flex-shrink-0 w-32 flex flex-col justify-around text-center border-l-2 border-dashed border-black dark:border-white bg-gray-50 dark:bg-gray-900/50 p-2">
                {booking.gate && <StubField label="GATE" value={booking.gate} />}
                {booking.zone && <StubField label="ZONE" value={booking.zone} />}
                {booking.platform && <StubField label="PLATFORM" value={booking.platform} />}
                {booking.coach && <StubField label="COACH" value={booking.coach} />}
                {booking.checkIn && <StubField label="CHECK-IN" value={new Date(booking.checkIn).toLocaleDateString('en-US', {day: '2-digit', month: 'short'})} />}
                {booking.checkOut && <StubField label="CHECK-OUT" value={new Date(booking.checkOut).toLocaleDateString('en-US', {day: '2-digit', month: 'short'})} />}
                {booking.date && <StubField label="DATE" value={new Date(booking.date).toLocaleDateString('en-US', {day: '2-digit', month: 'short'})} />}
            </div>
        </div>
    );
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({ item }) => (
    <div className="flex w-full border-2 border-black dark:border-white bg-white dark:bg-black" style={{boxShadow: theme.shadows.neoBlackSmall}}>
        <div className="flex-grow p-4">
            <header className="flex items-center gap-3 border-b-2 border-dashed border-black dark:border-white pb-2">
                <ChevronsRight className="h-5 w-5"/> 
                <h4 className="font-bold">{item.title}</h4>
            </header>
            <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
        </div>
        <div className="flex-shrink-0 w-32 flex flex-col justify-center text-center border-l-2 border-dashed border-black dark:border-white bg-gray-50 dark:bg-gray-900/50 p-2">
            <StubField label="DAY" value={item.day} />
        </div>
    </div>
);

const CompanionCard: React.FC<CompanionCardProps> = ({ companion }) => (
    <div className="flex w-full border-2 border-black dark:border-white bg-white dark:bg-black" style={{boxShadow: theme.shadows.neoBlackSmall}}>
        <div className="flex-grow p-4 flex items-center gap-4">
            <UserCircle className="h-10 w-10 flex-shrink-0"/> 
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">COMPANION</p>
                <h5 className="text-lg font-bold">{companion.name}</h5>
            </div>
        </div>
        <div className="flex-shrink-0 w-32 flex flex-col justify-center text-center border-l-2 border-dashed border-black dark:border-white bg-gray-50 dark:bg-gray-900/50 p-2">
        </div>
    </div>
);

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry }) => (
    <div className="flex w-full border-2 border-black dark:border-white bg-white dark:bg-black" style={{boxShadow: theme.shadows.neoBlackSmall}}>
        <div className="flex-grow p-4">
            <header className="flex items-center gap-3 border-b-2 border-dashed border-black dark:border-white pb-2">
                <BookOpen className="h-5 w-5"/> 
                <h4 className="font-bold">Journal Entry</h4>
            </header>
            <div className="mt-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">&quot;{entry.entry}&quot;</p>
            </div>
        </div>
        <div className="flex-shrink-0 w-32 flex flex-col justify-center text-center border-l-2 border-dashed border-black dark:border-white bg-gray-50 dark:bg-gray-900/50 p-2">
            <StubField label="DATE" value={new Date(entry.date).toLocaleDateString('en-US', {day: '2-digit', month: 'short'})} />
        </div>
    </div>
);

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onClick }) => (
    <motion.div
        onClick={onClick}
        className="relative bg-white dark:bg-black border-2 border-black dark:border-white p-2 flex flex-col gap-2 group cursor-pointer"
        style={{ boxShadow: theme.shadows.neoBlackSmall }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ transform: "translate(-4px, -4px)", boxShadow: theme.shadows.neoBlack }}
        whileTap={{ transform: "translate(0px, 0px)", boxShadow: theme.shadows.neoBlackSmall }}
        transition={{ duration: 0.1 }}
    >
        <div className="w-full aspect-square bg-gray-200 overflow-hidden">
            <Image src={memory.src} alt={memory.caption} width={400} height={400} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <p className="text-xs font-bold text-center text-black dark:text-white truncate">
            {memory.caption}
        </p>
    </motion.div>
);

const TripDetailView: React.FC<TripDetailViewProps> = ({ trip, onDeselect, onShowSlideshow }) => (
    <motion.div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto font-mono"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
        <div className="relative min-h-screen">
            <motion.div layoutId={`card-image-${trip.id}`} className="h-[50vh] w-full relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${trip.coverImage})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80" />
            </motion.div>
            <motion.button 
                onClick={onDeselect} 
                className="absolute top-8 left-8 z-20 flex items-center justify-center bg-white dark:bg-black border-2 border-black dark:border-white p-3 text-black dark:text-white"
                style={{boxShadow: theme.shadows.neoBlackSmall}}
                whileHover={{ transform: "translate(-4px, -4px)", boxShadow: theme.shadows.neoBlack }}
                whileTap={{ transform: "translate(0px, 0px)", boxShadow: theme.shadows.neoBlackSmall }}
            >
                <ArrowLeft />
            </motion.button>
            <div className="relative max-w-7xl mx-auto p-8 -mt-32 z-10">
                <motion.div layoutId={`card-container-${trip.id}`}
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}>
                    <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-8"
                        style={{boxShadow: theme.shadows.neoBlack}}>
                        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b-2 border-dashed border-black dark:border-white mb-8">
                            <div>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white">{trip.destination}</h1>
                                <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">{trip.country}</p>
                            </div>
                            <div className="text-left md:text-right mt-4 md:mt-0">
                                <p className="font-bold">{new Date(trip.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    to {new Date(trip.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </header>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-4">
                                <SectionHeader icon={<Paperclip />} title="Bookings" />
                                <div className="space-y-6">
                                    {trip.bookings.map((b, i) => <BookingPass key={i} booking={b} />)}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <SectionHeader icon={<ChevronsRight />} title="Itinerary" />
                                <div className="space-y-6">
                                    {trip.itinerary.map((item, i) => <ItineraryCard key={i} item={item} />)}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <SectionHeader icon={<Users />} title="Companions" />
                                <div className="space-y-6">
                                    {trip.companions.map((c, i) => <CompanionCard key={i} companion={c} />)}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <SectionHeader icon={<BookOpen />} title="Trip Journal" />
                                <div className="space-y-6">
                                    {trip.journal.map((j, i) => <JournalEntryCard key={i} entry={j} />)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t-2 border-dashed border-black dark:border-white">
                            <SectionHeader icon={<Camera />} title="Memories" />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                                {trip.memories.map((memory, index) => (
                                    <MemoryCard
                                        key={memory.id}
                                        memory={memory}
                                        onClick={() => onShowSlideshow(trip.memories, index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.div>
);

const CreativeSlideshow: React.FC<CreativeSlideshowProps> = ({ memories, onClose, startIndex }) => {
    const [index, setIndex] = useState(startIndex);
    const handleNext = () => setIndex((prev) => (prev + 1) % memories.length);
    const handlePrev = () => setIndex((prev) => (prev - 1 + memories.length) % memories.length);

    return (
        <motion.div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center font-mono backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={onClose}
                className="absolute top-6 right-6 text-white bg-black/70 p-3 z-50 border-2 border-white/50 hover:border-white transition-colors">
                <X/>
            </button>
            <div className="relative w-full max-w-lg h-[70vh] flex items-center justify-center">
                <AnimatePresence>
                    {memories.map((memory, i) => {
                        const position = i - index;
                        const isCurrent = position === 0;
                        const isOffscreen = Math.abs(position) > 1;
                        return (
                            <motion.div
                                key={memory.id}
                                className="absolute w-[90%] max-w-[400px] h-[90%] max-h-[600px] bg-white border-2 border-black p-4 flex flex-col"
                                style={{boxShadow: theme.shadows.neoBlack}}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isCurrent ? 1 : 0.85,
                                    x: `${position * 50}%`,
                                    opacity: isOffscreen ? 0 : 1,
                                    zIndex: memories.length - Math.abs(position),
                                    rotate: isCurrent ? 0 : (position > 0 ? 10 : -10)
                                }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    if (offset.x < -100 || velocity.x < -500) handleNext();
                                    else if (offset.x > 100 || velocity.x > 500) handlePrev();
                                }}
                            >
                                <div className="bg-gray-200 flex-grow relative">
                                    <Image src={memory.src} alt={memory.caption} layout="fill" className="absolute inset-0 w-full h-full object-contain"/>
                                </div>
                                <p className="text-center font-bold text-black mt-4">{memory.caption}</p>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            <div className="flex items-center gap-4 mt-8 z-20">
                <motion.button onClick={handlePrev}
                    className="text-black bg-white border-2 border-black py-2 px-4"
                    style={{boxShadow: theme.shadows.neoBlackSmall}}
                    whileHover={{ transform: "translate(-4px, -4px)", boxShadow: theme.shadows.neoBlack }}
                    whileTap={{ transform: "translate(0px, 0px)", boxShadow: theme.shadows.neoBlackSmall }}>
                    PREV
                </motion.button>
                <p className="text-white font-bold">{index + 1} / {memories.length}</p>
                <motion.button onClick={handleNext}
                    className="text-black bg-white border-2 border-black py-2 px-4"
                    style={{boxShadow: theme.shadows.neoBlackSmall}}
                    whileHover={{ transform: "translate(-4px, -4px)", boxShadow: theme.shadows.neoBlack }}
                    whileTap={{ transform: "translate(0px, 0px)", boxShadow: theme.shadows.neoBlackSmall }}>
                    NEXT
                </motion.button>
            </div>
        </motion.div>
    );
};

// --- MAIN MEMORIES CARD COMPONENT --- //

interface MemoriesCardProps {
    data: Trip[];
}

const MemoriesCard = ({ data }: MemoriesCardProps) => {
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [slideshowState, setSlideshowState] = useState<{ show: boolean; memories: Memory[]; startIndex: number }>({ show: false, memories: [], startIndex: 0 });

    const handleSelectTrip = (trip: Trip) => setSelectedTrip(trip);
    const handleDeselectTrip = () => setSelectedTrip(null);
    const handleShowSlideshow = (memories: Memory[], startIndex = 0) => setSlideshowState({ show: true, memories, startIndex });
    const handleCloseSlideshow = () => setSlideshowState({ show: false, memories: [], startIndex: 0 });

    useEffect(() => {
        document.body.style.overflow = (selectedTrip || slideshowState.show) ? 'hidden' : 'auto';
    }, [selectedTrip, slideshowState.show]);

    return (
        <main className="min-h-screen w-full bg-white dark:bg-black p-4 sm:p-8 font-mono text-black dark:text-white"
            style={{'--neo-lime': theme.colors.neoLime} as React.CSSProperties}>
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tighter flex items-center gap-4">
                        <ChevronsRight className="w-12 h-12 text-[var(--neo-lime)]" /> Your Memories
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        A collection of your past adventures. Click a card to relive the journey.
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map(trip => (
                        <TravelCard key={trip.id} trip={trip} onSelect={handleSelectTrip} />
                    ))}
                </div>
            </div>
            <AnimatePresence>
                {selectedTrip && (
                    <TripDetailView trip={selectedTrip} onDeselect={handleDeselectTrip} onShowSlideshow={handleShowSlideshow} />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {slideshowState.show && (
                    <CreativeSlideshow memories={slideshowState.memories} onClose={handleCloseSlideshow} startIndex={slideshowState.startIndex} />
                )}
            </AnimatePresence>
        </main>
    );
};

export default MemoriesCard;
