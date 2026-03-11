import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearError } from '../store/authSlice';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi2';

export default function Login() {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);

    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            dispatch(register(formData.name, formData.email, formData.password));
        } else {
            dispatch(login(formData.email, formData.password));
        }
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        dispatch(clearError());
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#5030E5] via-[#6C4CEF] to-[#8B6BF7] p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/5 rounded-full" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-white text-xl font-semibold">Project M.</span>
                    </div>
                </div>

                <div className="relative z-10 max-w-md">
                    <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Manage your projects with ease
                    </h1>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Organize tasks, collaborate with your team, and ship products faster with our intuitive dashboard.
                    </p>

                    {/* Features */}
                    <div className="mt-8 space-y-4">
                        {[
                            'Drag & drop task management',
                            'Real-time team collaboration',
                            'Smart filtering & search'
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                                <span className="text-white/80 text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-white/40 text-sm">© 2026 Project M. All rights reserved.</p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#FAFAFA]">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#5030E5] to-[#7B61FF] rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-gray-900 text-xl font-semibold">Project M.</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {isRegister ? 'Create your account' : 'Welcome back'}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {isRegister
                                ? 'Sign up to start managing your projects'
                                : 'Sign in to continue to your dashboard'}
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    {!isRegister && (
                        <div className="bg-[#5030E5]/5 border border-[#5030E5]/10 rounded-xl p-4 mb-6">
                            <p className="text-xs font-medium text-[#5030E5] mb-1.5">Demo Credentials</p>
                            <p className="text-xs text-gray-600">
                                Email: <span className="font-mono bg-white px-1.5 py-0.5 rounded text-[#5030E5]">palak@example.com</span>
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                Password: <span className="font-mono bg-white px-1.5 py-0.5 rounded text-[#5030E5]">password123</span>
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm animate-fade-in">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name (Register only) */}
                        {isRegister && (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all bg-white"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <div className="relative">
                                <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all bg-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all bg-white"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-[#5030E5] to-[#7B61FF] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#5030E5]/25 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    {isRegister ? 'Creating account...' : 'Signing in...'}
                                </span>
                            ) : (
                                isRegister ? 'Create Account' : 'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Toggle */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            onClick={toggleMode}
                            className="text-[#5030E5] font-medium hover:text-[#4025C4] transition-colors"
                        >
                            {isRegister ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
