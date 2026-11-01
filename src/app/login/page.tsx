'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // This specific client ensures the session is saved as a Next.js cookie
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Invalid credentials.');
      setIsLoading(false);
    } else {
      router.push('/');
      router.refresh(); 
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F1EB] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-[#2C2A25]/15 p-10 shadow-xl rounded-xl">
        <h1 className="font-serif text-3xl text-[#2C2A25] mb-2 text-center">Goshen Console</h1>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#2C2A25]/50 mb-8 text-center">Authorized Personnel Only</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 group">
            <label className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/60">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="bg-transparent border-b border-[#2C2A25]/20 pb-2 font-serif text-lg focus:outline-none focus:border-[#591C27]" 
            />
          </div>
          
          <div className="flex flex-col gap-2 group">
            <label className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#2C2A25]/60">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="bg-transparent border-b border-[#2C2A25]/20 pb-2 font-serif text-lg focus:outline-none focus:border-[#591C27]" 
            />
          </div>

          {error && <p className="font-sans text-xs text-[#591C27] font-bold text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 font-sans text-[10px] tracking-[0.2em] uppercase font-bold bg-[#2C2A25] text-[#F4F1EB] px-6 py-4 hover:bg-[#591C27] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Access Terminal'}
          </button>
        </form>
      </div>
    </main>
  );
}