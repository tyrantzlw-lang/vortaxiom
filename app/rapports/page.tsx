'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Report {
  id: number;
  title: string;
  content: string;
  name: string;
  created_at: string;
}

interface Comment {
  id: number;
  content: string;
  name: string;
  created_at: string;
}

export default function RapportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [openReportId, setOpenReportId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadReports = async () => {
    const res = await fetch('/api/reports');
    const data = await res.json();
    setReports(data);
  };

  const loadComments = async (reportId: number) => {
    const res = await fetch(`/api/report-comment?report_id=${reportId}`);
    const data = await res.json();
    setComments(prev => ({ ...prev, [reportId]: data }));
  };

  const toggleReport = async (reportId: number) => {
    if (openReportId === reportId) {
      setOpenReportId(null);
    } else {
      setOpenReportId(reportId);
      if (!comments[reportId]) await loadComments(reportId);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
        setTitle('');
        setContent('');
        setShowForm(false);
        await loadReports();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitComment = async (reportId: number) => {
    if (!newComment.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/report-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report_id: reportId, content: newComment }),
      });
      if (res.ok) {
        setNewComment('');
        await loadComments(reportId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Retour</Link>
            <div className="text-xl font-medium tracking-wider">PUBLICATIONS</div>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-900 rounded-lg transition-colors">
            {showForm ? 'Fermer' : 'Nouveau rapport'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tighter mb-3">Rapports des Chercheurs</h1>
          <p className="text-zinc-400 max-w-md">Contributions et observations publiées par la communauté.</p>
        </div>

        {showForm && (
          <div className="mb-10 border border-zinc-800 p-8 rounded-xl">
            <form onSubmit={submitReport} className="space-y-4">
              <input type="text" placeholder="Titre du rapport" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" required />
              <textarea placeholder="Contenu du rapport..." value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 resize-y" required />
              <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-white text-black font-medium rounded-lg disabled:opacity-50">
                {isLoading ? 'Publication...' : 'Publier le rapport (+10 réputation)'}
              </button>
            </form>
          </div>
        )}

        {message && <div className="mb-8 p-4 bg-emerald-950 border border-emerald-800 rounded-lg text-emerald-400">{message}</div>}

        <div className="space-y-6">
          {reports.length === 0 && <p className="text-zinc-500">Aucun rapport publié pour le moment.</p>}

          {reports.map((report) => (
            <div key={report.id} className="border border-zinc-800 rounded-2xl overflow-hidden">
              <div onClick={() => toggleReport(report.id)} className="p-8 cursor-pointer hover:bg-zinc-950 transition-colors">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-2xl tracking-tight pr-4">{report.title}</h3>
                  <div className="text-xs text-zinc-500 text-right shrink-0">
                    par {report.name}<br />{new Date(report.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>

              {openReportId === report.id && (
                <div className="border-t border-zinc-800 p-8 bg-zinc-950">
                  <p className="text-zinc-300 whitespace-pre-line mb-10 leading-relaxed">{report.content}</p>

                  <div className="space-y-4 mb-6">
                    {(comments[report.id] || []).map((comment) => (
                      <div key={comment.id} className="pl-4 border-l border-zinc-700">
                        <div className="text-sm text-zinc-400 mb-1">{comment.name} • {new Date(comment.created_at).toLocaleDateString('fr-FR')}</div>
                        <p className="text-zinc-300">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input type="text" placeholder="Commenter ce rapport..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm" />
                    <button onClick={() => submitComment(report.id)} disabled={isLoading || !newComment.trim()} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg disabled:opacity-50">Envoyer</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
