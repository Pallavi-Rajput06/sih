import React, { useMemo, useState } from 'react';
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

function summarizeText(comments, minWords = 100, maxWords = 150) {
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
  const [comments, setComments] = useState([
    { id: 1, text: 'The dashboard loads quickly and the new filters are very helpful.' },
    { id: 2, text: 'I faced a small bug when exporting the report to PDF, but refreshing fixed it.' },
    { id: 3, text: 'Could we add dark mode to improve readability at night? Overall, nice work.' },
    { id: 4, text: 'Charts are informative, but the labels overlap on mobile devices. Please optimize.' },
  ]);
  const [draft, setDraft] = useState('');

  const summary = useMemo(() => summarizeText(comments, 100, 150), [comments]);
  const topWords = useMemo(() => computeWordFrequencies(comments, 8), [comments]);
  const lengthBuckets = useMemo(() => computeLengthBuckets(comments), [comments]);

  function handleAddComment(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setComments(prev => [
      ...prev,
      { id: Date.now(), text },
    ]);
    setDraft('');
  }

  function handleClear() {
    setComments([]);
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

          <form className="comment-form" onSubmit={handleAddComment}>
            <textarea
              className="comment-input"
              placeholder="Write a comment..."
              value={draft}
              onChange={e => setDraft(e.target.value)}
              rows={3}
            />
            <button className="btn primary" type="submit">Add Comment</button>
          </form>

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
            <h2>Summary (100–150 words)</h2>
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
            <h3>Comments by Length</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={lengthBuckets} dataKey="value" nameKey="name" outerRadius={90} label>
                    {lengthBuckets.map((entry, index) => (
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


