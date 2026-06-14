'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Email ou mot de passe incorrect');
    } else {
      window.location.href = '/profil';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="font-semibold tracking-[4px] text-2xl mb-2">VORTAXIOM</div>
          <div className="text-xs text-zinc-500">ACCÈS AUX ARCHIVES</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 px-5 py-3 rounded-lg focus:outline-none focus:border-zinc-600"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 px-5 py-3 rounded-lg focus:outline-none focus:border-zinc-600"
            required
          />

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-zinc-400">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-white hover:underline">Créer un profil</Link>
        </div>
      </div>
    </div>
  );
}
