import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { setToken } from '../lib/auth';

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const disabled = useMemo(() => submitting || !email || !password, [submitting, email, password]);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await api.post('/api/admin/login', { email, password });
      const token = res?.data?.token;
      if (!token) throw new Error('Missing token');
      setToken(token);
      nav('/', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="loginShell">
      <div className="loginCard">
        <div className="loginTitle">Admin Login</div>
        <div className="loginSubtitle">AstroBharat AI — Harshit Admin Panel</div>
        <form onSubmit={onSubmit} className="form">
          <label className="label">
            Email
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="username" />
          </label>
          <label className="label">
            Password
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </label>

          {error ? <div className="error">{error}</div> : null}

          <button className="button" disabled={disabled} type="submit">
            {submitting ? 'Signing in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

