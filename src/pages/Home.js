import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmergencyMode from '../components/EmergencyMode';

const Home = () => {
    const [showEmergencyMode, setShowEmergencyMode] = useState(false);

    return (
        <div className="home-background" style={{ minHeight: '100vh', color: 'white' }}>
            {/* Emergency SOS Button - Always visible */}
            <div style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 100
            }}>
                <button
                    onClick={() => setShowEmergencyMode(true)}
                    className="floating-button heartbeat"
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 5px 25px rgba(233, 30, 99, 0.5), 0 0 15px rgba(233, 30, 99, 0.3)',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <span style={{ fontSize: '2.2rem', marginBottom: '2px' }}>❤️</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>SOS</span>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                        pointerEvents: 'none'
                    }}></div>
                </button>
            </div>

            <div className="container">
                <div className="flex flex-col align-center justify-center" style={{ minHeight: '90vh', padding: '20px 0' }}>
                    <h1 style={{
                        fontSize: '4.5rem',
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        textAlign: 'center',
                        textShadow: '0 5px 15px rgba(0,0,0,0.4)',
                        letterSpacing: '2px'
                    }}>
                        SOLMATE
                    </h1>
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '50px',
                        textAlign: 'center',
                        fontWeight: '400',
                        letterSpacing: '3px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                        CHOOSE LIFE. START THE JOURNEY.
                    </h2>

                    <div className="card card-glow" style={{
                        maxWidth: '700px',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        color: 'var(--dark)',
                        borderRadius: '20px',
                        marginBottom: '30px',
                        padding: '30px',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
                    }}>
                        <p style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '25px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary)' }}>
                            The 50-day challenge that will transform your life
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '25px' }}>
                            Welcome to Solmate - the direct counterpoint to Blue Whale. While Blue Whale leads to destruction, Solmate guides you toward hope, healing, and meaningful connection with yourself and others.
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '0' }}>
                            This is <strong>not</strong> a game. This is your journey back from the edge and into a life worth living.
                        </p>
                    </div>

                    <div className="card" style={{
                        maxWidth: '700px',
                        backgroundColor: 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        marginBottom: '40px',
                        color: 'white',
                        textAlign: 'center',
                        padding: '30px',
                        borderRadius: '20px'
                    }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '25px', textShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>HOW IT WORKS</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
                            <div style={{ flex: '1 1 200px', minWidth: '0', padding: '15px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🗓️</div>
                                <h4 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>Daily Challenges</h4>
                                <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Each day unlocks a new life-affirming task to strengthen your connection to yourself and others.</p>
                            </div>

                            <div style={{ flex: '1 1 200px', minWidth: '0', padding: '15px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📈</div>
                                <h4 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>Progress Tracking</h4>
                                <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Watch your journey unfold as you progress through increasingly meaningful challenges.</p>
                            </div>

                            <div style={{ flex: '1 1 200px', minWidth: '0', padding: '15px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💬</div>
                                <h4 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>24/7 Support</h4>
                                <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Our AI companion is always available to guide you through dark moments.</p>
                            </div>
                        </div>
                    </div>

                    <Link to="/game" className="btn-glow" style={{
                        backgroundColor: 'white',
                        color: 'var(--primary)',
                        padding: '18px 40px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2), 0 0 15px rgba(231, 76, 60, 0.3)',
                        textDecoration: 'none',
                        textAlign: 'center',
                        maxWidth: '300px',
                        margin: '0 auto 20px',
                        letterSpacing: '1px',
                        display: 'block',
                        transition: 'all 0.3s ease'
                    }}>
                        START DAY 1
                    </Link>

                    <div style={{
                        margin: '40px auto',
                        textAlign: 'center',
                        maxWidth: '500px'
                    }}>
                        <button
                            onClick={() => setShowEmergencyMode(true)}
                            className="heartbeat"
                            style={{
                                background: 'linear-gradient(to right, #e91e63, #9c27b0)',
                                color: 'white',
                                border: 'none',
                                padding: '20px 30px',
                                borderRadius: '50px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 10px 25px rgba(233, 30, 99, 0.4), 0 0 10px rgba(233, 30, 99, 0.2)',
                                width: '100%',
                                maxWidth: '400px',
                                marginBottom: '25px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                transition: 'all 0.3s ease',
                                transform: 'scale(1.05)'
                            }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>🤍</span>
                            I'm in pain and need to talk now
                        </button>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '30px',
                            marginTop: '20px'
                        }}>
                            <Link to="/chat" style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '1.1rem',
                                padding: '10px 20px',
                                borderRadius: '30px',
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease'
                            }}>
                                Chat with AI
                            </Link>

                            <Link to="/sos" style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '1.1rem',
                                padding: '10px 20px',
                                borderRadius: '30px',
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease'
                            }}>
                                SOS Resources
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency Mode */}
            {showEmergencyMode && (
                <EmergencyMode onExit={() => setShowEmergencyMode(false)} />
            )}
        </div>
    );
};

export default Home; 