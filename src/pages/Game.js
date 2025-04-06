import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const Game = () => {
    const [currentDay, setCurrentDay] = useState(1);
    const [completedDays, setCompletedDays] = useState([]);
    const [showCongrats, setShowCongrats] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [firebaseError, setFirebaseError] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [tooltipDay, setTooltipDay] = useState(null);
    const [showPreviousChallenge, setShowPreviousChallenge] = useState(null);
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);

    // Define the 50-day challenge tasks
    const challenges = [
        { day: 1, text: "Write down three things you're grateful for today.", category: "Awareness" },
        { day: 2, text: "Take a 15-minute walk outside. Notice 5 beautiful things around you.", category: "Connection" },
        { day: 3, text: "Call or message someone you care about just to check in on them.", category: "Connection" },
        { day: 4, text: "Drink 8 glasses of water today. Notice how your body feels afterward.", category: "Self-Care" },
        { day: 5, text: "Write down a negative thought and challenge it with a positive counter-thought.", category: "Mind" },
        { day: 6, text: "Listen to a song that makes you feel good. Dance or move to it freely.", category: "Expression" },
        { day: 7, text: "Cook a healthy meal for yourself, even if it's simple.", category: "Self-Care" },
        { day: 8, text: "Write a short letter to your future self about your hopes.", category: "Hope" },
        { day: 9, text: "Identify and write down three personal strengths you possess.", category: "Awareness" },
        { day: 10, text: "Try a 5-minute meditation. Focus only on your breathing.", category: "Mind" },
        { day: 11, text: "Reach out to someone you haven't spoken to in a while.", category: "Connection" },
        { day: 12, text: "Go to bed 30 minutes earlier than usual. Notice how you feel tomorrow.", category: "Self-Care" },
        { day: 13, text: "Find and photograph something beautiful in your surroundings.", category: "Awareness" },
        { day: 14, text: "List three accomplishments from your past that make you proud.", category: "Awareness" },
        { day: 15, text: "Spend 15 minutes organizing a small area of your living space.", category: "Control" },
        { day: 16, text: "Write down one thing you're looking forward to tomorrow.", category: "Hope" },
        { day: 17, text: "Try a new healthy food or recipe you've never had before.", category: "Growth" },
        { day: 18, text: "Compliment someone sincerely and note their reaction.", category: "Connection" },
        { day: 19, text: "Spend 10 minutes stretching or doing gentle yoga.", category: "Body" },
        { day: 20, text: "Write a thank-you note to someone who has helped you.", category: "Gratitude" },
        { day: 21, text: "Go for a 20-minute walk without any technology.", category: "Presence" },
        { day: 22, text: "Find a quote that resonates with you and write it where you'll see it daily.", category: "Inspiration" },
        { day: 23, text: "Practice saying 'no' to something that doesn't serve your wellbeing.", category: "Boundaries" },
        { day: 24, text: "Share something you've created or an idea you have with someone else.", category: "Expression" },
        { day: 25, text: "Set a small, achievable goal for the next week.", category: "Purpose" },
        { day: 26, text: "Forgive yourself for a past mistake. Write a self-forgiveness statement.", category: "Healing" },
        { day: 27, text: "Do a random act of kindness for someone.", category: "Connection" },
        { day: 28, text: "Sit outside for 15 minutes, just observing nature.", category: "Presence" },
        { day: 29, text: "Write about a difficult experience and what you learned from it.", category: "Growth" },
        { day: 30, text: "Try a 10-minute body scan meditation, noticing sensations without judgment.", category: "Awareness" },
        { day: 31, text: "Identify an unhealthy habit and make one small change to address it.", category: "Growth" },
        { day: 32, text: "Listen to someone else's perspective without interrupting or judging.", category: "Connection" },
        { day: 33, text: "Write down three things you love about yourself.", category: "Self-Love" },
        { day: 34, text: "Try something new that slightly pushes your comfort zone.", category: "Courage" },
        { day: 35, text: "Reach out to offer support to someone who might be struggling.", category: "Compassion" },
        { day: 36, text: "List three things you're looking forward to in the next month.", category: "Hope" },
        { day: 37, text: "Spend 30 minutes doing something creative, without judgment.", category: "Expression" },
        { day: 38, text: "Identify a personal value that's important to you and how you can honor it today.", category: "Values" },
        { day: 39, text: "Write a letter expressing difficult feelings, then safely destroy it as a release.", category: "Release" },
        { day: 40, text: "Find a way to volunteer or help your community, even in a small way.", category: "Purpose" },
        { day: 41, text: "Take a different route than usual on your way somewhere familiar.", category: "Perspective" },
        { day: 42, text: "Practice self-compassion by speaking to yourself as you would a good friend.", category: "Self-Love" },
        { day: 43, text: "Start a small project that brings you joy or meaning.", category: "Purpose" },
        { day: 44, text: "Share a difficult feeling with someone you trust.", category: "Vulnerability" },
        { day: 45, text: "Make a list of 10 things that bring you joy, and do one of them today.", category: "Joy" },
        { day: 46, text: "Write a letter to someone who has positively impacted your life (send optional).", category: "Gratitude" },
        { day: 47, text: "Create a simple morning ritual for yourself to practice tomorrow.", category: "Intention" },
        { day: 48, text: "Identify negative self-talk and consciously replace it with supportive language.", category: "Mind" },
        { day: 49, text: "Write about how you've grown or changed during this challenge.", category: "Reflection" },
        { day: 50, text: "Create a self-care plan for moving forward after completing this journey.", category: "Future" }
    ];

    useEffect(() => {
        // Create or retrieve a user ID
        const fetchOrCreateUser = async () => {
            try {
                // Get stored user ID or create new one
                const storedUserId = localStorage.getItem('gameUserId') || uuidv4();
                if (!localStorage.getItem('gameUserId')) {
                    localStorage.setItem('gameUserId', storedUserId);
                }
                setUserId(storedUserId);

                // Check if Firebase is initialized
                if (!db) {
                    console.error("Firebase Firestore is not initialized");
                    setFirebaseError(true);
                    setLoading(false);
                    return;
                }

                // Check for existing game progress
                const userDocRef = db.collection('gameProgress').doc(storedUserId);
                const docSnap = await userDocRef.get();

                if (docSnap.exists) {
                    // User exists, load their progress
                    const userData = docSnap.data();
                    setCurrentDay(userData.currentDay || 1);
                    setCompletedDays(userData.completedDays || []);

                    // Check if there's a next task time
                    if (userData.nextTaskTime) {
                        const nextTime = new Date(userData.nextTaskTime).getTime();
                        const currentTime = new Date().getTime();
                        if (nextTime > currentTime) {
                            // Still waiting for next task
                            setTimeRemaining(Math.floor((nextTime - currentTime) / 1000));
                        } else {
                            // Time passed, show the current task
                            setShowTask(true);
                        }
                    } else {
                        // No next task time set, show the current task
                        setShowTask(true);
                    }

                    setFirebaseError(false);
                } else {
                    // New user, create document
                    await userDocRef.set({
                        currentDay: 1,
                        completedDays: [],
                        createdAt: new Date().toISOString(),
                        lastActive: new Date().toISOString()
                    });
                    setShowTask(true);
                    setFirebaseError(false);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error setting up game: ", error);
                // Fallback to local state
                setFirebaseError(true);
                setLoading(false);
                setShowTask(true);
            }
        };

        fetchOrCreateUser();

        // Set up the countdown timer
        if (timeRemaining !== null) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShowTask(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeRemaining]);

    const updateUserProgress = async (newDay, newCompletedDays) => {
        try {
            if (firebaseError || !db) return; // Skip updates if Firebase is not working

            // Set the next task to be available in 24 hours
            const nextTaskTime = new Date();
            nextTaskTime.setHours(nextTaskTime.getHours() + 24);

            const userDocRef = db.collection('gameProgress').doc(userId);
            await userDocRef.update({
                currentDay: newDay,
                completedDays: newCompletedDays,
                lastActive: new Date().toISOString(),
                nextTaskTime: nextTaskTime.toISOString()
            });

            return nextTaskTime;
        } catch (error) {
            console.error("Error updating progress: ", error);
            setFirebaseError(true);
            return null;
        }
    };

    const handleCompleteTask = async () => {
        if (!completedDays.includes(currentDay)) {
            const newCompletedDays = [...completedDays, currentDay];
            setCompletedDays(newCompletedDays);

            // Show completion message first
            setShowCompletionMessage(true);

            // Prepare for next day
            const nextDay = currentDay + 1;

            // Update Firebase in background
            const nextTaskTime = await updateUserProgress(nextDay, newCompletedDays);

            // Set timer for a slightly longer display of the completion message (4 seconds)
            // This gives users more time to read the encouraging message
            setTimeout(() => {
                setShowCompletionMessage(false);

                // Check if challenge is complete after showing the message
                if (nextDay > challenges.length) {
                    // Show final congratulations after a brief delay
                    setTimeout(() => {
                        setShowCongrats(true);
                    }, 500);
                } else {
                    // Move to next day after completion message closes
                    setCurrentDay(nextDay);

                    // If we're using the timer system, set up the next task time
                    if (nextTaskTime) {
                        const now = new Date();
                        const diffSeconds = Math.floor((nextTaskTime - now) / 1000);
                        setTimeRemaining(diffSeconds);
                        setShowTask(false);
                    } else {
                        // Otherwise immediately show the next task
                        setShowTask(true);
                    }
                }
            }, 4000);
        }
    };

    const formatTimeRemaining = (seconds) => {
        if (!seconds) return '';

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours}h ${minutes}m ${secs}s`;
    };

    const currentChallenge = challenges.find(c => c.day === currentDay) || challenges[0];

    // Calculate progress percentage
    const progressPercentage = ((completedDays.length / challenges.length) * 100).toFixed(0);

    // Function to handle showing previous challenge details
    const handleDayClick = (day) => {
        if (completedDays.includes(day)) {
            setShowPreviousChallenge(day);
        }
    };

    // Function to close the previous challenge modal
    const closePreviousChallenge = () => {
        setShowPreviousChallenge(null);
    };

    // Animation keyframes
    const keyframesStyle = `
        @keyframes progressBar {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(126, 87, 194, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(126, 87, 194, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(126, 87, 194, 0); }
        }
        
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px', textAlign: 'center' }}>
                <p>Loading your challenge...</p>
            </div>
        );
    }

    return (
        <div className="solmate-gradient" style={{ minHeight: '100vh', color: 'white', paddingTop: '20px', paddingBottom: '20px' }}>
            <style>{keyframesStyle}</style>

            <div className="container">
                {firebaseError && (
                    <div className="card" style={{
                        maxWidth: '800px',
                        margin: '0 auto 20px',
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        padding: '10px 15px',
                        borderRadius: '8px'
                    }}>
                        <p style={{ margin: 0 }}>
                            Note: Running in offline mode. Your progress will not be saved between sessions.
                        </p>
                    </div>
                )}

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>
                        The Solmate Challenge
                    </h1>
                    <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.1rem' }}>
                        Complete all 50 days to transform your life. One positive step at a time.
                    </p>

                    {/* Progress Bar */}
                    <div style={{
                        width: '100%',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        height: '15px',
                        borderRadius: '10px',
                        marginBottom: '15px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${progressPercentage}%`,
                            backgroundColor: 'white',
                            height: '100%',
                            borderRadius: '10px',
                            transition: 'width 0.5s ease'
                        }}></div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.1rem' }}>
                        Day {currentDay} of 50 • {progressPercentage}% Complete
                    </div>

                    {/* 50-Day Journey Visualization */}
                    <div className="card-glow" style={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        borderRadius: '16px',
                        padding: '25px',
                        marginBottom: '30px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                        position: 'relative',
                        overflow: 'visible'
                    }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary)', fontSize: '1.3rem' }}>
                            Your 50-Day Healing Journey
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(10, 1fr)',
                            gap: '8px',
                            position: 'relative',
                            padding: '10px 0',
                            width: '100%',
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            {/* Days as Circular Markers */}
                            {challenges.map((challenge, index) => {
                                const isDayCompleted = completedDays.includes(challenge.day);
                                const isCurrentDay = currentDay === challenge.day;

                                return (
                                    <div
                                        key={challenge.day}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: isDayCompleted ? 'var(--primary)' :
                                                isCurrentDay ? 'rgba(126, 87, 194, 0.8)' :
                                                    'rgba(126, 87, 194, 0.2)',
                                            color: isDayCompleted || isCurrentDay ? 'white' : 'var(--dark)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '0.85rem',
                                            position: 'relative',
                                            zIndex: 3,
                                            boxShadow: isCurrentDay ? '0 0 10px rgba(126, 87, 194, 0.8)' :
                                                isDayCompleted ? '0 0 5px rgba(126, 87, 194, 0.3)' : 'none',
                                            cursor: isDayCompleted ? 'pointer' : 'default',
                                            margin: '0 auto'
                                        }}
                                        onMouseEnter={() => setTooltipDay(challenge.day)}
                                        onMouseLeave={() => setTooltipDay(null)}
                                        onClick={() => handleDayClick(challenge.day)}
                                        title={isDayCompleted ? "Click to view details" : `Day ${challenge.day}`}
                                    >
                                        {challenge.day}

                                        {isCurrentDay && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-5px',
                                                right: '-5px',
                                                width: '14px',
                                                height: '14px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--danger)',
                                                border: '2px solid white',
                                                zIndex: 4
                                            }}></div>
                                        )}

                                        {isDayCompleted && (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '-2px',
                                                right: '-2px',
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 4,
                                                fontSize: '8px',
                                                color: 'var(--primary)'
                                            }}>
                                                ✓
                                            </div>
                                        )}

                                        {/* Tooltip for day hover */}
                                        {tooltipDay === challenge.day && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-45px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                backgroundColor: 'rgba(0,0,0,0.8)',
                                                color: 'white',
                                                padding: '6px 10px',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                width: '160px',
                                                textAlign: 'center',
                                                zIndex: 10,
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                                pointerEvents: 'none'
                                            }}>
                                                {isDayCompleted ?
                                                    `Day ${challenge.day}: ${challenge.text.substring(0, 30)}...` :
                                                    isCurrentDay ?
                                                        `Day ${challenge.day}: Current Challenge` :
                                                        `Day ${challenge.day}: Locked`}

                                                {isDayCompleted && (
                                                    <div style={{
                                                        marginTop: '3px',
                                                        fontSize: '0.65rem',
                                                        opacity: 0.8
                                                    }}>
                                                        Click to view details
                                                    </div>
                                                )}

                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '-6px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: '0',
                                                    height: '0',
                                                    borderLeft: '6px solid transparent',
                                                    borderRight: '6px solid transparent',
                                                    borderTop: '6px solid rgba(0,0,0,0.8)'
                                                }}></div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '15px',
                            marginTop: '15px',
                            flexWrap: 'wrap',
                            fontSize: '0.8rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--primary)'
                                }}></div>
                                <span style={{ color: 'var(--dark)' }}>Completed</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(126, 87, 194, 0.8)',
                                    boxShadow: '0 0 5px rgba(126, 87, 194, 0.5)'
                                }}></div>
                                <span style={{ color: 'var(--dark)' }}>Current</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(126, 87, 194, 0.2)'
                                }}></div>
                                <span style={{ color: 'var(--dark)' }}>Future</span>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '20px',
                        padding: '20px',
                        backgroundColor: 'rgba(126, 87, 194, 0.05)',
                        borderRadius: '12px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '15px',
                                height: '15px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary)'
                            }}></div>
                            <span style={{ color: 'var(--dark)', fontSize: '0.9rem' }}>Completed Days</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '15px',
                                height: '15px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(126, 87, 194, 0.8)',
                                boxShadow: '0 0 10px rgba(126, 87, 194, 0.5)'
                            }}></div>
                            <span style={{ color: 'var(--dark)', fontSize: '0.9rem' }}>Current Day</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '15px',
                                height: '15px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(126, 87, 194, 0.2)'
                            }}></div>
                            <span style={{ color: 'var(--dark)', fontSize: '0.9rem' }}>Future Days</span>
                        </div>
                    </div>

                    {/* Current Challenge Card */}
                    <div className="card-glow" style={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        color: 'var(--dark)',
                        borderRadius: '16px',
                        marginBottom: '30px',
                        padding: '30px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {showTask ? (
                            <>
                                <div style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    display: 'inline-block',
                                    padding: '5px 15px',
                                    borderRadius: '30px',
                                    fontSize: '0.9rem',
                                    marginBottom: '15px'
                                }}>
                                    {currentChallenge.category}
                                </div>

                                <h2 style={{ marginBottom: '20px', color: 'var(--primary)', fontSize: '1.8rem' }}>
                                    Day {currentChallenge.day}: Your Healing Task
                                </h2>

                                {/* Healing progress indicator */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '25px',
                                    backgroundColor: 'rgba(126, 87, 194, 0.05)',
                                    padding: '12px 15px',
                                    borderRadius: '10px'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: 'rgba(126, 87, 194, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '15px'
                                    }}>
                                        <span style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>
                                            {Math.ceil(currentDay / 10)}
                                        </span>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '3px' }}>
                                            {currentDay <= 10 ? 'Beginning Your Journey' :
                                                currentDay <= 20 ? 'Building Positive Habits' :
                                                    currentDay <= 30 ? 'Strengthening Your Foundation' :
                                                        currentDay <= 40 ? 'Deepening Your Practice' :
                                                            'Finalizing Your Transformation'}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                            {currentDay <= 10 ? 'Taking your first steps toward healing' :
                                                currentDay <= 20 ? 'Creating consistent patterns of self-care' :
                                                    currentDay <= 30 ? 'Developing deeper emotional awareness' :
                                                        currentDay <= 40 ? 'Applying new tools to challenging situations' :
                                                            'Integrating your growth for lasting change'}
                                        </div>
                                    </div>
                                </div>

                                {/* Journey Progress Context */}
                                <div style={{
                                    marginBottom: '25px',
                                    padding: '15px',
                                    borderRadius: '10px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    border: '1px solid rgba(126, 87, 194, 0.2)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '10px',
                                        borderBottom: '1px solid rgba(126, 87, 194, 0.1)',
                                        paddingBottom: '10px'
                                    }}>
                                        <div style={{
                                            color: 'var(--primary)',
                                            fontSize: '1.2rem',
                                            fontWeight: '600'
                                        }}>
                                            Your Healing Journey
                                        </div>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            backgroundColor: 'rgba(126, 87, 194, 0.1)',
                                            padding: '3px 10px',
                                            borderRadius: '20px',
                                            color: 'var(--primary)'
                                        }}>
                                            {progressPercentage}% Complete
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                                        Each task builds upon previous ones, creating a pathway to healing. Today's focus helps you develop
                                        {currentDay <= 10 ? ' awareness and mindfulness' :
                                            currentDay <= 20 ? ' consistent self-care practices' :
                                                currentDay <= 30 ? ' emotional regulation skills' :
                                                    currentDay <= 40 ? ' resilience and inner strength' :
                                                        ' integration and lasting transformation'}.
                                    </div>
                                </div>

                                <p style={{
                                    fontSize: '1.4rem',
                                    marginBottom: '30px',
                                    lineHeight: '1.6',
                                    borderLeft: '4px solid var(--primary)',
                                    paddingLeft: '20px',
                                    fontWeight: '500'
                                }}>
                                    {currentChallenge.text}
                                </p>

                                <div style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--dark)',
                                    opacity: 0.8,
                                    marginBottom: '25px',
                                    fontStyle: 'italic',
                                    textAlign: 'center'
                                }}>
                                    Take your time with this task. It's part of your healing process.
                                </div>

                                <button
                                    onClick={handleCompleteTask}
                                    className="btn-glow"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                        color: 'white',
                                        padding: '15px 30px',
                                        borderRadius: '50px',
                                        border: 'none',
                                        fontSize: '1.1rem',
                                        cursor: 'pointer',
                                        display: 'block',
                                        margin: '0 auto',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    I've Completed This Task
                                </button>
                            </>
                        ) : (
                            <>
                                <div style={{ textAlign: 'center' }}>
                                    <h2 style={{ marginBottom: '20px', color: 'var(--dark)' }}>
                                        Next Challenge Unlocks In
                                    </h2>

                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 'bold',
                                        marginBottom: '30px',
                                        color: 'var(--primary)'
                                    }}>
                                        {formatTimeRemaining(timeRemaining)}
                                    </div>

                                    <p style={{ marginBottom: '20px' }}>
                                        Return after the countdown to unlock your next healing task.
                                    </p>

                                    <p style={{ marginBottom: '20px' }}>
                                        Need support while you wait?
                                    </p>

                                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                                        <Link to="/chat" style={{
                                            backgroundColor: 'transparent',
                                            color: 'var(--primary)',
                                            padding: '15px 25px',
                                            borderRadius: '50px',
                                            textDecoration: 'none',
                                            display: 'inline-block',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            border: '2px solid var(--primary)'
                                        }}>
                                            Talk to AI
                                        </Link>
                                        <Link to="/resources" style={{
                                            backgroundColor: 'transparent',
                                            color: 'var(--primary)',
                                            padding: '15px 25px',
                                            borderRadius: '50px',
                                            textDecoration: 'none',
                                            display: 'inline-block',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            border: '2px solid var(--primary)'
                                        }}>
                                            Resources
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Previous Challenges */}
                    {completedDays.length > 0 && (
                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ marginBottom: '15px', color: 'white', textAlign: 'center' }}>Your Journey So Far</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                                {completedDays.map(day => (
                                    <div key={day} style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Need Help */}
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link to="/sos" style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '1.1rem'
                        }}>
                            Need immediate help?
                        </Link>
                    </div>
                </div>
            </div>

            {/* Completion Modal */}
            {showCongrats && (
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
                    <div className="card-glow" style={{
                        maxWidth: '600px',
                        textAlign: 'center',
                        padding: '40px',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(126, 87, 194, 0.2)'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(126, 87, 194, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 25px'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '40px'
                            }}>
                                ✓
                            </div>
                        </div>

                        <h2 style={{ color: 'var(--primary)', marginBottom: '20px', fontSize: '2rem' }}>
                            A Milestone in Your Healing Journey!
                        </h2>

                        <p style={{ marginBottom: '20px', fontSize: '1.1rem', color: 'var(--dark)' }}>
                            Completing these 50 days marks a significant milestone in your healing journey. You've demonstrated remarkable strength, courage, and commitment to your well-being.
                        </p>

                        <div style={{
                            backgroundColor: 'rgba(126, 87, 194, 0.05)',
                            padding: '20px',
                            borderRadius: '10px',
                            marginBottom: '25px',
                            borderLeft: '4px solid var(--primary)'
                        }}>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--dark)' }}>
                                "Healing is not a destination, but a journey of countless small steps. Today, celebrate how far you've come, and know that each new day offers opportunities for continued growth."
                            </p>
                        </div>

                        <h3 style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: '1.4rem' }}>
                            Your Journey Continues
                        </h3>

                        <p style={{ marginBottom: '25px', fontSize: '1.1rem', color: 'var(--dark)' }}>
                            While these 50 days have helped build a foundation for healing, remember that growth is ongoing. Continue to apply what you've learned, practice self-compassion, and celebrate each step forward.
                        </p>

                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/resources" className="btn-glow" style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                color: 'white',
                                padding: '15px 25px',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 15px rgba(126, 87, 194, 0.3)'
                            }}>
                                Continue Your Healing
                            </Link>

                            <Link to="/chat" style={{
                                backgroundColor: 'transparent',
                                color: 'var(--primary)',
                                padding: '15px 25px',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                border: '2px solid var(--primary)'
                            }}>
                                Reflect With AI
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Previous Challenge Modal */}
            {showPreviousChallenge && (
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
                    <div className="card-glow" style={{
                        maxWidth: '500px',
                        width: '90%',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '30px',
                        position: 'relative'
                    }}>
                        <button
                            onClick={closePreviousChallenge}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: 'var(--dark)',
                                opacity: 0.7
                            }}
                        >
                            ✕
                        </button>

                        {(() => {
                            const prevChallenge = challenges.find(c => c.day === showPreviousChallenge);
                            if (!prevChallenge) return null;

                            return (
                                <>
                                    <div style={{
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        display: 'inline-block',
                                        padding: '5px 15px',
                                        borderRadius: '30px',
                                        fontSize: '0.9rem',
                                        marginBottom: '20px'
                                    }}>
                                        {prevChallenge.category}
                                    </div>

                                    <h2 style={{ marginBottom: '20px', color: 'var(--dark)', fontSize: '1.8rem' }}>
                                        Day {prevChallenge.day}: Completed Challenge
                                    </h2>

                                    <p style={{
                                        fontSize: '1.2rem',
                                        marginBottom: '30px',
                                        lineHeight: '1.6',
                                        borderLeft: '4px solid var(--primary)',
                                        paddingLeft: '20px'
                                    }}>
                                        {prevChallenge.text}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: '20px',
                                        backgroundColor: 'rgba(126, 87, 194, 0.1)',
                                        padding: '15px',
                                        borderRadius: '10px'
                                    }}>
                                        <div style={{
                                            backgroundColor: 'var(--primary)',
                                            color: 'white',
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '15px',
                                            fontSize: '16px'
                                        }}>
                                            ✓
                                        </div>
                                        <span style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '500' }}>
                                            You completed this challenge!
                                        </span>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* Task Completion Message */}
            {showCompletionMessage && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div className="card-glow" style={{
                        maxWidth: '500px',
                        width: '90%',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '30px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Success animation */}
                        <div style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(126, 87, 194, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px'
                        }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '30px',
                                animation: 'pulse 1.5s infinite'
                            }}>
                                ✓
                            </div>
                        </div>

                        <h2 style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: '1.8rem' }}>
                            Healing Milestone Reached!
                        </h2>

                        <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--dark)' }}>
                            Day {currentDay} complete on your journey toward wellbeing.
                        </p>

                        {(() => {
                            // More detailed motivational messages based on progress
                            const progressStage = Math.ceil(currentDay / 10); // 1-5 stages
                            const messages = [
                                {
                                    title: "Building Your Foundation",
                                    message: "These first days are about building awareness and recognizing your inner strength. Each small step is creating the foundation for your healing journey."
                                },
                                {
                                    title: "Creating New Patterns",
                                    message: "You're establishing healthy patterns that will support your healing. Notice how these small consistent actions are beginning to shift your perspective."
                                },
                                {
                                    title: "Deepening Your Practice",
                                    message: "Halfway through! Your commitment is remarkable. These practices are becoming part of who you are, strengthening your resilience each day."
                                },
                                {
                                    title: "Integrating Your Growth",
                                    message: "The changes you're making are taking root. Your ability to care for yourself and process emotions is growing stronger with each completed day."
                                },
                                {
                                    title: "Transforming Your Journey",
                                    message: "You're nearing completion of these 50 days, but your healing journey continues. The tools you've developed will serve you long after this challenge ends."
                                }
                            ];

                            const messageData = messages[Math.min(progressStage - 1, 4)];

                            return (
                                <div style={{
                                    backgroundColor: 'rgba(126, 87, 194, 0.05)',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    marginBottom: '20px'
                                }}>
                                    <h3 style={{
                                        color: 'var(--primary)',
                                        marginBottom: '10px',
                                        fontSize: '1.3rem',
                                        borderBottom: '1px solid rgba(126, 87, 194, 0.2)',
                                        paddingBottom: '8px'
                                    }}>
                                        {messageData.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: 'var(--dark)',
                                        lineHeight: '1.5',
                                        textAlign: 'left'
                                    }}>
                                        {messageData.message}
                                    </p>
                                </div>
                            );
                        })()}

                        <div style={{
                            marginTop: '20px',
                            fontSize: '1rem',
                            color: 'var(--primary)',
                            fontWeight: '500'
                        }}>
                            Your next healing task will be ready soon...
                        </div>

                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '4px',
                            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                            animation: 'progressBar 3s linear'
                        }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game; 