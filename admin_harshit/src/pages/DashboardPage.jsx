import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import api from '../lib/api';
import { clearToken } from '../lib/auth';
import Sidebar from '../components/Sidebar.jsx';
import RecordsTable from '../components/RecordsTable.jsx';

const CATEGORY_TITLES = {
  reports: 'Reports',
  consultations: 'Consultation',
  numerology: 'Numerology',
  'book-puja': 'Book Puja',
  horoscope: 'Horoscope',
  contacts: 'Contacts',
  users: 'Registered Users',
};

export default function DashboardPage() {
  const [category, setCategory] = useState('reports');
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  const title = useMemo(() => CATEGORY_TITLES[category] || category, [category]);

  async function load(cat) {
    setError('');
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/records/${encodeURIComponent(cat)}`, { params: { limit: 500 } });
      setRecords(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        setError('Session expired. Redirecting to login…');
        setTimeout(() => {
          clearToken();
          window.location.assign('/login');
        }, 1500);
      } else {
        setError(err?.response?.data?.error || err.message || 'Failed to load records');
      }
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  function onExport() {
    const rows = records || [];
    const exportRows = rows.length ? rows : [{ info: 'No records found for this category.' }];
    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    const safeName = `astrobharat-${category}-${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, safeName);
  }

  function onLogout() {
    clearToken();
    window.location.assign('/login');
  }

  return (
    <div className="appShell">
      <header className="topbar">
        <div className="brand">
          <img
            className="brandLogoImg"
            src="/c__Users_perve_AppData_Roaming_Cursor_User_workspaceStorage_7f96d3c00da6498d2c01b6031a03c32f_images_logo-dfda88b4-a45c-422f-9005-9b973b11bca1.png"
            alt="AstroBharat AI logo"
          />
        </div>

        <div className="topbarActions">
          <button className="buttonSecondary" type="button" onClick={onExport} disabled={loading}>
            Export Excel
          </button>
          <button className="buttonGhost" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="main">
        <Sidebar active={category} onSelect={setCategory} />

        <section className="content">
          <div className="contentHeader">
            <div>
              <div className="contentTitle">{title}</div>
              <div className="muted">All fields are shown exactly as submitted by users.</div>
            </div>
            <button className="buttonSecondary" type="button" onClick={() => load(category)} disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {error ? (
            <div className={error.toLowerCase().includes('database is not connected') ? 'infoBox' : 'error'}>
              {error}
            </div>
          ) : null}
          <RecordsTable records={records} />
        </section>
      </div>
    </div>
  );
}

