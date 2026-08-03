import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type LoginResponse } from '../lib/auth';
import { Navbar } from '@/components/Navbar';

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Gunakan environment variable, fallback ke localhost jika tidak ada
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

      const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectUrl);

      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Email atau password salah');
      }

      const data: LoginResponse = await response.json();
      
      // Simpan token
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Opsional: simpan data user
      
      // Redirect ke halaman dashboard/home setelah berhasil
      navigate('/'); 
      
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Navbar />
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your Temaxing Scan account</p>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                placeholder="name@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full rounded-lg bg-brand py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Login'}
            </button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-brand hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
  );
}

export default Login;