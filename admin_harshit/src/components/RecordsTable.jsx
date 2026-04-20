import { useMemo, useState } from 'react';

function normalizeValue(v) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

export default function RecordsTable({ records }) {
  const [q, setQ] = useState('');

  const { columns, rows } = useMemo(() => {
    const cols = new Set();
    for (const r of records || []) Object.keys(r || {}).forEach((k) => cols.add(k));
    const colArr = Array.from(cols);

    const query = q.trim().toLowerCase();
    const filtered = !query
      ? records || []
      : (records || []).filter((r) => JSON.stringify(r).toLowerCase().includes(query));

    return { columns: colArr, rows: filtered };
  }, [records, q]);

  return (
    <div className="tableShell">
      <div className="tableToolbar">
        <input
          className="input"
          placeholder="Search any field…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="muted">{rows.length} records</div>
      </div>

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id || JSON.stringify(r)}>
                {columns.map((c) => (
                  <td key={c}>{normalizeValue(r?.[c])}</td>
                ))}
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={Math.max(columns.length, 1)} className="emptyCell">
                  No records found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

