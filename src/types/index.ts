
export interface Companion {
  name: string;
}

export interface Booking {
  type: 'flight' | 'hotel' | 'train' | 'bus';
  airline?: string;
  provider?: string;
  name?: string;
  from?: string;
  to?: string;
  number?: string;
  details: string;
  date?: string;
  gate?: string;
  zone?: string;
  checkIn?: string;
  checkOut?: string;
  confirmation?: string;
  coach?: string;
  platform?: string;
  duration?: string;
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface JournalEntry {
  date: string;
  entry: string;
}

export interface Memory {
  id: string;
  src: string;
  caption:string;
}

export interface Trip {
  id: number;
  destination: string;
  country: string;
  airportCode: string;
  startDate: string;
  endDate: string;
  coverImage: string;
  companions: Companion[];
  bookings: Booking[];
  itinerary: ItineraryItem[];
  journal: JournalEntry[];
  memories: Memory[];
}
