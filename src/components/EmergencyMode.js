import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analyzeSentiment, getResponseTemplate } from '../utils/sentimentAnalysis';
import PeerSupportChat from './PeerSupportChat';

const EmergencyMode = ({ onExit }) => {
    const [step, setStep] = useState(0);
    const [aiMessages, setAiMessages] = useState([
        { text: "Hey, I'm Mira. I notice you're going through a tough moment. Can I sit with you for a few minutes?", isAi: true }
    ]);
    const [userInput, setUserInput] = useState('');
    const [challenge, setChallenge] = useState(null);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [videoIndex, setVideoIndex] = useState(0);
    const [sentiment, setSentiment] = useState('neutral');
    const [showPeerSupport, setShowPeerSupport] = useState(false);

    // Mira is our AI companion with a background story
    const aiPersonality = {
        name: "Mira",
        background: "A 28-year-old who survived her own mental health crisis and now helps others through their dark moments.",
        style: "Warm, genuine, never judgemental. Speaks from experience, not theory."
    };

    // Positive challenges (opposite of the Blue Whale)
    const positiveChallengeSeries = [
        {
            title: "Level 1: Small Light",
            description: "Watch this 30-second video of a puppy being silly. Allow yourself to smile.",
            completionText: "You just brought some light into your day. That's a win. Want to try the next level?",
            action: () => setShowVideo(true)
        },
        {
            title: "Level 2: Paper Anchor",
            description: "Write down one good memory from your past. It can be small - like the taste of your favorite food or a kind word someone once said.",
            completionText: "You've connected to something positive in your life. This memory is proof that good moments exist.",
            action: null
        },
        {
            title: "Level 3: Connection Bridge",
            description: "Send a simple message to someone. It can be as simple as 'Hey' or a funny meme. Just reach out.",
            completionText: "You've taken a brave step to connect. Connection is what keeps us here.",
            action: null
        },
        {
            title: "Level 4: Five-Minute Future",
            description: "Spend 5 minutes imagining one thing you're curious to see in the future. A technology, a place, or even tomorrow's weather.",
            completionText: "Curiosity is a powerful force. It keeps us wanting to see what's next.",
            action: () => {
                setTimerActive(true);
                setTimer(300); // 5 minutes in seconds
            }
        }
    ];

    // Videos from survivors (would be real testimonials in production)
    const survivorVideos = [
        {
            name: "Rahul, 24",
            text: "Two years ago, I was ready to end everything after failing my exams. Today, I run a small business teaching art. I'm so glad I stayed.",
            videoUrl: "https://example.com/video1.mp4"
        },
        {
            name: "Priya, 19",
            text: "After my breakup, I felt worthless and alone. I'm so grateful I called the helpline instead of making a permanent decision. Life does get better.",
            videoUrl: "https://example.com/video2.mp4"
        },
        {
            name: "Vikram, 30",
            text: "Depression convinced me I was a burden to everyone. But my sister never gave up on me. Now I get to be an uncle to her kids. I would have missed so much.",
            videoUrl: "https://example.com/video3.mp4"
        }
    ];

    // Mind escape journeys
    const mindEscapes = [
        {
            title: "Mountain Stargazing",
            text: "Close your eyes. You're lying on soft grass on a mountain top. The air is cool but comfortable. Above you, thousands of stars shine like diamonds. Your breathing slows. You're safe here, just watching the universe above you."
        },
        {
            title: "Ocean Waves",
            text: "Close your eyes. You're sitting on warm sand. Gentle waves roll in and out, creating a rhythm. The sound of water washes away your thoughts. With each wave, tension flows out of your body. You're simply present, here by the sea."
        },
        {
            title: "Forest Sanctuary",
            text: "Close your eyes. You're in a sunlit forest. Dappled light filters through leaves above you. Birds call gently in the distance. The scent of earth and trees fills your lungs. Each breath connects you to this peaceful place. You're protected here."
        }
    ];

    // AI responses based on common crisis expressions
    const getAIResponse = (input) => {
        // Use our sentiment analysis utility
        const detectedSentiment = analyzeSentiment(input);
        setSentiment(detectedSentiment);

        return {
            text: getResponseTemplate(detectedSentiment),
            isAi: true
        };
    };

    // Handle timer countdown
    useEffect(() => {
        let interval = null;
        if (timerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        } else if (timer === 0 && timerActive) {
            setTimerActive(false);
            // Show completion message when timer ends
            if (challenge) {
                setAiMessages([...aiMessages, { text: challenge.completionText, isAi: true }]);
            }
        }
        return () => clearInterval(interval);
    }, [timerActive, timer, aiMessages, challenge]);

    // Handle user message submission
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        // Add user message
        const newMessages = [...aiMessages, { text: userInput, isAi: false }];
        setAiMessages(newMessages);

        // Generate AI response
        setTimeout(() => {
            const aiResponse = getAIResponse(userInput);
            setAiMessages([...newMessages, aiResponse]);

            // If sentiment indicates crisis, offer the first challenge
            if (sentiment === 'crisis' || sentiment === 'negative') {
                setTimeout(() => {
                    const firstChallenge = positiveChallengeSeries[0];
                    setChallenge(firstChallenge);
                    setAiMessages(prev => [...prev, {
                        text: `I'd like to suggest something: ${firstChallenge.title} - ${firstChallenge.description}`,
                        isAi: true
                    }]);
                }, 2000);
            }
        }, 1000);

        setUserInput('');
    };

    // Handle challenge acceptance
    const handleAcceptChallenge = () => {
        // Execute the challenge action if it exists
        if (challenge.action) {
            challenge.action();
        }

        // Move to the next challenge when current one is completed
        const currentIndex = positiveChallengeSeries.findIndex(c => c.title === challenge.title);
        if (currentIndex < positiveChallengeSeries.length - 1) {
            setTimeout(() => {
                const nextChallenge = positiveChallengeSeries[currentIndex + 1];
                setChallenge(nextChallenge);
                setAiMessages(prev => [...prev, {
                    text: `Ready for the next level? ${nextChallenge.title} - ${nextChallenge.description}`,
                    isAi: true
                }]);
            }, 2000);
        } else {
            // If all challenges completed
            setTimeout(() => {
                setAiMessages(prev => [...prev, {
                    text: "You've completed all the challenges. That shows incredible strength. How are you feeling now?",
                    isAi: true
                }]);
                setChallenge(null);
            }, 2000);
        }
    };

    // Format time from seconds to MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    // Render different steps of the emergency mode
    const renderStep = () => {
        switch (step) {
            case 0: // AI Chat
                return (
                    <div className="emergency-chat" style={{
                        maxHeight: '75vh',
                        overflowY: 'auto',
                        padding: '25px',
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1513279922550-250c2129b13a?q=80&w=1770&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '20px',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ marginBottom: '25px' }}>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                padding: '25px',
                                borderRadius: '15px',
                                marginBottom: '30px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--primary), #f26855)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '20px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1.5rem',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                                    }}>
                                        {aiPersonality.name[0]}
                                    </div>
                                    <div>
                                        <strong style={{ fontSize: '1.4rem', color: 'white', display: 'block', marginBottom: '3px', textShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>{aiPersonality.name}</strong>
                                        <p style={{ fontSize: '1rem', opacity: '0.9', margin: '0', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                                            {aiPersonality.background}
                                        </p>
                                    </div>
                                </div>
                                <p style={{
                                    color: 'white',
                                    marginBottom: '0',
                                    marginTop: '10px',
                                    fontSize: '1.15rem',
                                    lineHeight: '1.6',
                                    textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                }}>
                                    I'm here to help you find your way through this darkness. Whatever you're feeling right now,
                                    you won't have to face it alone. Let's take this moment together.
                                </p>
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                {aiMessages.map((message, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            justifyContent: message.isAi ? 'flex-start' : 'flex-end',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: message.isAi ? 'rgba(255,255,255,0.95)' : 'rgba(231, 76, 60, 0.85)',
                                                color: message.isAi ? 'var(--dark)' : 'white',
                                                padding: '18px 25px',
                                                borderRadius: message.isAi ? '0 25px 25px 25px' : '25px 0 25px 25px',
                                                maxWidth: '80%',
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                                fontSize: '1.1rem',
                                                lineHeight: '1.6',
                                                animation: 'fadeIn 0.4s ease-in-out',
                                                border: message.isAi ? 'none' : '1px solid rgba(255,255,255,0.2)'
                                            }}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Challenge Box - more immersive */}
                            {challenge && (
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                                    padding: '30px',
                                    borderRadius: '20px',
                                    marginBottom: '30px',
                                    color: 'var(--dark)',
                                    textAlign: 'center',
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    animation: 'fadeIn 0.5s ease-out',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '5px',
                                        background: 'linear-gradient(to right, var(--primary), #f26855)',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px'
                                    }}></div>

                                    <h3 style={{
                                        color: 'var(--primary)',
                                        marginBottom: '15px',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold'
                                    }}>{challenge.title}</h3>
                                    <p style={{
                                        marginBottom: '25px',
                                        fontSize: '1.2rem',
                                        lineHeight: '1.6',
                                        color: '#2c3e50',
                                        padding: '0 10px'
                                    }}>{challenge.description}</p>

                                    {timerActive && (
                                        <div style={{
                                            fontSize: '3rem',
                                            fontWeight: 'bold',
                                            margin: '25px 0',
                                            color: 'var(--primary)',
                                            fontFamily: 'monospace'
                                        }}>
                                            {formatTime(timer)}
                                        </div>
                                    )}

                                    <button
                                        className="btn-glow"
                                        onClick={handleAcceptChallenge}
                                        style={{
                                            background: 'linear-gradient(to right, var(--primary), #f26855)',
                                            color: 'white',
                                            padding: '15px 35px',
                                            borderRadius: '50px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1.15rem',
                                            fontWeight: 'bold',
                                            boxShadow: '0 10px 20px rgba(231, 76, 60, 0.3)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        I've Completed This Step
                                    </button>
                                </div>
                            )}

                            {/* Survivor Video - more immersive */}
                            {showVideo && (
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                                    padding: '30px',
                                    borderRadius: '20px',
                                    marginBottom: '30px',
                                    color: 'var(--dark)',
                                    textAlign: 'center',
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    animation: 'fadeIn 0.5s ease-out'
                                }}>
                                    <h3 style={{
                                        color: 'var(--primary)',
                                        marginBottom: '20px',
                                        fontSize: '1.5rem',
                                        position: 'relative',
                                        display: 'inline-block'
                                    }}>
                                        <span style={{ position: 'relative', zIndex: 1 }}>
                                            A Message from {survivorVideos[videoIndex].name}
                                        </span>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-3px',
                                            left: '0',
                                            width: '100%',
                                            height: '8px',
                                            background: 'rgba(231, 76, 60, 0.2)',
                                            zIndex: 0,
                                            borderRadius: '4px'
                                        }}></div>
                                    </h3>

                                    <div style={{
                                        width: '100%',
                                        height: '250px',
                                        backgroundColor: '#111',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        marginBottom: '25px',
                                        borderRadius: '15px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundImage: 'url("https://images.unsplash.com/photo-1522008342704-6b265b543c37?q=80&w=1974&auto=format&fit=crop")',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            opacity: 0.3,
                                            filter: 'blur(2px)'
                                        }}></div>
                                        <div style={{ position: 'relative', textAlign: 'center' }}>
                                            <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🎬</div>
                                            <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>Survivor's Video Testimony</p>
                                        </div>
                                    </div>

                                    <div style={{
                                        position: 'relative',
                                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                                        padding: '30px',
                                        borderRadius: '15px',
                                        marginBottom: '25px',
                                        textAlign: 'left'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            left: '15px',
                                            fontSize: '3rem',
                                            color: 'rgba(231, 76, 60, 0.2)',
                                            fontFamily: 'Georgia, serif'
                                        }}>"</div>
                                        <p style={{
                                            fontStyle: 'italic',
                                            fontSize: '1.2rem',
                                            lineHeight: '1.8',
                                            margin: '10px 0',
                                            paddingLeft: '30px',
                                            paddingRight: '30px',
                                            color: '#2c3e50'
                                        }}>
                                            {survivorVideos[videoIndex].text}
                                        </p>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '5px',
                                            right: '15px',
                                            fontSize: '3rem',
                                            color: 'rgba(231, 76, 60, 0.2)',
                                            fontFamily: 'Georgia, serif'
                                        }}>"</div>
                                    </div>

                                    <button
                                        className="btn-glow"
                                        onClick={() => {
                                            setShowVideo(false);
                                            handleAcceptChallenge();
                                        }}
                                        style={{
                                            background: 'linear-gradient(to right, var(--primary), #f26855)',
                                            color: 'white',
                                            padding: '15px 35px',
                                            borderRadius: '50px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1.15rem',
                                            fontWeight: 'bold',
                                            boxShadow: '0 10px 20px rgba(231, 76, 60, 0.3)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Thank you for sharing your story
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSendMessage} style={{
                                display: 'flex',
                                gap: '15px',
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                padding: '20px',
                                borderRadius: '50px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                            }}>
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Tell me what you're feeling right now..."
                                    style={{
                                        flex: 1,
                                        padding: '18px 25px',
                                        borderRadius: '30px',
                                        border: 'none',
                                        backgroundColor: 'rgba(255,255,255,0.95)',
                                        color: 'var(--dark)',
                                        fontSize: '1.1rem',
                                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)'
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="btn-glow"
                                    style={{
                                        background: 'linear-gradient(to right, var(--primary), #f26855)',
                                        color: 'white',
                                        padding: '18px 30px',
                                        borderRadius: '30px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        boxShadow: '0 10px 20px rgba(231, 76, 60, 0.3)',
                                        transition: 'all 0.3s ease',
                                        minWidth: '100px'
                                    }}
                                >
                                    Send
                                </button>
                            </form>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            justifyContent: 'center',
                            marginTop: '30px',
                            flexWrap: 'wrap',
                            padding: '0 10px'
                        }}>
                            <button
                                onClick={() => setStep(1)}
                                className="btn-glow"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    color: 'white',
                                    padding: '15px 25px',
                                    borderRadius: '50px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(5px)',
                                    fontWeight: 'bold',
                                    fontSize: '1.05rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                }}
                            >
                                <span style={{ fontSize: '1.3rem' }}>🧠</span> Peaceful Mind Escape
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="btn-glow"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    color: 'white',
                                    padding: '15px 25px',
                                    borderRadius: '50px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(5px)',
                                    fontWeight: 'bold',
                                    fontSize: '1.05rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                }}
                            >
                                <span style={{ fontSize: '1.3rem' }}>🌟</span> Stories of Hope
                            </button>

                            <Link
                                to="/sos"
                                className="btn-glow"
                                style={{
                                    backgroundColor: 'rgba(192, 57, 43, 0.8)',
                                    color: 'white',
                                    padding: '15px 25px',
                                    borderRadius: '50px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '1.05rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 10px 20px rgba(192, 57, 43, 0.4)'
                                }}
                            >
                                <span style={{ fontSize: '1.3rem' }}>☎️</span> Emergency Helplines
                            </Link>
                        </div>
                    </div>
                );

            case 1: // Mind Escape Journeys
                return (
                    <div className="mind-escape" style={{ padding: '20px' }}>
                        <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
                            5-Minute Mind Escape
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                            {mindEscapes.map((escape, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease',
                                        color: 'var(--dark)'
                                    }}
                                    onClick={() => {
                                        setAiMessages([
                                            ...aiMessages,
                                            { text: escape.text, isAi: true }
                                        ]);
                                        setStep(0);
                                    }}
                                >
                                    <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>{escape.title}</h3>
                                    <p style={{ marginBottom: '0' }}>
                                        A guided journey to help you mentally escape for a few minutes.
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={() => setStep(0)}
                                className="btn"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '25px',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Back to Chat
                            </button>
                        </div>
                    </div>
                );

            case 2: // Survivor Stories
                return (
                    <div className="survivor-stories" style={{ padding: '20px' }}>
                        <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
                            Stories of Hope
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                            {survivorVideos.map((video, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        color: 'var(--dark)'
                                    }}
                                >
                                    <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>{video.name}</h3>

                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundColor: '#111',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        marginBottom: '15px',
                                        borderRadius: '8px'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎬</div>
                                            <p>Video Testimonial</p>
                                        </div>
                                    </div>

                                    <p style={{
                                        fontStyle: 'italic',
                                        backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                                        padding: '15px',
                                        borderRadius: '8px'
                                    }}>
                                        "{video.text}"
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={() => setStep(0)}
                                className="btn"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '25px',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Back to Chat
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div
            className="emergency-background"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9999,
                overflowY: 'auto',
                backgroundImage: 'linear-gradient(135deg, rgba(231, 76, 60, 0.95) 0%, rgba(192, 57, 43, 0.95) 100%)',
                animation: 'gradientMove 15s ease infinite'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1525121211281-e73f06b6faed?q=80&w=1770&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.1,
                    mixBlendMode: 'overlay',
                    zIndex: -1
                }}
            ></div>

            <div className="container">
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '30px 0'
                    }}>
                        <h1 style={{
                            color: 'white',
                            margin: 0,
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            textShadow: '0 3px 10px rgba(0,0,0,0.3)',
                            letterSpacing: '1px'
                        }}>
                            You're Not Alone
                        </h1>

                        <button
                            onClick={onExit}
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: 'white',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.3rem',
                                cursor: 'pointer',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {showPeerSupport ? (
                        <PeerSupportChat onClose={() => setShowPeerSupport(false)} />
                    ) : (
                        renderStep()
                    )}

                    {!showPeerSupport && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '40px' }}>
                            <button
                                onClick={() => setShowPeerSupport(true)}
                                className="btn-glow heartbeat"
                                style={{
                                    background: 'linear-gradient(to right, #3498db, #2980b9)',
                                    color: 'white',
                                    padding: '18px 35px',
                                    borderRadius: '50px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    boxShadow: '0 10px 20px rgba(52, 152, 219, 0.4), 0 0 10px rgba(52, 152, 219, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    transform: 'scale(1.05)'
                                }}
                            >
                                <span style={{ fontSize: '1.4rem' }}>👥</span>
                                Talk to a Real Person Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmergencyMode; 