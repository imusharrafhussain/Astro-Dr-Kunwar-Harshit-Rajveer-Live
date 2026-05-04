import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { 
  Users, MousePointerClick, FileText, CheckCircle, TrendingUp, TrendingDown 
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const res = await api.get('/api/admin/analytics');
        setData(res.data.data);
      } catch (err) {
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--textSecondary)' }}>
        Loading comprehensive analytics...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ff4d4f' }}>
        {error || 'No data available'}
      </div>
    );
  }

  const { kpis, funnel, categories, timeSeries, adminActions } = data;

  // Custom colors for charts
  const COLORS = ['#d4af37', '#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71'];

  return (
    <div className="analytics-dashboard" style={{ padding: '24px', paddingBottom: '60px', color: 'var(--text)', overflowY: 'auto', height: '100%', maxHeight: 'calc(100vh - 80px)' }}>
      {/* SECTION 1: KPI SUMMARY CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <KpiCard title="Total Visitors" value={kpis.visitors} icon={<Users size={24} />} trend="+12%" isPositive={true} />
        <KpiCard title="Form Opens" value={kpis.formOpened} icon={<MousePointerClick size={24} />} trend="+8%" isPositive={true} />
        <KpiCard title="Submissions" value={kpis.submissions} icon={<FileText size={24} />} trend="+15%" isPositive={true} />
        <KpiCard title="Conversion Rate" value={`${kpis.conversionRate}%`} icon={<CheckCircle size={24} />} trend="+2%" isPositive={true} />
        <KpiCard title="Drop-offs" value={kpis.dropOffs} icon={<TrendingDown size={24} />} trend="-5%" isPositive={false} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* SECTION 2: CONVERSION FUNNEL */}
        <div className="chart-card">
          <h3 className="chart-title">Conversion Funnel</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart layout="vertical" data={funnel} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#888" />
                <YAxis dataKey="stage" type="category" stroke="#888" width={100} />
                <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                <Bar dataKey="count" barSize={30} radius={[0, 4, 4, 0]}>
                  {funnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 4: TIME-BASED ANALYTICS */}
        <div className="chart-card">
          <h3 className="chart-title">Traffic & Submissions (Last 7 Days)</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" stroke="#888" tick={{fontSize: 12}} />
                <YAxis yAxisId="left" stroke="#888" />
                <YAxis yAxisId="right" orientation="right" stroke="#d4af37" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="visitors" name="Visitors" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="submissions" name="Submissions" stroke="#d4af37" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* SECTION 3: CATEGORY ANALYTICS */}
        <div className="chart-card">
          <h3 className="chart-title">Submissions by Category</h3>
          <div style={{ height: 300, display: 'flex' }}>
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={categories} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
              </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height="100%">
              <BarChart data={categories} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <XAxis dataKey="name" stroke="#888" tick={{fontSize: 10}} interval={0} angle={-30} textAnchor="end" />
                <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 5: ADMIN ACTION TRACKING */}
        <div className="chart-card">
          <h3 className="chart-title">Status Overview (Consultations)</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminActions} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {adminActions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .chart-card {
          background: var(--bgCard);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .chart-title {
          margin: 0 0 16px;
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--textSecondary);
        }
      `}</style>
    </div>
  );
}

function KpiCard({ title, value, icon, trend, isPositive }) {
  return (
    <div style={{
      background: 'var(--bgCard)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'var(--textSecondary)', fontSize: '0.9rem', fontWeight: 500 }}>{title}</div>
        <div style={{ color: 'var(--gold)', opacity: 0.8 }}>{icon}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text)', lineHeight: 1 }}>{value}</div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          fontSize: '0.8rem', 
          fontWeight: 600,
          color: isPositive ? '#2ecc71' : '#e74c3c',
          background: isPositive ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
          padding: '4px 8px',
          borderRadius: '12px'
        }}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}
        </div>
      </div>
    </div>
  );
}
