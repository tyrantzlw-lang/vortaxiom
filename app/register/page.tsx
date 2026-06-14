'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.error || 'Une erreur est survenue');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-center px-6">
        <div>
          <div className="text-emerald-400 mb-4">✓ Profil créé avec succès</div>
          <Link href="/login" className="text-white underline">Se connecter</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="font-semibold tracking-[4px] text-2xl mb-2">VORTAXIOM</div>
          <div className="text-xs text-zinc-500">CRÉATION DE PROFIL DE CHERCHEUR</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom ou pseudonyme"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 px-5 py-3 rounded-lg focus:outline-none focus:border-zinc-600"
            required
          />
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
            Créer mon profil
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-zinc-400">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-white hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
