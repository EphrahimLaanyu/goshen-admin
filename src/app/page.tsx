import React from 'react';
import Link from 'next/link';
import AdminNavbar from './components/sections/AdminNavbar';

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#2C2A25] selection:bg-[#591C27] selection:text-[#F4F1EB] flex flex-col">
      <AdminNavbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 w-full max-w-5xl mx-auto">
        
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase text-[#2C2A25] mb-16 md:mb-24 text-center">
          Admin Console
        </h1>

        {/* 3-Column Grid for perfect centering */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full">
          
          {/* CARD 1: THE DIARY */}
          <Link href="/calendar" className="group bg-[#2C2A25] aspect-square flex flex-col items-center justify-center p-8 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F4F1EB" strokeWidth="1.5" className="mb-8 group-hover:scale-110 transition-transform duration-300 opacity-90">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <h2 className="font-sans text-sm tracking-[0.2em] uppercase font-bold text-[#F4F1EB] mb-3">
              Calendar
            </h2>
            <p className="font-serif text-sm italic text-[#F4F1EB]/60 text-center">
              Manage Bookings
            </p>
          </Link>

          {/* CARD 2: INBOX (WITH NOTIFICATION) */}
          <Link href="/inquiries" className="group bg-[#2C2A25] aspect-square flex flex-col items-center justify-center p-8 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl relative">
            <div className="relative mb-8 group-hover:scale-110 transition-transform duration-300 opacity-90">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F4F1EB" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              

            </div>
            <h2 className="font-sans text-sm tracking-[0.2em] uppercase font-bold text-[#F4F1EB] mb-3">
              Inbox
            </h2>
            <p className="font-serif text-sm italic text-[#C5A059] font-bold text-center">
              Inquiries
            </p>
          </Link>

          {/* CARD 3: ACCESS */}
          <Link href="/access" className="group bg-[#2C2A25] aspect-square flex flex-col items-center justify-center p-8 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F4F1EB" strokeWidth="1.5" className="mb-8 group-hover:scale-110 transition-transform duration-300 opacity-90">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <h2 className="font-sans text-sm tracking-[0.2em] uppercase font-bold text-[#F4F1EB] mb-3">
              System Access
            </h2>
            <p className="font-serif text-sm italic text-[#F4F1EB]/60 text-center">
              Manage Team Roles
            </p>
          </Link>

        </div>
      </div>
    </main>
  );
}