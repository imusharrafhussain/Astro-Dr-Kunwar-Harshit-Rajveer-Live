import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';


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
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {r.status === 'pending' && (
                      <button className="buttonPrimary" style={{ padding: '4px 8px', minHeight: 'unset', whiteSpace: 'nowrap' }} onClick={() => {
                        if (window.confirm('Confirm this booking?')) {
                          onEdit(r._id, { status: 'confirmed' });
                        }
                      }}>Confirm</button>
                    )}
                    <button className="buttonGhost" style={{ padding: '4px 8px', minHeight: 'unset', whiteSpace: 'nowrap' }} onClick={() => handleEditClick(r)}>Edit</button>
                    <button className="buttonSecondary" style={{ padding: '4px 8px', minHeight: 'unset', whiteSpace: 'nowrap' }} onClick={() => {
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

      {editingRecord && createPortal(
        <div className="modalOverlay" onClick={() => setEditingRecord(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3 className="modalTitle">Edit Response</h3>
              <button className="buttonGhost" style={{ padding: '4px 12px' }} onClick={() => setEditingRecord(null)}>✕</button>
            </div>
            
            <div className="modalBody">
              <div className="modalGrid">
                {Object.keys(editFormData).map(key => (
                  <div key={key} className="modalField">
                    <label className="modalLabel">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                    {typeof editFormData[key] === 'string' && (editFormData[key].length > 50 || key.toLowerCase().includes('message') || key.toLowerCase().includes('comment')) ? (
                      <textarea
                        className="input"
                        rows={3}
                        value={editFormData[key] || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                        style={{ resize: 'vertical', minHeight: '80px' }}
                      />
                    ) : (
                      <input
                        className="input"
                        value={typeof editFormData[key] === 'object' ? JSON.stringify(editFormData[key]) : editFormData[key] || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="modalFooter">
              <button className="buttonGhost" onClick={() => setEditingRecord(null)}>Cancel</button>
              <button className="buttonPrimary" onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

