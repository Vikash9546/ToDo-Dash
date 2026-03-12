import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, clearError } from '../store/authSlice';
import Logo from './Logo';
import { EyeIcon, EyeOffIcon } from './Icons';

const DEMO_EMAIL = 'palak@example.com';
const DEMO_PASSWORD = 'password123';

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, error: authError } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    dispatch(clearError());
    dispatch(loginAsync({ email, password }));
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8f7ff]">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),transparent)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="relative w-full max-w-md px-6 animate-[fadeUp_0.6s_ease-out]">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-violet-900/10 border border-white/60 p-8 sm:p-10">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 mb-8">
            <Logo className="w-12 h-12 shrink-0" />
            <span className="text-xl font-bold text-slate-800 tracking-tight">Project M.</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Welcome back
          </h1>
          <p className="text-slate-500 mb-6">Sign in to continue to your dashboard</p>

          {/* Demo credentials */}
          <button
            type="button"
            onClick={fillDemo}
            className="w-full mb-8 p-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 hover:border-violet-200 hover:from-violet-100/80 hover:to-purple-100/80 transition-all duration-300 group"
          >
            <p className="text-sm font-semibold text-violet-700 mb-2 text-left">Demo Credentials</p>
            <div className="flex flex-col gap-1 text-left text-sm text-slate-600">
              <span>Email: palak@example.com</span>
              <span>Password: password123</span>
            </div>
            <p className="text-xs text-violet-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to auto-fill
            </p>
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 transition-all duration-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600 text-sm">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => alert('Sign up coming soon! Use demo credentials to sign in.')}
              className="font-semibold text-violet-600 hover:text-violet-700 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Decorative accent */}
        <div className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-400/20 to-purple-500/20 blur-2xl" />
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
