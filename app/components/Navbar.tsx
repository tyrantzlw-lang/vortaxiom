'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b border-zinc-800 bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-black font-mono text-sm font-bold">V</span>
          </div>
          <div>
            <div className="font-semibold tracking-[3px] text-lg">VORTAXIOM</div>
            <div className="text-[10px] text-zinc-500 -mt-1">COSMOLOGIE SPÉCULATIVE</div>
          </div>
        </Link>

        {/* Navigation principale */}
        <div className="flex items-center gap-8 text-sm">
          <Link href="/codex" className="hover:text-white transition-colors">Codex</Link>
          <Link href="/factions" className="hover:text-white transition-colors">Factions</Link>
          <Link href="/forum" className="hover:text-white transition-colors">Forum</Link>
          <Link href="/hors-rp" className="hover:text-white transition-colors">Hors RP</Link>
          <Link href="/rapports" className="hover:text-white transition-colors">Publications</Link>
          <Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link>
        </div>

        {/* Section droite - Auth */}
        <div className="flex items-center gap-4 text-sm">
          {status === 'loading' ? (
            <div className="text-zinc-500">...</div>
          ) : session?.user ? (
            <>
              {(session.user as any)?.role === 'admin' && (
                <Link 
                  href="/admin" 
                  className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 transition-colors font-mono tracking-wider"
                >
                  ADMIN
                </Link>
              )}
              <Link 
                href="/profil" 
                className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {(session.user as any).name || 'Profil'}
              </Link>
              <Link 
                href="/profil" 
                className="px-4 py-1.5 text-sm border border-zinc-700 hover:bg-zinc-900 rounded transition-colors"
              >
                Mon Profil
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="px-4 py-1.5 text-sm border border-zinc-700 hover:bg-zinc-900 rounded transition-colors"
              >
                Connexion
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-1.5 text-sm bg-white text-black hover:bg-zinc-200 rounded transition-colors font-medium"
              >
                Rejoindre le Flux
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
