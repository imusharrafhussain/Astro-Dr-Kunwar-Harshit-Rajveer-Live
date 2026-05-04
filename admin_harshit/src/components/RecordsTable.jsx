import { useMemo, useState } from 'react';

function normalizeValue(v) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

export default function RecordsTable({ records, onDelete, onEdit }) {
  const [q, setQ] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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

  function handleEditClick(r) {
    setEditingRecord(r);
    const { _id, __v, createdAt, updatedAt, ...rest } = r;
    setEditFormData(rest);
  }

  function handleSaveEdit() {
    onEdit(editingRecord._id, editFormData);
    setEditingRecord(null);
  }

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id || JSON.stringify(r)}>
                {columns.map((c) => (
                  <td key={c}>{normalizeValue(r?.[c])}</td>
                ))}
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="buttonGhost" style={{ padding: '4px 8px', minHeight: 'unset' }} onClick={() => handleEditClick(r)}>Edit</button>
                    <button className="buttonSecondary" style={{ padding: '4px 8px', minHeight: 'unset' }} onClick={() => {
                      if (window.confirm('Are you sure you want to delete this record?')) {
                        onDelete(r._id);
                      }
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={Math.max(columns.length + 1, 1)} className="emptyCell">
                  No records found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {editingRecord && (
        <div className="modalOverlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="modalContent" style={{ backgroundColor: '#1a181d', padding: '24px', borderRadius: '8px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #cfa144' }}>
            <h3 style={{ marginBottom: '16px', color: '#f2e8d5' }}>Edit Record</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.keys(editFormData).map(key => (
                <div key={key}>
                  <label style={{ display: 'block', marginBottom: '4px', color: '#c2b59b', fontSize: '0.875rem' }}>{key}</label>
                  <input
                    className="input"
                    value={typeof editFormData[key] === 'object' ? JSON.stringify(editFormData[key]) : editFormData[key] || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="buttonGhost" onClick={() => setEditingRecord(null)}>Cancel</button>
              <button className="buttonPrimary" onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

