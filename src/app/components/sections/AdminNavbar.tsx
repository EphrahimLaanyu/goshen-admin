import React from 'react';
import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <nav className="w-full bg-[#F4F1EB] border-b border-[#2C2A25]/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#2C2A25]">
            Goshen <span className="italic font-light text-[#591C27]">Desk</span>
          </span>
          <span className="font-sans text-[8px] tracking-[0.3em] uppercase font-bold text-[#2C2A25]/50 mt-1">
            Reservations & Operations
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#2C2A25]/60">
          <Link href="/" className="text-[#591C27] border-b border-[#591C27] pb-1">Overview</Link>
          <Link href="/calendar" className="hover:text-[#2C2A25] transition-colors pb-1">Calendar</Link>
          <Link href="/inquiries" className="hover:text-[#2C2A25] transition-colors pb-1">Inquiries</Link>
          <Link href="/access" className="hover:text-[#2C2A25] transition-colors pb-1">Access</Link>
        </div>

        {/* Status & Profile */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#591C27] animate-pulse"></span>
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/60">System Live</span>
          </div>
          <button className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25] border border-[#2C2A25]/20 px-5 py-2.5 hover:bg-[#2C2A25] hover:text-[#F4F1EB] transition-colors">
            Log Out
          </button>
        </div>
        
      </div>
    </nav>
  );
}