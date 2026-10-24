'use client';

import React from 'react';
import AdminNavbar from '../components/sections/AdminNavbar';

export default function CalendarPage() {
  // 1. Generate a mock 14-day timeline (e.g., Oct 24 - Nov 6)
  const days = [
    { date: 24, day: 'Sat', isToday: true },
    { date: 25, day: 'Sun' }, { date: 26, day: 'Mon' }, { date: 27, day: 'Tue' },
    { date: 28, day: 'Wed' }, { date: 29, day: 'Thu' }, { date: 30, day: 'Fri' },
    { date: 31, day: 'Sat' }, { date: 1, day: 'Sun', month: 'Nov' }, { date: 2, day: 'Mon' },
    { date: 3, day: 'Tue' }, { date: 4, day: 'Wed' }, { date: 5, day: 'Thu' },
    { date: 6, day: 'Fri' },
  ];

  // 2. Define Accommodations
  const rooms = [
    { id: 'master', name: 'Master Suite', type: 'Canvas Suite' },
    { id: 'tent2', name: 'Tent 02', type: 'Luxury Double' },
    { id: 'tent3', name: 'Tent 03', type: 'Luxury Twin' },
    { id: 'pavilion', name: 'The Pavilion', type: 'Main Hub' },
  ];

  // 3. Mock Bookings (Positioned based on start index out of 14, and duration)
  const bookings = [
    { id: 1, roomId: 'master', guest: 'The Smith Family', status: 'Confirmed', startIdx: 1, duration: 4 },
    { id: 2, roomId: 'tent2', guest: 'James Holden', status: 'Pending', startIdx: 4, duration: 3 },
    { id: 3, roomId: 'tent3', guest: 'Maintenance', status: 'Blocked', startIdx: 0, duration: 2 },
    { id: 4, roomId: 'master', guest: 'Sarah Connor', status: 'Confirmed', startIdx: 7, duration: 5 },
    { id: 5, roomId: 'pavilion', guest: 'Private Retreat', status: 'Confirmed', startIdx: 6, duration: 3 },
  ];

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#2C2A25] selection:bg-[#591C27] selection:text-[#F4F1EB] flex flex-col">
      <AdminNavbar />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col">
        
        {/* Header Controls */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-[#2C2A25] mb-3">
              The Diary
            </h1>
            <p className="font-sans text-sm tracking-wide text-[#2C2A25]/70">
              October 24 — November 06, 2026
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25] border border-[#2C2A25]/20 px-5 py-3 hover:bg-[#2C2A25]/5 transition-colors">
              Previous 14 Days
            </button>
            <button className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#F4F1EB] bg-[#2C2A25] px-5 py-3 hover:bg-[#591C27] transition-colors shadow-lg">
              Next 14 Days
            </button>
          </div>
        </header>

        {/* The Timeline Board */}
        <div className="w-full bg-white/50 border border-[#2C2A25]/15 overflow-hidden flex flex-col shadow-sm">
          
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[1000px] flex flex-col">
              
              {/* Top Row: Dates */}
              <div className="flex border-b border-[#2C2A25]/15 bg-[#F4F1EB]">
                {/* Blank corner above room names */}
                <div className="w-56 shrink-0 border-r border-[#2C2A25]/15 p-4 flex items-end">
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40">Accommodation</span>
                </div>
                
                {/* Date Columns */}
                <div className="flex-1 grid grid-cols-14 relative">
                  {days.map((day, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col items-center justify-center py-4 border-r border-[#2C2A25]/10 last:border-r-0 ${day.isToday ? 'bg-[#591C27]/5' : ''}`}
                      style={{ width: `${100 / 14}%` }}
                    >
                      {day.month && <span className="absolute top-2 font-sans text-[8px] tracking-[0.2em] uppercase text-[#591C27] font-bold">{day.month}</span>}
                      <span className={`font-sans text-[10px] tracking-[0.2em] uppercase mb-1 ${day.isToday ? 'text-[#591C27] font-bold' : 'text-[#2C2A25]/50'}`}>
                        {day.day}
                      </span>
                      <span className={`font-serif text-xl ${day.isToday ? 'text-[#591C27]' : 'text-[#2C2A25]'}`}>
                        {day.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Rows: Accommodations */}
              {rooms.map((room) => (
                <div key={room.id} className="flex border-b border-[#2C2A25]/10 last:border-b-0 group">
                  
                  {/* Left Column: Room Name */}
                  <div className="w-56 shrink-0 border-r border-[#2C2A25]/15 p-4 bg-[#F4F1EB] group-hover:bg-[#2C2A25]/[0.02] transition-colors flex flex-col justify-center">
                    <p className="font-serif text-lg text-[#2C2A25]">{room.name}</p>
                    <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-[#2C2A25]/50 mt-1">{room.type}</p>
                  </div>

                  {/* Right Column: Timeline Grid */}
                  <div className="flex-1 relative bg-transparent group-hover:bg-[#2C2A25]/[0.01] transition-colors flex">
                    
                    {/* Background Grid Lines (14 days) */}
                    {days.map((_, i) => (
                      <div key={i} className="h-24 border-r border-[#2C2A25]/5 last:border-r-0" style={{ width: `${100 / 14}%` }}></div>
                    ))}

                    {/* Render Bookings for this room */}
                    {bookings.filter(b => b.roomId === room.id).map(booking => {
                      
                      // Calculate positioning based on 14-day grid
                      const leftPos = (booking.startIdx / 14) * 100;
                      const width = (booking.duration / 14) * 100;
                      
                      // Determine styling based on status
                      let bgClass = "bg-[#2C2A25] text-[#F4F1EB]"; // Confirmed
                      if (booking.status === 'Pending') bgClass = "bg-[#F4F1EB] text-[#591C27] border border-[#591C27]";
                      if (booking.status === 'Blocked') bgClass = "bg-[#2C2A25]/10 text-[#2C2A25]/60 border border-[#2C2A25]/20 border-dashed";

                      return (
                        <div 
                          key={booking.id}
                          className={`absolute top-3 bottom-3 rounded-sm p-3 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity shadow-sm z-10 ${bgClass}`}
                          style={{ left: `${leftPos}%`, width: `calc(${width}% - 8px)`, marginLeft: '4px' }}
                        >
                          <p className="font-sans text-[10px] font-bold tracking-widest uppercase truncate">
                            {booking.guest}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-sans text-[8px] tracking-[0.2em] uppercase opacity-70">
                              {booking.status}
                            </span>
                            <span className="font-serif italic text-xs opacity-90">
                              {booking.duration}N
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center gap-8 justify-end border-t border-[#2C2A25]/10 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-[#2C2A25] rounded-sm shadow-sm"></div>
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/60">Confirmed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-[#F4F1EB] border border-[#591C27] rounded-sm shadow-sm"></div>
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/60">Pending</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-[#2C2A25]/10 border border-[#2C2A25]/20 border-dashed rounded-sm"></div>
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/60">Blocked / Maintenance</span>
          </div>
        </div>

      </div>
    </main>
  );
}