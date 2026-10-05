import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@context/AuthContext';

import {
    BarChart3,
    ShieldCheck,
    Users,
    Settings,
    User,
    Lock,
    EyeOff,
    Eye,
    ArrowRight,
    LucideIcon
} from 'lucide-react';

import './Login.css';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon: Icon,
    title
}) => (
    <div className="feature-card">

        <div className="feature-icon-wrapper">
            <Icon
                size={23}
                color="#FFFFFF"
                strokeWidth={1.6}
            />
        </div>

        <div className="feature-title">
            {title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i < title.split('\n').length - 1 && <br />}
                </React.Fragment>
            ))}
        </div>

    </div>
);

const Login = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isHiding, setIsHiding] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ userId?: string, password?: string }>({});

    const { login } = useAuthContext();

    // Auto-dismiss the toast notification after 3 seconds
    useEffect(() => {
        if (error && !isHiding) {
            const timer = setTimeout(() => setIsHiding(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [error, isHiding]);

    // Unmount after animation finishes
    useEffect(() => {
        if (isHiding) {
            const hideTimer = setTimeout(() => {
                setError('');
                setIsHiding(false);
            }, 400); // 400ms corresponds to the CSS animation length
            return () => clearTimeout(hideTimer);
        }
    }, [isHiding]);

    const navigate = useNavigate();

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        // Field Validation
        const newFieldErrors: { userId?: string, password?: string } = {};
        if (!userId.trim()) newFieldErrors.userId = 'User ID is required';
        if (!password) newFieldErrors.password = 'Password is required';

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            return;
        }

        // Mock authentication for admin only
        if (userId === '999' && password === 'admin123') {
            login(
                {
                    id: 999,
                    name: 'System Admin',
                    role: 'admin'
                },
                'mock-token-admin'
            );
        } else {
            setError('Invalid credentials. Please use User ID 999 and the correct password.');
            return;
        }

        navigate('/');
    };

    return (

        <div className="login-container">

            {/* =========================
                LEFT SECTION
            ========================= */}

            <section className="left-section">

                {/* Top waves added for beauty */}
                <div className="left-wave-top"></div>
                <div className="left-wave-top-line"></div>

                {/* Decorative waves */}
                <div className="left-wave-dark"></div>
                <div className="left-wave-light"></div>
                <div className="left-wave-line"></div>

                <div className="left-content">

                    {/* REAL LOGO */}
                    <img
                        src="/logo-light.svg"
                        alt="Reliable Associates"
                        className="company-logo"
                    />

                    <div className="left-divider"></div>

                    <h1 className="main-heading">
                        Reliable Solutions
                        <br />
                        for a Smarter Business
                    </h1>

                    <p className="description-text">
                        Streamline operations, improve productivity
                        <br />
                        and drive growth with our secure and
                        <br />
                        scalable enterprise platform.
                    </p>

                    <div className="features-grid">

                        <FeatureCard
                            icon={BarChart3}
                            title={'Better\nProductivity'}
                        />

                        <FeatureCard
                            icon={ShieldCheck}
                            title={'Secure &\nReliable'}
                        />

                        <FeatureCard
                            icon={Users}
                            title={'Team\nCollaboration'}
                        />

                        <FeatureCard
                            icon={Settings}
                            title={'Scalable\nfor Growth'}
                        />

                    </div>

                </div>

            </section>


            {/* =========================
                RIGHT SECTION
            ========================= */}

            <section className="right-section">

                {/* Top waves for beauty */}
                <div className="right-wave-top"></div>
                <div className="right-wave-top-line"></div>

                {/* Decorative right wave */}
                <div className="right-wave"></div>
                <div className="right-wave-line"></div>

                <div className="login-card">

                    {/* REAL LOGO */}
                    <img
                        src="/logo-dark.svg"
                        alt="Reliable Associates"
                        className="card-logo"
                    />

                    <h2 className="card-title">
                        Welcome Back
                    </h2>

                    <p className="card-subtitle">
                        Sign in to continue
                    </p>

                    {error && (
                        <div className={`error-message ${isHiding ? 'toast-slide-out' : ''}`}>
                            {error}
                        </div>
                    )}

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        {/* USER ID */}

                        <div className="input-group">

                            <User
                                className="input-icon-left"
                                size={20}
                            />

                            <input
                                type="text"
                                className="form-input"
                                placeholder="User ID"
                                value={userId}
                                onChange={(e) => {
                                    setUserId(e.target.value);
                                    if (error && !isHiding) setIsHiding(true);
                                    if (fieldErrors.userId) setFieldErrors(prev => ({ ...prev, userId: undefined }));
                                }}
                            />

                            {fieldErrors.userId && <div className="field-error">{fieldErrors.userId}</div>}
                        </div>


                        {/* PASSWORD */}

                        <div className="input-group">

                            <Lock
                                className="input-icon-left"
                                size={20}
                            />

                            <input
                                type={
                                    showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                className="form-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (error && !isHiding) setIsHiding(true);
                                    if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
                                }}
                            />

                            <button
                                type="button"
                                className="input-icon-right"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label="Toggle password visibility"
                            >

                                {showPassword ? (
                                    <Eye size={20} />
                                ) : (
                                    <EyeOff size={20} />
                                )}

                            </button>

                            {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
                        </div>


                        {/* OPTIONS */}

                        <div className="form-options">

                            <label className="remember-me">

                                <input
                                    type="checkbox"
                                    className="remember-checkbox"
                                    defaultChecked
                                />

                                <span>
                                    Remember me
                                </span>

                            </label>


                            <a
                                href="#"
                                className="forgot-password"
                            >
                                Forgot Password?
                            </a>

                        </div>


                        {/* SIGN IN */}

                        <button
                            type="submit"
                            className="btn-submit"
                        >

                            <span>
                                Sign In
                            </span>

                            <ArrowRight
                                className="btn-icon"
                                size={20}
                            />

                        </button>


                        {/* DIVIDER */}

                        <div className="divider">
                            <span></span>
                            <small>OR</small>
                            <span></span>
                        </div>


                        {/* COPYRIGHT */}

                        <div className="copyright">
                            © 2026 Reliable Associates.
                            All rights reserved.
                        </div>

                    </form>

                </div>

            </section>

        </div>
    );
};

export default Login;
