'use client';

import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/sections/AdminNavbar';
import { supabase } from '@/lib/supabase';

export default function InquiriesPage() {
  const [activeFilter, setActiveFilter] = useState('New');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Reply Modal States
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function fetchInquiries() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setInquiries(data);
      }
      setIsLoading(false);
    }
    fetchInquiries();
  }, []);

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;
    setIsSending(true);

    try {
      // 1. Send Email via Next.js API Route (Resend)
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedInquiry.email,
          subject: `Re: Your Safari Inquiry at Goshen Camp`,
          message: replyMessage,
          guestName: selectedInquiry.name
        })
      });

      const emailResponse = await res.json();

      if (!emailResponse.success) {
        throw new Error("Email dispatch failed.");
      }

      // 2. Update Supabase Status to 'Replied'
      const { error: dbError } = await supabase
        .from('inquiries')
        .update({ status: 'Replied' })
        .eq('id', selectedInquiry.id);

      if (dbError) throw dbError;

      // 3. Update Local UI
      setInquiries(inquiries.map(inq => inq.id === selectedInquiry.id ? { ...inq, status: 'Replied' } : inq));
      setSelectedInquiry(null);
      setReplyMessage('');
      
    } catch (error) {
      console.error("Reply Error:", error);
      alert("Failed to send reply. Please check your network and Resend configuration.");
    } finally {
      setIsSending(false);
    }
  };

  const filteredInquiries = activeFilter === 'All' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === activeFilter);

  const newCount = inquiries.filter(inq => inq.status === 'New').length;

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#2C2A25] selection:bg-[#591C27] selection:text-[#F4F1EB] flex flex-col relative">
      <AdminNavbar />
      
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[#2C2A25]/10 pb-8">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-[#2C2A25] mb-4">
              The Inbox
            </h1>
            <p className="font-sans text-sm tracking-wide text-[#2C2A25]/70">
              Review and reply to guest booking requests directly.
            </p>
          </div>
          
          <div className="flex items-center gap-6 font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50">
            {['New', 'Pending', 'Replied', 'All'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveFilter(tab)}
                className={`pb-1 transition-colors ${activeFilter === tab ? 'text-[#591C27] border-b border-[#591C27]' : 'hover:text-[#2C2A25]'}`}
              >
                {tab} {tab === 'New' && newCount > 0 && <span className="ml-1 text-[#591C27]">({newCount})</span>}
              </button>
            ))}
          </div>
        </header>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-32">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 animate-pulse">
              Syncing Inbox...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredInquiries.length === 0 ? (
              <div className="py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#2C2A25]/15">
                <div className="w-12 h-12 mb-4 text-[#2C2A25]/20">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <h2 className="font-serif text-2xl text-[#2C2A25] mb-2">Inbox Clear</h2>
                <p className="font-sans text-xs text-[#2C2A25]/50 tracking-widest uppercase">
                  No {activeFilter.toLowerCase()} inquiries found.
                </p>
              </div>
            ) : (
              filteredInquiries.map((inquiry) => (
                <div 
                  key={inquiry.id} 
                  className={`bg-transparent border ${inquiry.status === 'New' ? 'border-[#591C27]/30 bg-white' : 'border-[#2C2A25]/15'} p-6 md:p-10 hover:border-[#2C2A25]/30 transition-colors group relative flex flex-col md:flex-row gap-10 md:gap-16 animate-fade-in`}
                >
                  {inquiry.status === 'New' && <div className="absolute top-0 left-0 w-1 h-full bg-[#591C27]"></div>}

                  <div className="w-full md:w-64 flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h2 className="font-serif text-2xl text-[#2C2A25] mb-2">{inquiry.name}</h2>
                      <p className="font-sans text-xs text-[#2C2A25]/70 mb-1">{inquiry.email}</p>
                      <p className="font-sans text-xs text-[#2C2A25]/70">{inquiry.phone || 'No phone provided'}</p>
                    </div>
                    <div className="mt-6 md:mt-0">
                      <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#591C27] mb-1 block">
                        {inquiry.request_type}
                      </span>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#2C2A25]/50">
                        Received {new Date(inquiry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col border-t md:border-t-0 md:border-l border-[#2C2A25]/10 pt-6 md:pt-0 md:pl-10">
                    <div className="flex flex-wrap gap-8 mb-6">
                      <div>
                        <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 mb-1">Requested Dates</p>
                        <p className="font-serif text-lg">
                          {inquiry.arrival_date ? `${new Date(inquiry.arrival_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(inquiry.departure_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Flexible'}
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 mb-1">Party Size</p>
                        <p className="font-serif text-lg">
                          {inquiry.adults > 0 ? `${inquiry.adults} Adults, ${inquiry.children} Ch` : 'Not specified'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/50 mb-3">Message</p>
                      <p className="font-sans text-sm leading-relaxed text-[#2C2A25]/80 italic line-clamp-2">
                        "{inquiry.message}"
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-32 flex-shrink-0 flex md:flex-col justify-end md:justify-between items-center md:items-end border-t md:border-t-0 md:border-l border-[#2C2A25]/10 pt-6 md:pt-0 md:pl-6">
                    <span className={`font-sans text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 border mb-4 hidden md:block ${inquiry.status === 'New' ? 'border-[#591C27] text-[#591C27]' : 'border-transparent text-[#2C2A25]/40'}`}>
                      {inquiry.status}
                    </span>
                    <button 
                      onClick={() => {
                        setSelectedInquiry(inquiry);
                        setReplyMessage(`Thank you for your interest in Goshen Safari Camp.\n\nRegarding your dates for ${inquiry.arrival_date ? new Date(inquiry.arrival_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : 'your safari'}: `);
                      }}
                      className="w-full md:w-auto font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#2C2A25] text-[#F4F1EB] px-6 py-4 hover:bg-[#591C27] transition-colors text-center"
                    >
                      {inquiry.status === 'Replied' ? 'View & Reply Again' : 'Read & Reply'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ============================== REPLY MODAL ============================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#1A1817]/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F4F1EB] w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-[#2C2A25] p-6 sm:p-8 flex justify-between items-start text-[#F4F1EB] flex-shrink-0">
              <div>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#F4F1EB]/50 mb-2 block">
                  Replying to: {selectedInquiry.email}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl">{selectedInquiry.name}</h2>
              </div>
              <button onClick={() => { setSelectedInquiry(null); setReplyMessage(''); }} className="text-[#F4F1EB]/50 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col gap-8">
              <div>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 mb-3">Original Message</p>
                <div className="bg-[#2C2A25]/5 p-5 border-l-2 border-[#591C27] font-sans text-sm leading-relaxed text-[#2C2A25]/80 italic">
                  "{selectedInquiry.message}"
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/40 mb-3 block">
                  Your Reply (Sends from info@goshencamp.com)
                </label>
                <textarea 
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="w-full flex-1 min-h-[200px] bg-white border border-[#2C2A25]/20 p-5 font-serif text-lg focus:outline-none focus:border-[#591C27] transition-colors resize-none placeholder:text-[#2C2A25]/30"
                  placeholder="Draft your reply here..."
                ></textarea>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#2C2A25]/5 border-t border-[#2C2A25]/10 flex justify-end flex-shrink-0">
              <button 
                disabled={isSending || !replyMessage.trim()}
                onClick={handleSendReply}
                className="w-full sm:w-auto font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#591C27] text-[#F4F1EB] px-8 py-4 hover:bg-[#2C2A25] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSending ? 'Transmitting...' : 'Send Message'}
                {!isSending && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>}
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}