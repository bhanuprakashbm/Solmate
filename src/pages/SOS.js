import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmergencyMode from '../components/EmergencyMode';

const SOS = () => {
    const [showGrounding, setShowGrounding] = useState(false);
    const [breathCount, setBreathCount] = useState(0);
    const [breathingActive, setBreathingActive] = useState(false);
    const [showReasons, setShowReasons] = useState(false);
    const [showEmergencyMode, setShowEmergencyMode] = useState(false);

    const startBreathingExercise = () => {
        setBreathingActive(true);
        setBreathCount(1);

        const breathingInterval = setInterval(() => {
            setBreathCount(prev => {
                if (prev >= 6) {
                    clearInterval(breathingInterval);
                    setBreathingActive(false);
                    return 0;
                }
                return prev + 1;
            });
        }, 5000); // 5 seconds per breath cycle
    };

    // Emergency contacts (India-specific)
    const emergencyContacts = [
        { id: 1, name: "AASRA Suicide Prevention", number: "9820466726", hours: "24/7" },
        { id: 2, name: "Kiran Mental Health Helpline", number: "1800-599-0019", hours: "24/7" },
        { id: 3, name: "iCall", number: "022-25521111", hours: "Mon-Sat, 8am-10pm" },
        { id: 4, name: "Emergency Services", number: "112", hours: "24/7" },
    ];

    // Grounding prompts
    const groundingPrompts = [
        { id: 1, sense: "See", prompt: "Name 5 things you can see around you right now." },
        { id: 2, sense: "Touch", prompt: "Name 4 things you can touch or feel right now." },
        { id: 3, sense: "Hear", prompt: "Name 3 things you can hear right now." },
        { id: 4, sense: "Smell", prompt: "Name 2 things you can smell right now." },
        { id: 5, sense: "Taste", prompt: "Name 1 thing you can taste right now." }
    ];

    // Reasons to live
    const reasonsToLive = [
        "Tomorrow could be the day everything changes for the better",
        "Your story is not over yet - you have so much left to write",
        "There are people who love you, even if you can't feel that right now",
        "The world needs your unique perspective and gifts",
        "You deserve to see what beautiful things await you in the future",
        "This feeling, however painful, is temporary",
        "There are still sunsets you haven't seen",
        "You have strength you haven't discovered yet",
        "Your struggle can help others facing similar challenges",
        "You are stronger than whatever is trying to defeat you"
    ];

    return (
        <div className="sos-background" style={{ minHeight: '100vh', color: 'white' }}>
            <div className="container" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <div className="card-glow" style={{
                    maxWidth: '800px',
                    margin: '0 auto 30px',
                    backgroundImage: 'linear-gradient(135deg, rgba(229, 57, 53, 0.95) 0%, rgba(227, 93, 91, 0.9) 100%)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '35px',
                    borderRadius: '20px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.25), 0 0 15px rgba(231, 76, 60, 0.3)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)',
                        pointerEvents: 'none'
                    }}></div>
                    <h1 style={{
                        fontSize: '3rem',
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        textShadow: '0 3px 10px rgba(0,0,0,0.2)',
                        letterSpacing: '2px'
                    }}>
                        SOLMATE SOS
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        marginBottom: '15px',
                        textShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        fontWeight: '300'
                    }}>
                        You matter. Your life matters. And you deserve to be here.
                    </p>
                    <p style={{
                        fontSize: '1.2rem',
                        textShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}>
                        If you are in immediate danger, please call emergency services immediately.
                    </p>
                </div>

                {/* Emergency Contacts */}
                <div className="card-glow" style={{
                    maxWidth: '800px',
                    margin: '0 auto 25px',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.15), 0 0 15px rgba(231, 76, 60, 0.1)'
                }}>
                    <h2 style={{
                        color: 'var(--primary)',
                        marginBottom: '25px',
                        fontSize: '2rem',
                        borderBottom: '2px solid var(--primary)',
                        paddingBottom: '15px',
                        textShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        Indian Helplines - Call For Help Now
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {emergencyContacts.map(contact => (
                            <a
                                key={contact.id}
                                href={`tel:${contact.number.replace(/\D/g, '')}`}
                                className="heartbeat"
                                style={{
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'linear-gradient(to right, var(--primary), #f26855)',
                                    color: 'white',
                                    padding: '20px 25px',
                                    borderRadius: '15px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 20px rgba(231, 76, 60, 0.2)',
                                    transform: contact.id === 1 ? 'scale(1.05)' : 'scale(1)'
                                }}
                            >
                                <span>
                                    <strong style={{ fontSize: '1.3rem', display: 'block', marginBottom: '5px' }}>{contact.name}</strong>
                                    <span style={{ fontSize: '1.1rem', opacity: '0.9' }}>{contact.number} • {contact.hours}</span>
                                </span>
                                <span style={{
                                    fontSize: '1.8rem',
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    width: '60px',
                                    height: '60px',
                                    minWidth: '60px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                }}>📞</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Immediate Support Options */}
                <div className="card-glow" style={{
                    maxWidth: '800px',
                    margin: '0 auto 25px',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.15), 0 0 15px rgba(231, 76, 60, 0.1)'
                }}>
                    <h2 style={{
                        color: 'var(--primary)',
                        marginBottom: '25px',
                        fontSize: '2rem',
                        borderBottom: '2px solid var(--primary)',
                        paddingBottom: '15px',
                        textShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        Immediate Support Options
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <button
                            className="btn-glow heartbeat"
                            onClick={() => setShowEmergencyMode(true)}
                            style={{
                                textAlign: 'left',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                color: 'white',
                                padding: '30px 25px',
                                borderRadius: '20px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 15px 30px rgba(233, 30, 99, 0.3), 0 0 15px rgba(233, 30, 99, 0.2)',
                                transform: 'scale(1.05)',
                                position: 'relative',
                                overflow: 'hidden',
                                zIndex: 1
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                                pointerEvents: 'none',
                                zIndex: -1
                            }}></div>
                            <span>
                                <strong style={{ fontSize: '1.6rem', display: 'block', marginBottom: '10px', fontWeight: 'bold', textShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                                    You're Not Alone - Talk To Me Right Now
                                </strong>
                                <span style={{ fontSize: '1.2rem', opacity: '0.95', lineHeight: '1.5', textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                                    I'm here to listen without judgment and help you find reasons to stay
                                </span>
                            </span>
                            <span style={{
                                fontSize: '2.5rem',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                width: '70px',
                                height: '70px',
                                minWidth: '70px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                            }}>❤️</span>
                        </button>

                        <button
                            className="btn"
                            onClick={() => setShowGrounding(true)}
                            style={{
                                textAlign: 'left',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#673ab7',
                                color: 'white',
                                padding: '20px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <span>
                                <strong style={{ fontSize: '1.2rem' }}>5-4-3-2-1 Grounding Exercise</strong><br />
                                A powerful technique to reconnect with your surroundings and calm anxiety
                            </span>
                            <span style={{
                                fontSize: '1.5rem',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>👐</span>
                        </button>

                        <button
                            className="btn"
                            onClick={startBreathingExercise}
                            style={{
                                textAlign: 'left',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#2196f3',
                                color: 'white',
                                padding: '20px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <span>
                                <strong style={{ fontSize: '1.2rem' }}>Guided Breathing</strong><br />
                                Slow, deep breaths to calm your nervous system and reduce distress
                            </span>
                            <span style={{
                                fontSize: '1.5rem',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>🫁</span>
                        </button>

                        <button
                            className="btn"
                            onClick={() => setShowReasons(true)}
                            style={{
                                textAlign: 'left',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#4caf50',
                                color: 'white',
                                padding: '20px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <span>
                                <strong style={{ fontSize: '1.2rem' }}>Reasons To Stay</strong><br />
                                Reminders of why your life matters and deserves to continue
                            </span>
                            <span style={{
                                fontSize: '1.5rem',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>💖</span>
                        </button>

                        <Link
                            to="/chat"
                            className="btn"
                            style={{
                                textAlign: 'left',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#ff9800',
                                color: 'white',
                                padding: '20px',
                                borderRadius: '10px',
                                textDecoration: 'none'
                            }}
                        >
                            <span>
                                <strong style={{ fontSize: '1.2rem' }}>Talk to AI Support</strong><br />
                                Speak with our emotionally intelligent AI companion who's always here to listen
                            </span>
                            <span style={{
                                fontSize: '1.5rem',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>💬</span>
                        </Link>
                    </div>
                </div>

                {/* Anti Blue Whale Message */}
                <div className="card-glow" style={{
                    maxWidth: '800px',
                    margin: '0 auto 25px',
                    backgroundImage: 'linear-gradient(135deg, rgba(91, 36, 122, 0.95) 0%, rgba(27, 206, 223, 0.9) 100%)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '35px',
                    borderRadius: '20px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.25), 0 0 15px rgba(91, 36, 122, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)',
                        pointerEvents: 'none'
                    }}></div>
                    <h2 style={{
                        marginBottom: '20px',
                        fontSize: '2rem',
                        textShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}>
                        The Solmate Promise
                    </h2>
                    <p style={{
                        fontSize: '1.3rem',
                        marginBottom: '25px',
                        lineHeight: '1.6',
                        textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }}>
                        Unlike harmful challenges that lead you toward darkness, the Solmate leads you toward light,
                        connection, and strength. Every day is a step toward reclaiming your life.
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '25px',
                        flexWrap: 'wrap'
                    }}>
                        <Link
                            to="/game"
                            className="btn-glow"
                            style={{
                                backgroundColor: 'white',
                                color: '#5b247a',
                                padding: '15px 30px',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                fontSize: '1.2rem',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
                            }}
                        >
                            Return to Challenge
                        </Link>
                        <Link
                            to="/"
                            className="btn"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                padding: '15px 30px',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                fontSize: '1.2rem',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.3)'
                            }}
                        >
                            Start Over
                        </Link>
                    </div>
                </div>

                {/* Affirmation */}
                <div className="card-glow" style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    textAlign: 'center',
                    padding: '35px',
                    borderRadius: '20px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.15), 0 0 15px rgba(231, 76, 60, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle at center, rgba(231, 76, 60, 0.03) 0%, rgba(231, 76, 60, 0) 70%)',
                        pointerEvents: 'none'
                    }}></div>
                    <h3 style={{
                        marginBottom: '20px',
                        color: 'var(--primary)',
                        fontSize: '1.8rem',
                        fontWeight: 'bold'
                    }}>
                        Remember
                    </h3>
                    <p style={{
                        fontSize: '1.3rem',
                        marginBottom: '20px',
                        color: 'var(--dark)',
                        lineHeight: '1.6'
                    }}>
                        This moment is temporary. Your pain is real, but it will not last forever.
                    </p>
                    <p style={{
                        fontSize: '1.3rem',
                        color: 'var(--dark)',
                        lineHeight: '1.6'
                    }}>
                        Your life is valuable and worth fighting for. You are never alone on this journey.
                    </p>
                </div>
            </div>

            {/* EmergencyMode Component */}
            {showEmergencyMode && (
                <EmergencyMode onExit={() => setShowEmergencyMode(false)} />
            )}

            {/* Grounding Exercise Modal */}
            {showGrounding && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="card" style={{
                        maxWidth: '600px',
                        padding: '30px',
                        borderRadius: '15px'
                    }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '20px', textAlign: 'center', fontSize: '1.8rem' }}>
                            The 5-4-3-2-1 Grounding Technique
                        </h2>

                        <div style={{ marginBottom: '30px' }}>
                            <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
                                This powerful technique helps bring you back to the present moment when anxiety takes over:
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {groundingPrompts.map(prompt => (
                                    <div key={prompt.id} className="card" style={{
                                        backgroundColor: 'var(--light)',
                                        borderRadius: '10px',
                                        padding: '15px',
                                        boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
                                    }}>
                                        <h3 style={{ marginBottom: '8px', color: 'var(--primary)', fontSize: '1.3rem' }}>{prompt.sense}</h3>
                                        <p style={{ fontSize: '1.1rem' }}>{prompt.prompt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={() => setShowGrounding(false)}
                                className="btn"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 30px',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                I Feel Better Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Breathing Exercise Modal */}
            {breathingActive && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="card" style={{
                        maxWidth: '500px',
                        textAlign: 'center',
                        padding: '40px',
                        borderRadius: '15px'
                    }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '30px', fontSize: '1.8rem' }}>
                            Deep Breathing
                        </h2>

                        <div
                            style={{
                                width: '220px',
                                height: '220px',
                                borderRadius: '50%',
                                margin: '0 auto 30px',
                                backgroundColor: breathCount <= 2 ? '#2196f3' : breathCount <= 4 ? '#673ab7' : '#e53935',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.8rem',
                                fontWeight: 'bold',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                transition: 'transform 0.5s ease, background-color 0.5s ease',
                                transform: breathCount <= 2
                                    ? 'scale(1.2)'
                                    : breathCount <= 4
                                        ? 'scale(1.2)'
                                        : 'scale(0.8)'
                            }}
                        >
                            {breathCount <= 2 ? 'Breathe In' : breathCount <= 4 ? 'Hold' : 'Breathe Out'}
                        </div>

                        <p style={{ marginBottom: '25px', fontSize: '1.2rem' }}>
                            Breath {Math.ceil(breathCount / 6)} of 6
                        </p>

                        <button
                            onClick={() => {
                                setBreathingActive(false);
                                setBreathCount(0);
                            }}
                            className="btn"
                            style={{
                                backgroundColor: '#f5f5f5',
                                color: 'var(--dark)',
                                border: 'none',
                                padding: '12px 25px',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Stop Exercise
                        </button>
                    </div>
                </div>
            )}

            {/* Reasons to Live Modal */}
            {showReasons && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="card" style={{
                        maxWidth: '600px',
                        padding: '30px',
                        borderRadius: '15px'
                    }}>
                        <h2 style={{ color: '#4caf50', marginBottom: '25px', textAlign: 'center', fontSize: '1.8rem' }}>
                            Reasons To Stay
                        </h2>

                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {reasonsToLive.map((reason, index) => (
                                    <div key={index} className="card" style={{
                                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                        borderRadius: '10px',
                                        padding: '15px',
                                        borderLeft: '5px solid #4caf50'
                                    }}>
                                        <p style={{ fontSize: '1.1rem', color: 'var(--dark)' }}>{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={() => setShowReasons(false)}
                                className="btn"
                                style={{
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 30px',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SOS;