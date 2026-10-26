'use client';

import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/sections/AdminNavbar';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function CalendarPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedFilter, setFeedFilter] = useState<'All' | 'Pending'>('All');
  
  // Admin Action States
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Block Dates States
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockForm, setBlockForm] = useState({ start: '', end: '', reason: 'Camp Maintenance' });
  const [isSubmittingBlock, setIsSubmittingBlock] = useState(false);

  // Fetch bookings on mount
  useEffect(() => {
    async function fetchBookings() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('arrival_date', { ascending: true });
      
      if (!error && data) {
        setBookings(data);
      }
      setIsLoading(false);
    }
    fetchBookings();
  }, []);

  // Handle Status Updates (Modal)
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert("Failed to update status. Check your database permissions.");
    } else {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      setSelectedBooking(null);
    }
    setIsUpdating(false);
  };

  // Handle Blocking Dates
  const handleBlockDates = async () => {
    if (!blockForm.start || !blockForm.end) return;
    setIsSubmittingBlock(true);

    const newBlock = {
      guest_name: 'Admin Blocked Dates',
      email: 'admin@goshencamp.com',
      phone: 'N/A',
      arrival_date: blockForm.start,
      departure_date: blockForm.end,
      adults: 0,
      children: 0,
      status: 'Blocked',
      special_requests: blockForm.reason
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([newBlock])
      .select();

    if (error) {
      alert("Failed to block dates.");
    } else if (data) {
      // Add to UI and sort by date
      const updatedBookings = [...bookings, data[0]].sort((a, b) => 
        new Date(a.arrival_date).getTime() - new Date(b.arrival_date).getTime()
      );
      setBookings(updatedBookings);
      setIsBlockModalOpen(false);
      setBlockForm({ start: '', end: '', reason: 'Camp Maintenance' });
    }
    setIsSubmittingBlock(false);
  };

  // Date Logic
  const now = new Date();
  const currentMonthName = now.toLocaleString('default', { month: 'long' });
  
  const currentMonthBookings = bookings.filter(b => {
    const arrival = new Date(b.arrival_date);
    return arrival.getMonth() === now.getMonth() && arrival.getFullYear() === now.getFullYear();
  });

  const feedBookings = feedFilter === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === 'Pending');

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#2C2A25] selection:bg-[#591C27] selection:text-[#F4F1EB] flex flex-col relative">
      <AdminNavbar />

      <div className="flex-1 w-full max-w-[1400px] mx-auto flex flex-col">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-6 md:px-12 py-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 hover:text-[#591C27] transition-colors">
                ← Back to Console
              </Link>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-[#2C2A25] mb-2">
              The Diary
            </h1>
            <p className="font-sans text-sm tracking-wide text-[#2C2A25]/70">
              General Camp Bookings & Availability
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setIsBlockModalOpen(true)}
              className="w-full sm:w-auto font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-transparent border border-[#2C2A25]/20 text-[#2C2A25] px-6 py-4 hover:bg-[#2C2A25]/5 transition-colors flex items-center justify-center gap-3 shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
              Block Dates
            </button>
            <button className="w-full sm:w-auto font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#2C2A25] text-[#F4F1EB] px-6 py-4 hover:bg-[#591C27] transition-colors flex items-center justify-center gap-3 shadow-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Manual Entry
            </button>
          </div>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center py-32 border-t border-[#2C2A25]/15">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 animate-pulse">
              Syncing Ledger...
            </p>
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col lg:flex-row flex-1 border-t-2 border-[#2C2A25]/15">
            
            {/* ============================== LEFT HALF: THIS MONTH ============================== */}
            <div className="w-full lg:w-[55%] xl:w-[60%] px-6 md:px-12 py-10 flex flex-col gap-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-3xl text-[#2C2A25]">{currentMonthName} Itinerary</h2>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 bg-[#2C2A25]/5 px-4 py-2 rounded-full">
                  {currentMonthBookings.length} Bookings
                </span>
              </div>

              {currentMonthBookings.length === 0 ? (
                <div className="border-2 border-dashed border-[#2C2A25]/15 py-32 px-6 flex flex-col items-center justify-center text-center bg-white/50 rounded-xl">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#2C2A25]/30 mb-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <h3 className="font-serif text-2xl text-[#2C2A25] mb-2">No bookings this month</h3>
                  <p className="font-sans text-sm text-[#2C2A25]/60">Your calendar is currently clear for {currentMonthName}.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {currentMonthBookings.map(booking => {
                    const isBlocked = booking.status === 'Blocked';
                    
                    return (
                      <div 
                        key={booking.id} 
                        onClick={() => setSelectedBooking(booking)}
                        className={`group border border-[#2C2A25]/15 p-6 md:p-8 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden rounded-xl ${isBlocked ? 'bg-[#2C2A25]/5 hover:border-[#2C2A25]/40 opacity-80' : 'bg-white hover:border-[#2C2A25]/30'}`}
                      >
                        {booking.status === 'Pending' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#591C27]"></div>}
                        {isBlocked && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2C2A25]"></div>}
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-2">
                          <div>
                            <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 mb-2">
                              {new Date(booking.arrival_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(booking.departure_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                            <h3 className={`font-serif text-2xl mb-1 ${isBlocked ? 'text-[#2C2A25]/70' : 'text-[#2C2A25]'}`}>{booking.guest_name}</h3>
                            <div className="flex items-center gap-3">
                              <p className="font-sans text-xs text-[#2C2A25]/70">{isBlocked ? 'Admin Action' : `${booking.adults + booking.children} Guests`}</p>
                              <span className="w-1 h-1 rounded-full bg-[#2C2A25]/20"></span>
                              <span className={`font-sans text-[9px] tracking-[0.1em] uppercase font-bold ${booking.status === 'Pending' ? 'text-[#591C27]' : isBlocked ? 'text-[#2C2A25]' : 'text-[#2C2A25]/50'}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                          <button className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold bg-[#2C2A25]/5 px-4 py-2 group-hover:bg-[#2C2A25] group-hover:text-[#F4F1EB] transition-colors md:text-right rounded-md">
                            Manage →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ============================== RIGHT HALF: AIRBNB-STYLE FEED ============================== */}
            <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#2C2A25]/[0.03] border-t-2 lg:border-t-0 lg:border-l-2 border-[#2C2A25]/15 h-[800px] flex flex-col shadow-[inset_10px_0_20px_-15px_rgba(0,0,0,0.05)]">
              
              <div className="flex items-center justify-between px-8 py-8 border-b border-[#2C2A25]/10 bg-[#2C2A25]/[0.02]">
                <h2 className="font-serif text-2xl text-[#2C2A25]">Feed</h2>
                <div className="flex gap-2 font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#F4F1EB] p-1 rounded-full border border-[#2C2A25]/15">
                  <button 
                    onClick={() => setFeedFilter('All')}
                    className={`px-4 py-2 rounded-full transition-all ${feedFilter === 'All' ? 'bg-[#2C2A25] text-[#F4F1EB] shadow-md' : 'text-[#2C2A25]/60 hover:text-[#2C2A25]'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setFeedFilter('Pending')}
                    className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${feedFilter === 'Pending' ? 'bg-[#591C27] text-[#F4F1EB] shadow-md' : 'text-[#2C2A25]/60 hover:text-[#2C2A25]'}`}
                  >
                    Pending
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="flex flex-col gap-3">
                  {feedBookings.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="font-sans text-sm text-[#2C2A25]/40 italic">No reservations match this filter.</p>
                    </div>
                  ) : (
                    feedBookings.map(booking => {
                      const isUnread = booking.status === 'Pending';
                      const isBlocked = booking.status === 'Blocked';
                      const initials = isBlocked ? 'B' : booking.guest_name.charAt(0).toUpperCase();

                      return (
                        <div 
                          key={booking.id}
                          onClick={() => setSelectedBooking(booking)}
                          className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all ${isUnread ? 'bg-white shadow-md border border-[#2C2A25]/10 hover:border-[#591C27]/50 hover:-translate-y-0.5' : isBlocked ? 'bg-[#2C2A25]/5 border border-transparent hover:border-[#2C2A25]/20 opacity-80' : 'bg-transparent border border-transparent hover:bg-[#2C2A25]/5 hover:border-[#2C2A25]/10'}`}
                        >
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl ${isUnread ? 'bg-[#591C27] text-[#F4F1EB] shadow-inner' : isBlocked ? 'bg-[#2C2A25] text-white' : 'bg-[#2C2A25]/10 text-[#2C2A25]'}`}>
                              {initials}
                            </div>
                            {isUnread && <div className="absolute top-0 right-0 w-4 h-4 bg-[#591C27] border-2 border-white rounded-full animate-pulse"></div>}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="flex justify-between items-baseline mb-1">
                              <h4 className={`font-sans text-base truncate ${isUnread ? 'font-bold text-[#2C2A25]' : isBlocked ? 'font-medium text-[#2C2A25]/70' : 'font-medium text-[#2C2A25]/80'}`}>
                                {booking.guest_name}
                              </h4>
                              <span className={`font-sans text-xs flex-shrink-0 ml-2 ${isUnread ? 'text-[#591C27] font-bold' : 'text-[#2C2A25]/50'}`}>
                                {new Date(booking.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <p className={`font-sans text-sm truncate mb-1 ${isUnread ? 'font-medium text-[#2C2A25]' : 'text-[#2C2A25]/60'}`}>
                              {booking.status}: {new Date(booking.arrival_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(booking.departure_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                            <p className="font-sans text-[11px] text-[#2C2A25]/50 truncate bg-[#2C2A25]/5 inline-block px-2 py-1 rounded">
                              {booking.special_requests ? `"${booking.special_requests}"` : isBlocked ? 'Admin' : `${booking.adults + booking.children} Guests`}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================== BLOCK DATES MODAL ============================== */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-[#1A1817]/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F4F1EB] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-[#2C2A25] p-6 flex justify-between items-center text-[#F4F1EB]">
              <h2 className="font-serif text-2xl">Block Dates</h2>
              <button onClick={() => setIsBlockModalOpen(false)} className="text-[#F4F1EB]/50 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col gap-6">
              <p className="font-sans text-sm text-[#2C2A25]/70 mb-2">
                Blocking dates will prevent any new bookings during this period.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 block mb-2">Start Date</label>
                  <input 
                    type="date" 
                    value={blockForm.start}
                    onChange={(e) => setBlockForm({...blockForm, start: e.target.value})}
                    className="w-full bg-white border border-[#2C2A25]/20 p-3 font-sans text-sm focus:outline-none focus:border-[#591C27]"
                  />
                </div>
                <div>
                  <label className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 block mb-2">End Date</label>
                  <input 
                    type="date" 
                    value={blockForm.end}
                    onChange={(e) => setBlockForm({...blockForm, end: e.target.value})}
                    className="w-full bg-white border border-[#2C2A25]/20 p-3 font-sans text-sm focus:outline-none focus:border-[#591C27]"
                  />
                </div>
              </div>

              <div>
                <label className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 block mb-2">Reason (Optional)</label>
                <input 
                  type="text" 
                  value={blockForm.reason}
                  onChange={(e) => setBlockForm({...blockForm, reason: e.target.value})}
                  placeholder="e.g., Camp Maintenance, Private Event"
                  className="w-full bg-white border border-[#2C2A25]/20 p-3 font-sans text-sm focus:outline-none focus:border-[#591C27]"
                />
              </div>
            </div>

            <div className="p-6 bg-[#2C2A25]/5 border-t border-[#2C2A25]/10 flex justify-end gap-4">
              <button 
                onClick={() => setIsBlockModalOpen(false)}
                className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25] px-6 py-3 hover:bg-[#2C2A25]/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleBlockDates}
                disabled={isSubmittingBlock || !blockForm.start || !blockForm.end}
                className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#591C27] text-[#F4F1EB] px-6 py-3 hover:bg-[#2C2A25] transition-colors disabled:opacity-50"
              >
                {isSubmittingBlock ? 'Blocking...' : 'Confirm Block'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================== MANAGE MODAL ============================== */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#1A1817]/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F4F1EB] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
            
            <div className={`p-6 sm:p-8 flex justify-between items-start text-[#F4F1EB] ${selectedBooking.status === 'Blocked' ? 'bg-[#2C2A25]' : 'bg-[#2C2A25]'}`}>
              <div>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#F4F1EB]/50 mb-2 block">
                  {selectedBooking.status === 'Blocked' ? 'System Record' : `Booking Reference: ${selectedBooking.id.split('-')[0]}`}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl">{selectedBooking.guest_name}</h2>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-[#F4F1EB]/50 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-8 mb-8">
                {selectedBooking.status !== 'Blocked' && (
                  <>
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 mb-1">Contact</p>
                      <p className="font-serif text-lg text-[#2C2A25]">{selectedBooking.email}</p>
                      <p className="font-serif text-lg text-[#2C2A25]">{selectedBooking.phone}</p>
                    </div>
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 mb-1">Party</p>
                      <p className="font-serif text-lg text-[#2C2A25]">{selectedBooking.adults} Adults, {selectedBooking.children} Children</p>
                    </div>
                  </>
                )}
                <div className="col-span-2 border-t border-[#2C2A25]/10 pt-6">
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 mb-1">Dates</p>
                  <p className="font-serif text-2xl text-[#2C2A25]">
                    {new Date(selectedBooking.arrival_date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })} 
                    <span className="text-[#2C2A25]/30 mx-3">→</span> 
                    {new Date(selectedBooking.departure_date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                {selectedBooking.special_requests && (
                  <div className="col-span-2 border-t border-[#2C2A25]/10 pt-6">
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 mb-2">
                      {selectedBooking.status === 'Blocked' ? 'Reason' : 'Special Requests'}
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-[#2C2A25]/80 italic bg-[#2C2A25]/5 p-4 border-l-2 border-[#591C27]">
                      "{selectedBooking.special_requests}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#2C2A25]/5 border-t border-[#2C2A25]/10 flex flex-wrap gap-4 items-center justify-between">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50">
                Current Status: <span className={selectedBooking.status === 'Pending' ? 'text-[#591C27]' : 'text-[#2C2A25]'}>{selectedBooking.status}</span>
              </span>
              
              <div className="flex gap-4 w-full sm:w-auto">
                {selectedBooking.status === 'Blocked' ? (
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'Cancelled')}
                    className="flex-1 sm:flex-none font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#2C2A25] text-[#F4F1EB] px-6 py-3 hover:bg-black transition-colors disabled:opacity-50"
                  >
                    Unblock Dates
                  </button>
                ) : (
                  <>
                    {selectedBooking.status !== 'Cancelled' && (
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleUpdateStatus(selectedBooking.id, 'Cancelled')}
                        className="flex-1 sm:flex-none font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25] border border-[#2C2A25]/20 px-6 py-3 hover:bg-[#2C2A25]/10 transition-colors disabled:opacity-50"
                      >
                        Cancel Booking
                      </button>
                    )}
                    {selectedBooking.status !== 'Confirmed' && (
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleUpdateStatus(selectedBooking.id, 'Confirmed')}
                        className="flex-1 sm:flex-none font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#2C2A25] text-[#F4F1EB] px-6 py-3 hover:bg-[#591C27] transition-colors disabled:opacity-50"
                      >
                        Confirm Dates
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}