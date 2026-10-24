'use client';

import React from 'react';
import AdminNavbar from '../components/sections/AdminNavbar';

export default function AccessPage() {
  // Mock Team Data
  const teamMembers = [
    {
      id: 1,
      name: 'Ephrahim L.',
      role: 'Super Admin',
      email: 'ephrahim@goshen.com',
      status: 'Active',
      initial: 'E',
      isSuper: true,
    },
    {
      id: 2,
      name: 'Reservations Desk',
      role: 'Editor',
      email: 'reservations@goshen.com',
      status: 'Active',
      initial: 'R',
      isSuper: false,
    },
    {
      id: 3,
      name: 'Camp Manager',
      role: 'Viewer',
      email: 'manager@goshen.com',
      status: 'Offline',
      initial: 'C',
      isSuper: false,
    }
  ];

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#2C2A25] selection:bg-[#591C27] selection:text-[#F4F1EB] flex flex-col">
      <AdminNavbar />

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[#2C2A25]/10 pb-8">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-[#2C2A25] mb-4">
              System Access
            </h1>
            <p className="font-sans text-sm tracking-wide text-[#2C2A25]/70">
              Manage who can view and edit Goshen operations.
            </p>
          </div>
        </header>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Render Existing Team Members */}
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-[#2C2A25] text-[#F4F1EB] p-8 flex flex-col justify-between h-[280px] group border border-transparent hover:border-[#591C27] transition-all shadow-xl"
            >
              {/* Top Row: Avatar & Status */}
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 flex items-center justify-center font-serif text-xl border ${member.isSuper ? 'border-[#C5A059] text-[#C5A059]' : 'border-[#F4F1EB]/20 text-[#F4F1EB]'}`}>
                  {member.initial}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-[#591C27] animate-pulse' : 'bg-[#F4F1EB]/30'}`}></span>
                  <span className="font-sans text-[8px] tracking-[0.2em] uppercase font-bold text-[#F4F1EB]/50">
                    {member.status}
                  </span>
                </div>
              </div>

              {/* Middle Row: Details */}
              <div className="flex-1">
                <h2 className="font-serif text-2xl text-[#F4F1EB] mb-1">{member.name}</h2>
                <p className="font-sans text-xs text-[#F4F1EB]/50 mb-3">{member.email}</p>
                <span className={`font-sans text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1 ${member.isSuper ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'bg-[#F4F1EB]/10 text-[#F4F1EB]/70'}`}>
                  {member.role}
                </span>
              </div>

              {/* Bottom Row: Actions */}
              <div className="pt-6 border-t border-[#F4F1EB]/10 flex justify-between items-center mt-4">
                <button className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#F4F1EB]/50 group-hover:text-[#F4F1EB] transition-colors">
                  Edit Access
                </button>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#F4F1EB]/30 group-hover:text-[#F4F1EB] transition-colors">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}

          {/* Add New User Card */}
          <button className="bg-transparent border-2 border-dashed border-[#2C2A25]/20 p-8 flex flex-col items-center justify-center h-[280px] hover:bg-[#2C2A25]/5 hover:border-[#2C2A25] transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#2C2A25]/10 flex items-center justify-center text-[#2C2A25] mb-4 group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <h2 className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-[#2C2A25] mb-2">
              Invite Team Member
            </h2>
            <p className="font-serif text-sm italic text-[#2C2A25]/60 text-center">
              Grant dashboard access
            </p>
          </button>

        </div>
      </div>
    </main>
  );
}