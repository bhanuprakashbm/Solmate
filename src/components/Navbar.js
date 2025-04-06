import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav style={{
            padding: scrolled ? '12px 20px' : '16px 20px',
            backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
            boxShadow: scrolled ? '0 4px 20px rgba(126, 87, 194, 0.15)' : 'none',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            borderBottom: scrolled ? '1px solid rgba(126, 87, 194, 0.1)' : 'none'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div className="logo">
                    <Link to="/" style={{
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        fontSize: '1.6rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'transform 0.3s ease',
                        transform: scrolled ? 'scale(0.95)' : 'scale(1)'
                    }}>
                        <span style={{
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            color: 'white',
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 15px rgba(126, 87, 194, 0.3)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            transform: 'rotate(5deg)'
                        }}>
                            <span style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                                opacity: scrolled ? 0.5 : 0.7,
                                transition: 'opacity 0.3s ease'
                            }}></span>
                            <span style={{ fontSize: '18px' }}>S</span>
                        </span>
                        <span style={{
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 10px rgba(231, 76, 60, 0.2)'
                        }}>
                            Solmate
                        </span>
                    </Link>
                </div>

                <div className="nav-links hide-on-mobile" style={{
                    display: 'flex',
                    gap: '30px',
                    alignItems: 'center'
                }}>
                    <Link
                        to="/chat"
                        style={{
                            textDecoration: 'none',
                            color: isActive('/chat') ? 'var(--primary)' : 'var(--dark)',
                            fontWeight: isActive('/chat') ? '600' : '500',
                            position: 'relative',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            opacity: isActive('/chat') ? 1 : 0.8,
                            backgroundColor: isActive('/chat') ? 'rgba(126, 87, 194, 0.08)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>💬</span>
                        <span style={{
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            Talk to AI
                            {isActive('/chat') && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'var(--primary)',
                                    transform: 'scaleX(1)',
                                    transition: 'transform 0.3s ease'
                                }}></span>
                            )}
                        </span>
                    </Link>

                    <Link
                        to="/game"
                        style={{
                            textDecoration: 'none',
                            color: isActive('/game') ? 'var(--primary)' : 'var(--dark)',
                            fontWeight: isActive('/game') ? '600' : '500',
                            position: 'relative',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            opacity: isActive('/game') ? 1 : 0.8,
                            backgroundColor: isActive('/game') ? 'rgba(126, 87, 194, 0.08)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>🎯</span>
                        <span style={{
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            Challenge
                            {isActive('/game') && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'var(--primary)',
                                    transform: 'scaleX(1)',
                                    transition: 'transform 0.3s ease'
                                }}></span>
                            )}
                        </span>
                    </Link>

                    <Link
                        to="/resources"
                        style={{
                            textDecoration: 'none',
                            color: isActive('/resources') ? 'var(--primary)' : 'var(--dark)',
                            fontWeight: isActive('/resources') ? '600' : '500',
                            position: 'relative',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            opacity: isActive('/resources') ? 1 : 0.8,
                            backgroundColor: isActive('/resources') ? 'rgba(126, 87, 194, 0.08)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>📚</span>
                        <span style={{
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            Resources
                            {isActive('/resources') && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'var(--primary)',
                                    transform: 'scaleX(1)',
                                    transition: 'transform 0.3s ease'
                                }}></span>
                            )}
                        </span>
                    </Link>

                    <Link
                        to="/sos"
                        className={`btn-sos ${isActive('/sos') ? 'active' : 'pulsing'}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none'
                        }}
                    >
                        <span style={{
                            fontSize: '18px',
                            animation: isActive('/sos') ? 'none' : 'heartbeat 2s infinite'
                        }}>❤️</span>
                        <span style={{ fontWeight: '600', letterSpacing: '0.5px' }}>SOS</span>
                    </Link>
                </div>

                <button
                    className="mobile-menu-button show-on-mobile"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        background: mobileMenuOpen ? 'rgba(126, 87, 194, 0.1)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        color: mobileMenuOpen ? 'var(--primary)' : 'var(--dark)',
                        display: 'none',
                        padding: '10px',
                        borderRadius: '10px',
                        transition: 'all 0.3s ease',
                        boxShadow: mobileMenuOpen ? '0 4px 12px rgba(126, 87, 194, 0.15)' : 'none'
                    }}
                >
                    <span role="img" aria-label="menu" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px'
                    }}>
                        {mobileMenuOpen ? '✕' : '☰'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="mobile-menu show-on-mobile"
                    style={{
                        position: 'fixed',
                        top: '60px',
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 30px rgba(126, 87, 194, 0.15)',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        zIndex: 99,
                        borderBottom: '1px solid rgba(126, 87, 194, 0.1)',
                        animation: 'fadeIn 0.3s ease'
                    }}
                >
                    <Link
                        to="/chat"
                        style={{
                            textDecoration: 'none',
                            color: isActive('/chat') ? 'var(--primary)' : 'var(--dark)',
                            padding: '14px 15px',
                            borderRadius: '12px',
                            fontWeight: isActive('/chat') ? '600' : '500',
                            backgroundColor: isActive('/chat') ? 'rgba(126, 87, 194, 0.08)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span style={{ fontSize: '18px' }}>💬</span>
                        Talk to AI
                    </Link>

                    <Link
                        to="/game"
                        style={{
                            textDecoration: 'none',
                            color: isActive('/game') ? 'var(--primary)' : 'var(--dark)',
                            padding: '14px 15px',
                            borderRadius: '12px',
                            fontWeight: isActive('/game') ? '600' : '500',
                            backgroundColor: isActive('/game') ? 'rgba(126, 87, 194, 0.08)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span style={{ fontSize: '18px' }}>🎯</span>
                        Challenge
                    </Link>

                    <Link
                        to="/resources"
                        style={{
                            textDecoration: 'none',
                            color: isActive('/resources') ? 'var(--primary)' : 'var(--dark)',
                            padding: '14px 15px',
                            borderRadius: '12px',
                            fontWeight: isActive('/resources') ? '600' : '500',
                            backgroundColor: isActive('/resources') ? 'rgba(126, 87, 194, 0.08)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span style={{ fontSize: '18px' }}>📚</span>
                        Resources
                    </Link>

                    <Link
                        to="/sos"
                        className="btn-sos"
                        style={{
                            margin: '5px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            textDecoration: 'none',
                            padding: '14px 15px'
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span style={{ fontSize: '18px', animation: 'heartbeat 2s infinite' }}>❤️</span>
                        Emergency SOS
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 