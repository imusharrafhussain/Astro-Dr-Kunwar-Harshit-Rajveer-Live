import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function DashboardOverview() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        const res = await api.get('/api/admin/summary');
        setSummary(res.data.data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error('Summary fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--textSecondary)' }}>
        Loading dashboard statistics...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ff4d4f' }}>
        {error}
      </div>
    );
  }

  const cards = [
    { key: 'consultations', label: 'Total Consultations', value: summary?.consultations || 0, icon: 'fa-phone-alt', color: '#d4af37' },
    { key: 'reports', label: 'Vedic Reports', value: summary?.reports || 0, icon: 'fa-file-alt', color: '#f39c12' },
    { key: 'numerology', label: 'Numerology', value: summary?.numerology || 0, icon: 'fa-sort-numeric-up-alt', color: '#8e44ad' },
    { key: 'bookPuja', label: 'Puja Bookings', value: summary?.bookPuja || 0, icon: 'fa-om', color: '#e74c3c' },
    { key: 'horoscope', label: 'Horoscope Match', value: summary?.horoscope || 0, icon: 'fa-star-and-crescent', color: '#3498db' },
    { key: 'contacts', label: 'Contact Queries', value: summary?.contacts || 0, icon: 'fa-envelope', color: '#2ecc71' },
    { key: 'users', label: 'Registered Users', value: summary?.users || 0, icon: 'fa-users', color: '#9b59b6' },
  ];

  const totalInteractions = cards.reduce((acc, curr) => curr.key !== 'users' ? acc + curr.value : acc, 0);

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 24px', color: 'var(--text)', fontFamily: 'Cinzel, serif', fontWeight: 'bold' }}>
        Business Intelligence Overview
      </h2>
      
      {/* Top Level Summary */}
      <div style={{ 
        background: 'var(--bgCard)', 
        border: '1px solid var(--border)', 
        borderRadius: '12px', 
        padding: '24px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--textSecondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Total Registered Users</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'Inter, sans-serif' }}>
            {summary?.users || 0}
          </div>
        </div>
        <div style={{ width: '1px', height: '60px', background: 'var(--border)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--textSecondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Total Site Interactions & Forms</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'Inter, sans-serif' }}>
            {totalInteractions}
          </div>
        </div>
      </div>

      <h3 style={{ margin: '0 0 16px', color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontSize: '1.2rem' }}>
        Detailed Metrics
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {cards.filter(c => c.key !== 'users').map(card => (
          <div key={card.key} style={{
            background: 'var(--bgCard)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'default'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: \`\${card.color}15\`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: card.color,
              fontSize: '1.4rem'
            }}>
              <i className={\`fas \${card.icon}\`}></i>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text)' }}>
                {card.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--textSecondary)', marginTop: '4px' }}>
                {card.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
