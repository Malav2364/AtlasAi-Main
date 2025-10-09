"use client";

import MemoriesCard from '@/components/memories';
import { Trip } from '@/types';

// This is a placeholder for where you might fetch real trip data
const dummyTrips: Trip[] = [
    {
        id: 1,
        destination: "Kyoto, Japan",
        country: "Japan",
        airportCode: "KIX",
        startDate: "2024-04-10",
        endDate: "2024-04-18",
        coverImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
        companions: [{ name: "John Doe" }],
        bookings: [
            { type: 'flight', airline: 'Japan Airlines', from: 'SFO', to: 'KIX', number: 'JL001', details: 'Economy Class' },
            { type: 'hotel', name: 'The Ritz-Carlton, Kyoto', checkIn: '2024-04-10', checkOut: '2024-04-18', confirmation: '88292992', details: 'Deluxe Room' }
        ],
        itinerary: [{ day: 1, title: 'Arrive in Kyoto', description: 'Check into the hotel and explore Gion.' }],
        journal: [{ date: '2024-04-11', entry: 'Visited the Golden Pavilion. It was breathtaking.' }],
        memories: [
            { id: 'mem1', src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop', caption: 'Fushimi Inari Shrine' },
            { id: 'mem2', src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop', caption: 'Arashiyama Bamboo Grove' }
        ]
    },
    // Add more trips if you want
];

export default function MemoriesPage() {
    return (
        <div className="w-full">
            <MemoriesCard data={dummyTrips} />
        </div>
    );
}
