import React, { useEffect, useMemo, useState } from 'react';
import './Report.css';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const LENGTH_BUCKETS = [
  { id: 'Short (<20 words)', min: 0, max: 19 },
  { id: 'Medium (20-49)', min: 20, max: 49 },
  { id: 'Long (50+)', min: 50, max: Infinity },
];

const STOP_WORDS = new Set([
  'a','an','and','are','as','at','be','but','by','for','if','in','into','is','it','no','not','of','on','or','such','that','the','their','then','there','these','they','this','to','was','will','with','we','you','your','our','from','have','has','had','i','he','she','them','his','her','were','also','can','could','should','would','do','does','did','about'
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function getWordCount(text) {
  return tokenize(text).length;
}

function summarizeText(comments, minWords = 230, maxWords = 270) {
  const combined = comments.map(c => c.text).join(' ');
  const words = tokenize(combined);
  if (words.length <= maxWords) {
    return combined.trim();
  }

  // Try to end near a sentence boundary between min and max words.
  const sentences = combined
    .replace(/\s+/g, ' ')
    .match(/[^.!?]+[.!?]/g) || [combined];

  let result = '';
  let count = 0;
  for (const s of sentences) {
    const sCount = getWordCount(s);
    if (count + sCount > maxWords) {
      break;
    }
    result += s;
    count += sCount;
    if (count >= minWords) {
      break;
    }
  }

  if (!result.trim()) {
    // Fallback: hard cut between min and max
    const cutAt = Math.min(Math.max(minWords, 0), maxWords);
    result = words.slice(0, cutAt).join(' ') + '…';
  }
  return result.trim();
}

function computeWordFrequencies(comments, topN = 8) {
  const freq = new Map();
  for (const { text } of comments) {
    const tokens = tokenize(text).filter(w => !STOP_WORDS.has(w) && w.length > 2);
    for (const w of tokens) {
      freq.set(w, (freq.get(w) || 0) + 1);
    }
  }
  const sorted = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word, count]) => ({ word, count }));
  return sorted.length > 0 ? sorted : [{ word: 'no-data', count: 0 }];
}

function computeLengthBuckets(comments) {
  const buckets = LENGTH_BUCKETS.map(b => ({ name: b.id, value: 0 }));
  for (const { text } of comments) {
    const wc = getWordCount(text);
    const idx = LENGTH_BUCKETS.findIndex(b => wc >= b.min && wc <= b.max);
    if (idx >= 0) buckets[idx].value += 1;
  }
  return buckets;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#8dd1e1', '#a4de6c', '#d0ed57', '#83a6ed'];

export default function Report() {
  const [comments, setComments] = useState([]);
  const [draft, setDraft] = useState('');

  const summary = useMemo(() => summarizeText(comments, 100, 150), [comments]);
  const topWords = useMemo(() => computeWordFrequencies(comments, 8), [comments]);
  const lengthBuckets = useMemo(() => computeLengthBuckets(comments), [comments]);

  // Load comments from localStorage that were added on Draft page
  useEffect(() => {
    try {
      const stored = localStorage.getItem('draftComments');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setComments(parsed);
        }
      }
    } catch (_) {
      // ignore
    }
  }, []);

  // Keep in sync if storage changes in another tab or Draft page updates it
  useEffect(() => {
    function syncFromStorage() {
      try {
        const stored = localStorage.getItem('draftComments');
        const parsed = stored ? JSON.parse(stored) : [];
        if (Array.isArray(parsed)) setComments(parsed);
      } catch (_) {
        // ignore
      }
    }
    const onFocus = () => syncFromStorage();
    window.addEventListener('storage', syncFromStorage);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  function handleClear() {
    setComments([]);
    try { localStorage.removeItem('draftComments'); } catch (_) { /* ignore */ }
  }

  return (
    <div className="report-page">
      <h1 className="report-title">Report</h1>

      <div className="report-grid">
        <section className="comments-section">
          <header className="section-header">
            <h2>Comments</h2>
            <div className="actions">
              <button className="btn" onClick={handleClear} disabled={comments.length === 0}>Clear</button>
            </div>
          </header>

          <div className="comments-list" role="list">
            {comments.length === 0 ? (
              <div className="empty">No comments yet.</div>
            ) : (
              comments.map(c => (
                <div key={c.id} className="comment-item" role="listitem">
                  <p>{c.text}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="summary-section">
          <header className="section-header">
            <h2>Summary</h2>
          </header>
          <p className="summary-text">{summary}</p>
        </section>

        <section className="charts-section">
          <div className="chart-card">
            <h3>Top Words Frequency</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={topWords} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="word" angle={-20} dy={10} interval={0} height={40} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3>Sentiment Distribution</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={computeSentimentPie(comments)} dataKey="value" nameKey="name" outerRadius={90} label>
                    {computeSentimentPie(comments).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Simple lexicon-based sentiment classification
const POSITIVE_WORDS = new Set(['good','great','excellent','nice','love','like','helpful','quick','fast','improve','improved','improves','clear','effective','enjoy','awesome','amazing','fantastic','well','happy','satisfied','smooth']);
const NEGATIVE_WORDS = new Set(['bad','poor','slow','bug','issue','error','problem','confusing','hate','dislike','overlap','crash','fail','delay','difficult','hard','worst','terrible','not working','broken']);

function classifySentiment(text) {
  const t = tokenize(text);
  let pos = 0; let neg = 0;
  for (const w of t) {
    if (POSITIVE_WORDS.has(w)) pos += 1;
    if (NEGATIVE_WORDS.has(w)) neg += 1;
  }
  if (pos > neg) return 'Positive';
  if (neg > pos) return 'Negative';
  return 'Neutral';
}

function computeSentimentPie(comments) {
  const counts = { Positive: 0, Negative: 0, Neutral: 0 };
  for (const c of comments) {
    counts[classifySentiment(c.text)] += 1;
  }
  return [
    { name: 'Positive', value: counts.Positive },
    { name: 'Negative', value: counts.Negative },
    { name: 'Neutral', value: counts.Neutral },
  ];
}


