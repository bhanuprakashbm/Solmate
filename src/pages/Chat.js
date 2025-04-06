import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [firebaseError, setFirebaseError] = useState(false);
    const messagesEndRef = useRef(null);

    // Predefined responses for demo purposes
    const aiResponses = [
        "I understand that must be difficult. Would you like to talk more about what's been going on?",
        "You're not alone in feeling this way. Many people experience similar emotions.",
        "That sounds really challenging. What do you think might help you feel better right now?",
        "I'm here to listen without judgment. Would you like to explore some coping strategies together?",
        "Your feelings are valid. Would it help to focus on some breathing exercises for a moment?",
        "Sometimes just expressing our thoughts can provide some relief. Is there anything specific you'd like to discuss?",
        "Thank you for sharing that with me. It takes courage to open up about difficult feelings.",
        "I'm wondering if you've tried any relaxation techniques that have helped in the past?",
        "It's important to be gentle with yourself during tough times. What's one small thing you could do today to care for yourself?",
        "If you're feeling overwhelmed, we could try breaking down what's happening into smaller, more manageable pieces."
    ];

    useEffect(() => {
        // Create or retrieve a session ID
        const newSessionId = localStorage.getItem('chatSessionId') || uuidv4();
        if (!localStorage.getItem('chatSessionId')) {
            localStorage.setItem('chatSessionId', newSessionId);
        }
        setSessionId(newSessionId);

        // Initial greeting message
        const initialMessage = {
            id: 1,
            text: "Hello, I'm here to listen and support you. How are you feeling today?",
            sender: 'ai',
            timestamp: new Date().getTime()
        };

        if (!db) {
            console.error("Firebase Firestore is not initialized");
            setFirebaseError(true);
            setMessages([initialMessage]);
            return () => { };
        }

        // Add initial message to Firestore if this is a new session
        const fetchMessages = async () => {
            try {
                const messagesRef = db.collection('chats').doc(newSessionId).collection('messages');

                // Check if there are existing messages
                const snapshot = await messagesRef.orderBy('timestamp', 'asc').limit(50).get();

                if (snapshot.empty) {
                    // If no messages, add the initial greeting
                    await messagesRef.add({
                        ...initialMessage,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    setMessages([initialMessage]);
                } else {
                    // If there are messages, load them
                    const fetchedMessages = [];
                    snapshot.forEach(doc => {
                        fetchedMessages.push({ id: doc.id, ...doc.data() });
                    });
                    setMessages(fetchedMessages);
                }

                // Set up real-time listener
                const unsubscribe = messagesRef.orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                    const newMessages = [];
                    snapshot.forEach(doc => {
                        newMessages.push({ id: doc.id, ...doc.data() });
                    });
                    setMessages(newMessages);
                    setFirebaseError(false);
                }, error => {
                    console.error("Error listening to messages:", error);
                    setFirebaseError(true);
                });

                return unsubscribe;
            } catch (error) {
                console.error("Error fetching messages: ", error);
                // Fallback to local state if Firebase fails
                setFirebaseError(true);
                setMessages([initialMessage]);
                return () => { };
            }
        };

        const unsubscribe = fetchMessages();

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        // Create user message
        const userMessage = {
            text: input,
            sender: 'user',
            timestamp: new Date().getTime()
        };

        // Add to messages immediately for UI responsiveness
        setMessages(prev => [...prev, { id: 'temp-' + Date.now(), ...userMessage }]);
        setInput('');

        // Add to Firestore
        try {
            if (!db || firebaseError) {
                throw new Error("Firebase not available");
            }

            await db.collection('chats').doc(sessionId).collection('messages').add({
                ...userMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error("Error adding user message: ", error);
            setFirebaseError(true);
        }

        // Simulate AI thinking
        setIsTyping(true);

        // Simulate AI response after a delay
        setTimeout(async () => {
            setIsTyping(false);

            // Get random response
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

            // Create AI message
            const aiMessage = {
                text: randomResponse,
                sender: 'ai',
                timestamp: new Date().getTime()
            };

            // Add to messages immediately for UI responsiveness
            setMessages(prev => [...prev, { id: 'temp-ai-' + Date.now(), ...aiMessage }]);

            // Add to Firestore
            try {
                if (!db || firebaseError) {
                    throw new Error("Firebase not available");
                }

                await db.collection('chats').doc(sessionId).collection('messages').add({
                    ...aiMessage,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (error) {
                console.error("Error adding AI message: ", error);
                setFirebaseError(true);
            }
        }, 1500);
    };

    return (
        <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
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
                        Note: Running in offline mode. Your messages will not be saved between sessions.
                    </p>
                </div>
            )}

            <div className="card" style={{
                maxWidth: '800px',
                margin: '0 auto',
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Talk to Solmate AI</h2>

                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    minHeight: '400px'
                }}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            style={{
                                display: 'flex',
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '10px'
                            }}
                        >
                            <div style={{
                                backgroundColor: message.sender === 'user' ? 'var(--secondary)' : 'var(--primary)',
                                color: 'white',
                                padding: '10px 15px',
                                borderRadius: message.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                                maxWidth: '70%'
                            }}>
                                {message.text}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            <div style={{
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                padding: '10px 15px',
                                borderRadius: '18px 18px 18px 0',
                            }}>
                                <div className="typing-indicator" style={{ display: 'flex', gap: '5px' }}>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        animation: 'typing 1s infinite'
                                    }}></span>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        animation: 'typing 1s infinite 0.2s'
                                    }}></span>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        animation: 'typing 1s infinite 0.4s'
                                    }}></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="flex" style={{ gap: '10px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message here..."
                        style={{
                            flex: 1,
                            padding: '12px 15px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        className="btn btn-primary"
                        style={{ padding: '12px 20px' }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat; 