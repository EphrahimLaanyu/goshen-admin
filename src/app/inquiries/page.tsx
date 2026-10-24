'use client';

import React, { useState } from 'react';
import AdminNavbar from '../components/sections/AdminNavbar';

export default function InquiriesPage() {
  const [activeFilter, setActiveFilter] = useState('New');

  // Mock Web3Forms Data
  const inquiries = [
    {
      id: 'INQ-001',
      guestName: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      phone: '+44 7700 900077',
      dates: 'Dec 12 - Dec 16, 2026',
      guests: '2 Adults',
      message: 'Looking to book a 4-night stay in early December for my husband and I to celebrate our 10th anniversary. We would love the Master Canvas Suite if it is available. Do you arrange transfers from Nanyuki airstrip?',
      status: 'New',
      receivedAt: '2 hours ago',
    },
    {
      id: 'INQ-002',
      guestName: 'Sarah Connor',
      email: 's.connor@example.com',
      phone: '+1 310 555 0199',
      dates: 'Flexible (Jan 2027)',
      guests: '8 Adults, 4 Children',
      message: 'We are interested in an exclusive camp buyout for our family retreat next year. Could you provide a sample itinerary and buyout rates?',
      status: 'Pending',
      receivedAt: 'Yesterday',
    },
    {
      id: 'INQ-003',
      guestName: 'James Holden',
      email: 'j.holden@rocinante.com',
      phone: 'Not provided',
      dates: 'Nov 01 - Nov 05, 2026',
      guests: '2 Adults, 2 Children',
      message: 'Hi there, inquiring about availability for the first week of November. Are children under 12 allowed on the walking safaris?',
      status: 'Replied',
      receivedAt: 'Oct 22, 2026',
    },
  ];

  // Filter logic
  const filteredInquiries = activeFilter === 'All' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === activeFilter);

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#2C2A25] selection:bg-[#591C27] selection:text-[#F4F1EB] flex flex-col">
      <AdminNavbar />

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        
        {/* Header & Filters */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[#2C2A25]/10 pb-8">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-[#2C2A25] mb-4">
              The Inbox
            </h1>
            <p className="font-sans text-sm tracking-wide text-[#2C2A25]/70">
              Review and manage guest booking requests.
            </p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-6 font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50">
            {['New', 'Pending', 'Replied', 'All'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`pb-1 transition-colors ${
                  activeFilter === tab 
                    ? 'text-[#591C27] border-b border-[#591C27]' 
                    : 'hover:text-[#2C2A25]'
                }`}
              >
                {tab} {tab === 'New' && <span className="ml-1 text-[#591C27]">(1)</span>}
              </button>
            ))}
          </div>
        </header>

        {/* Inquiries List */}
        <div className="flex flex-col gap-6">
          {filteredInquiries.length === 0 ? (
            <div className="py-20 text-center text-[#2C2A25]/50 font-sans text-xs tracking-widest uppercase">
              No {activeFilter.toLowerCase()} inquiries found.
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className="bg-transparent border border-[#2C2A25]/15 p-6 md:p-10 hover:border-[#2C2A25]/30 transition-colors group relative flex flex-col md:flex-row gap-10 md:gap-16"
              >
                
                {/* 1. Status Indicator (Absolute on mobile, relative on desktop) */}
                {inquiry.status === 'New' && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#591C27]"></div>
                )}

                {/* 2. Guest Info (Left Column) */}
                <div className="w-full md:w-64 flex-shrink-0 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif text-2xl text-[#2C2A25] mb-2">{inquiry.guestName}</h2>
                    <p className="font-sans text-xs text-[#2C2A25]/70 mb-1">{inquiry.email}</p>
                    <p className="font-sans text-xs text-[#2C2A25]/70">{inquiry.phone}</p>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#2C2A25]/50">
                      Received {inquiry.receivedAt}
                    </p>
                  </div>
                </div>

                {/* 3. Safari Details & Message (Middle Column) */}
                <div className="flex-1 flex flex-col border-t md:border-t-0 md:border-l border-[#2C2A25]/10 pt-6 md:pt-0 md:pl-10">
                  
                  {/* Quick Specs */}
                  <div className="flex flex-wrap gap-8 mb-6">
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 mb-1">Requested Dates</p>
                      <p className="font-serif text-lg">{inquiry.dates}</p>
                    </div>
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 mb-1">Party Size</p>
                      <p className="font-serif text-lg">{inquiry.guests}</p>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 mb-3">Additional Details</p>
                    <p className="font-sans text-sm leading-relaxed text-[#2C2A25]/80 italic">
                      "{inquiry.message}"
                    </p>
                  </div>
                </div>

                {/* 4. Actions (Right Column) */}
                <div className="w-full md:w-32 flex-shrink-0 flex md:flex-col justify-end md:justify-between items-center md:items-end border-t md:border-t-0 md:border-l border-[#2C2A25]/10 pt-6 md:pt-0 md:pl-6">
                  
                  <span className={`font-sans text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 border mb-4 hidden md:block ${
                    inquiry.status === 'New' ? 'border-[#591C27] text-[#591C27]' : 
                    inquiry.status === 'Pending' ? 'border-[#2C2A25]/30 text-[#2C2A25]/70' : 
                    'border-transparent text-[#2C2A25]/40'
                  }`}>
                    {inquiry.status}
                  </span>

                  <button className="w-full md:w-auto font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#2C2A25] text-[#F4F1EB] px-6 py-4 hover:bg-[#591C27] transition-colors text-center">
                    Reply
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}