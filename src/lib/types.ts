export type InquiryStatus = "New" | "Pending" | "Contacted" | "Converted" | "Archived";

export interface Inquiry {
  id: string;
  dateReceived: string;
  timeAgo: string;
  guestName: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  partySize: number;
  suiteInterest: "Tent 01" | "Tent 02" | "Tent 03" | "The Pavilion" | "Full Camp Buyout" | "Any Available";
  status: InquiryStatus;
  vipTier?: "First-Time Explorer" | "Return Patron" | "Ultra-VIP Patron";
  specialRequests?: string[];
  message: string;
  budgetEst: string;
  source: string;
  assignedGuide?: string;
}

export type BookingStatus = "Confirmed" | "Pending" | "In-House" | "Maintenance";

export interface Booking {
  id: string;
  accommodationId: string;
  accommodationName: string;
  guestName: string;
  guestEmail: string;
  partySize: number;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  status: BookingStatus;
  ratePerNight: number;
  totalAmount: number;
  leadGuide: string;
  transferMethod: string;
  dietaryNotes: string;
  specialOccasion?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  code: string;
  category: "Luxury Canvas Suite" | "Presidential Villa";
  capacity: number;
  ratePerNight: number;
  features: string[];
}

export interface UpcomingArrival {
  id: string;
  guestName: string;
  suite: string;
  suiteCode: string;
  partySize: number;
  arrivalWindow: "Today" | "Tomorrow" | "In 2 Days" | "In 3 Days";
  arrivalTime: string;
  transferType: "Helicopter Charter" | "Cessna Caravan Airstrip" | "Overland 4x4 Cruiser";
  guide: string;
  notes: string;
  dietarySummary: string;
}

export interface DayAvailability {
  date: string;
  dayName: string;
  isToday: boolean;
  occupancyPercent: number;
  suites: {
    suiteId: string;
    suiteName: string;
    status: "Occupied" | "Reserved" | "Available" | "Turnover";
  }[];
}
