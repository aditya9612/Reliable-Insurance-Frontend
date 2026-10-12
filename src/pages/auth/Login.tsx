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

const AnimatedLogoText = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Trigger slightly faster so the user doesn't wait too long
        const timer = setTimeout(() => setIsExpanded(true), 350);
        return () => clearTimeout(timer);
    }, []);

    const renderCascadingLetters = (word: string, isBlue: boolean, delayOffset: number) => {
        // The most perfectly smooth way to transition an unknown dynamic width is CSS Grid 1fr trick.
        return (
            <div
                className="grid transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ gridTemplateColumns: !isExpanded ? '0fr' : '1fr' }}
            >
                <div className="overflow-hidden min-w-0 flex items-center">
                    {word.split('').map((char, index) => (
                        <span
                            key={index}
                            className={`inline-block tracking-wide ${isBlue ? 'text-[#38BDF8]' : 'text-white'} transition-all duration-[700ms] ease-out will-change-transform`}
                            style={{
                                fontSize: '36px',
                                opacity: !isExpanded ? 0 : 1,
                                transform: !isExpanded ? 'translateX(-20px)' : 'translateX(0)',
                                transitionDelay: !isExpanded ? '0ms' : `${delayOffset + (index * 40)}ms`
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div
            className="flex flex-row items-center select-none whitespace-nowrap mb-[42px]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
            <div className="flex items-center">
                <span className="text-white font-bold tracking-tight" style={{ fontSize: '42px', zIndex: 10 }}>R</span>
                {renderCascadingLetters('eliable', false, 0)}
            </div>
            {/* Dynamic gap between words smoothly animates */}
            <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${!isExpanded ? 'w-0' : 'w-3.5'}`} />
            <div className="flex items-center">
                <span className="text-[#38BDF8] font-normal tracking-tight" style={{ fontSize: '42px', zIndex: 10 }}>A</span>
                {renderCascadingLetters('ssociates', true, 280)}
            </div>
        </div>
    );
};

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
                    <AnimatedLogoText />

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

                <div className="login-card mt-6">

                    <h2 className="card-title text-center">
                        Welcome Back
                    </h2>

                    <p className="card-subtitle text-center">
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


                        {/* COPYRIGHT */}

                        <div className="copyright mt-6">
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
