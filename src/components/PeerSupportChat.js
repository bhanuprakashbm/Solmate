import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

/**
 * PeerSupportChat component provides an anonymous chat interface 
 * for users to connect with trained volunteers or peers
 */
const PeerSupportChat = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [username, setUsername] = useState('');
    const [chatRoom, setChatRoom] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [volunteers, setVolunteers] = useState([
        { id: 'volunteer1', name: 'Aisha (Volunteer)', isOnline: true, specialty: 'Depression, Anxiety' },
        { id: 'volunteer2', name: 'Raj (Peer Supporter)', isOnline: true, specialty: 'Self-harm recovery' },
        { id: 'volunteer3', name: 'Maya (Counselor)', isOnline: false, specialty: 'Crisis intervention' }
    ]);

    // Generate a random username for anonymity
    useEffect(() => {
        const adjectives = ['Brave', 'Hopeful', 'Resilient', 'Kind', 'Strong', 'Gentle', 'Peaceful'];
        const nouns = ['Explorer', 'Journey', 'Voyager', 'Spirit', 'Heart', 'Mind', 'Soul'];

        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const randomNumber = Math.floor(Math.random() * 100);

        setUsername(`${randomAdjective}${randomNoun}${randomNumber}`);
    }, []);

    // Connect to chat room
    const connectToVolunteer = (volunteerId) => {
        setIsConnecting(true);

        try {
            // In a real implementation, this would create/connect to a Firestore chat room
            const selectedVolunteer = volunteers.find(v => v.id === volunteerId);

            if (!selectedVolunteer) {
                throw new Error('Volunteer not found');
            }

            if (!selectedVolunteer.isOnline) {
                throw new Error('This volunteer is currently offline');
            }

            // Simulate connection delay
            setTimeout(() => {
                setChatRoom(volunteerId);
                setIsConnected(true);
                setIsConnecting(false);

                // Add welcome message
                setMessages([
                    {
                        id: 'system-1',
                        sender: 'system',
                        text: `You are now connected with ${selectedVolunteer.name}. This chat is anonymous.`,
                        timestamp: new Date().toISOString()
                    },
                    {
                        id: 'volunteer-1',
                        sender: selectedVolunteer.name,
                        text: `Hi there ${username}, I'm ${selectedVolunteer.name.split(' ')[0]}. Thank you for reaching out. How can I support you today?`,
                        timestamp: new Date().toISOString()
                    }
                ]);
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message);
            setIsConnecting(false);
        }
    };

    // Send message
    const sendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const newMessage = {
            id: `user-${Date.now()}`,
            sender: username,
            text: userInput,
            timestamp: new Date().toISOString()
        };

        setMessages([...messages, newMessage]);
        setUserInput('');

        // Simulate volunteer response after a short delay
        setTimeout(() => {
            const selectedVolunteer = volunteers.find(v => v.id === chatRoom);
            const responseMessage = {
                id: `volunteer-${Date.now()}`,
                sender: selectedVolunteer.name,
                text: getAutomaticResponse(userInput),
                timestamp: new Date().toISOString()
            };

            setMessages(prevMessages => [...prevMessages, responseMessage]);
        }, 3000);
    };

    // Get an automatic response (in a real app, this would be from a real volunteer)
    const getAutomaticResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();

        if (lowerCaseMessage.includes('suicide') ||
            lowerCaseMessage.includes('kill myself') ||
            lowerCaseMessage.includes('die')) {
            return "I'm really concerned about what you're sharing. Your life matters deeply. Can we talk more about what's happening? I'm here to listen without judgment.";
        }

        if (lowerCaseMessage.includes('hopeless') ||
            lowerCaseMessage.includes('no point') ||
            lowerCaseMessage.includes('worthless')) {
            return "It sounds like you're carrying some really heavy feelings right now. I've felt that way too. Would you like to share more about what's making you feel this way?";
        }

        if (lowerCaseMessage.includes('thanks') ||
            lowerCaseMessage.includes('thank you')) {
            return "You're welcome. I'm glad we could connect today. Remember you can always come back to talk more.";
        }

        if (lowerCaseMessage.includes('bye') ||
            lowerCaseMessage.includes('goodbye')) {
            return "Take care of yourself. Remember you're not alone, and you can always return to chat when you need support.";
        }

        // Default responses
        const defaultResponses = [
            "Thank you for sharing that with me. Can you tell me more?",
            "I'm here with you. What else is on your mind?",
            "That sounds difficult. How long have you been feeling this way?",
            "I appreciate you trusting me with your thoughts. What would help you feel a bit better right now?",
            "I'm listening. Please continue when you're ready."
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    // Disconnect from chat
    const disconnectChat = () => {
        setMessages([...messages, {
            id: 'system-disconnect',
            sender: 'system',
            text: 'You have disconnected from the chat. Thank you for reaching out for support.',
            timestamp: new Date().toISOString()
        }]);

        setTimeout(() => {
            setIsConnected(false);
            setChatRoom('');
        }, 2000);
    };

    return (
        <div style={{
            height: '75vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative'
        }}>
            {/* Header */}
            <div style={{
                padding: '20px 25px',
                backgroundColor: 'linear-gradient(to right, #3498db, #2980b9)',
                background: 'linear-gradient(135deg, #3498db, #2980b9)',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        fontSize: '1.3rem',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                    }}>
                        👥
                    </div>

                    <div>
                        <h2 style={{ margin: '0', fontSize: '1.5rem', textShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
                            {isConnecting ? 'Connecting...' : 'Peer Support'}
                        </h2>
                        <p style={{ margin: '5px 0 0', fontSize: '0.95rem', opacity: '0.9' }}>
                            {isConnecting ? 'Finding an available counselor' : 'Safe, confidential conversation'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    ✕
                </button>
            </div>

            {/* Support person info */}
            {isConnected && !isConnecting && (
                <div style={{
                    padding: '20px 25px',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundImage: `url(${volunteers.find(v => v.id === chatRoom)?.avatar})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                        border: '3px solid white'
                    }}></div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h3 style={{ margin: '0', fontSize: '1.2rem', color: '#2c3e50' }}>
                                {volunteers.find(v => v.id === chatRoom)?.name}
                            </h3>
                            <div style={{
                                backgroundColor: '#27ae60',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                boxShadow: '0 0 5px #27ae60'
                            }}></div>
                        </div>
                        <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>
                            <strong>{volunteers.find(v => v.id === chatRoom)?.specialty}</strong> • {volunteers.find(v => v.id === chatRoom)?.isOnline ? 'Online' : 'Offline'}
                        </p>
                    </div>
                </div>
            )}

            {/* Chat area */}
            <div style={{
                flex: 1,
                padding: '25px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                backgroundImage: 'url("https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                backgroundColor: 'rgba(255, 255, 255, 0.85)'
            }}>
                {isConnecting ? (
                    <div style={{
                        alignSelf: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        padding: '25px 40px',
                        borderRadius: '15px',
                        textAlign: 'center',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        marginTop: '50px',
                        animation: 'pulse 2s infinite',
                        border: '1px solid rgba(52, 152, 219, 0.3)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔄</div>
                        <h3 style={{ margin: '0 0 10px', fontSize: '1.4rem', color: '#3498db' }}>
                            Connecting you with a support person
                        </h3>
                        <p style={{ margin: '0', color: '#7f8c8d', lineHeight: '1.6' }}>
                            We're finding someone who is trained to help with your situation.
                            <br />This usually takes less than a minute...
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{
                                    alignSelf: message.sender === username ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}
                            >
                                {!message.sender === username && index > 0 && (
                                    <div style={{
                                        fontSize: '0.85rem',
                                        color: '#7f8c8d',
                                        marginBottom: '5px',
                                        marginLeft: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}>
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            backgroundImage: `url(${volunteers.find(v => v.id === chatRoom)?.avatar})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                            marginRight: '5px'
                                        }}></div>
                                        {message.sender}
                                    </div>
                                )}

                                <div style={{
                                    backgroundColor: message.sender === username ? '#3498db' : 'white',
                                    color: message.sender === username ? 'white' : '#34495e',
                                    padding: '15px 20px',
                                    borderRadius: message.sender === username ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                                    fontSize: '1.05rem',
                                    lineHeight: '1.6',
                                    border: message.sender === username ? 'none' : '1px solid rgba(0, 0, 0, 0.05)'
                                }}>
                                    {message.text}
                                </div>

                                <div style={{
                                    fontSize: '0.8rem',
                                    color: '#95a5a6',
                                    marginTop: '5px',
                                    textAlign: message.sender === username ? 'right' : 'left',
                                    paddingLeft: message.sender === username ? '0' : '10px',
                                    paddingRight: message.sender === username ? '10px' : '0'
                                }}>
                                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Input area */}
            <form
                onSubmit={sendMessage}
                style={{
                    display: 'flex',
                    padding: '25px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    gap: '15px'
                }}
            >
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={isConnecting ? "Connecting to support..." : "Type your message here..."}
                    disabled={isConnecting}
                    style={{
                        flex: 1,
                        padding: '18px 25px',
                        borderRadius: '30px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        fontSize: '1.05rem',
                        backgroundColor: isConnecting ? '#f8f9fa' : 'white',
                        boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)'
                    }}
                />

                <button
                    type="submit"
                    disabled={isConnecting}
                    className="btn-glow"
                    style={{
                        background: isConnecting ? '#bdc3c7' : 'linear-gradient(to right, #3498db, #2980b9)',
                        color: 'white',
                        padding: '18px 30px',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: isConnecting ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        opacity: isConnecting ? 0.7 : 1,
                        boxShadow: isConnecting ? 'none' : '0 10px 20px rgba(52, 152, 219, 0.3)',
                        minWidth: '100px'
                    }}
                >
                    Send
                </button>
            </form>

            {/* Safety info */}
            <div style={{
                padding: '15px',
                backgroundColor: 'rgba(52, 152, 219, 0.05)',
                color: '#7f8c8d',
                fontSize: '0.85rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
                <p style={{ margin: '0' }}>
                    If you're in immediate danger, please call <a href="tel:112" style={{ color: '#3498db', fontWeight: 'bold' }}>112</a> or your local emergency number
                </p>
            </div>
        </div>
    );
};

export default PeerSupportChat; 