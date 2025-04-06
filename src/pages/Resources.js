import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
    const [activeTab, setActiveTab] = useState('helplines');

    // Sample data with India-specific helplines
    const helplines = [
        {
            id: 1,
            name: "AASRA",
            number: "9820466726",
            hours: "24/7",
            description: "A crisis response support NGO that works to prevent suicides and offer emotional support.",
            website: "http://www.aasra.info/"
        },
        {
            id: 2,
            name: "Kiran Mental Health Helpline",
            number: "1800-599-0019",
            hours: "24/7",
            description: "National toll-free helpline launched by the Ministry of Social Justice and Empowerment for psychological support and mental health services.",
            website: "https://static.pib.gov.in/WriteReadData/userfiles/FINAL%20PPT%20Mental%20Health.pdf"
        },
        {
            id: 3,
            name: "Vandrevala Foundation",
            number: "9999666555",
            hours: "24/7",
            description: "24/7 helpline for individuals experiencing mental health crises.",
            website: "https://vandrevalafoundation.com/"
        },
        {
            id: 4,
            name: "iCall",
            number: "022-25521111",
            hours: "Mon-Sat, 8am-10pm",
            description: "Email and telephone-based counseling service offering free professional counseling.",
            website: "https://icallhelpline.org/"
        },
        {
            id: 5,
            name: "SPIF - Suicide Prevention India Foundation",
            number: "Online support available",
            hours: "Varies",
            description: "Training and intervention programs for suicide prevention.",
            website: "https://www.spif.in/"
        }
    ];

    const stories = [
        {
            id: 1,
            name: "Rahul",
            age: 24,
            location: "Delhi",
            story: "I was at my lowest point in college after failing several exams. The pressure from family and my own expectations led me to consider ending it all. A friend recognized the signs and connected me with a counselor who helped me see that my life was worth more than my academic performance. Today, I'm working in a field I love and have found purpose beyond grades.",
            quote: "What seemed like the end was actually the beginning of discovering my true path."
        },
        {
            id: 2,
            name: "Priya",
            age: 31,
            location: "Mumbai",
            story: "After losing my job and going through a difficult breakup, I felt completely alone. The darkness was overwhelming, and I couldn't see a way out. I called a helpline in a moment of desperation, and the voice on the other end listened without judgment. That one conversation gave me enough hope to seek continued help. Three years later, I volunteer to help others find their way through dark times.",
            quote: "One phone call changed the course of my life. Now I help others make that same call."
        },
        {
            id: 3,
            name: "Aditya",
            age: 19,
            location: "Bangalore",
            story: "Social media bullying pushed me to the edge. Every notification brought a new wave of cruel comments and threats. I felt trapped and saw no escape. A teacher noticed my withdrawal and connected me with a support group for young people. Finding others who understood my experience helped me rebuild my confidence and develop strategies to handle the online negativity.",
            quote: "The internet tried to break me, but instead I found a community that helped rebuild me."
        },
        {
            id: 4,
            name: "Meena",
            age: 22,
            location: "Chennai",
            story: "I was attracted to the Blue Whale Challenge during a dark period when I felt misunderstood and isolated. The tasks initially seemed thrilling and gave me a sense of belonging to something. After completing several dangerous tasks, my sister discovered what I was doing. Instead of judgment, she showed me compassion and helped me find professional support. I realized I was seeking connection, not self-destruction. Now I speak to students about the dangers of these manipulative challenges.",
            quote: "What I thought was an escape was actually a trap. Real freedom came from reconnecting with people who genuinely cared about me."
        }
    ];

    const coping = [
        {
            id: 1,
            title: "Deep Breathing",
            description: "Inhale slowly for 4 counts, hold for 2, exhale for 6. This activates your parasympathetic nervous system, bringing a sense of calm.",
            icon: "🫁"
        },
        {
            id: 2,
            title: "5-4-3-2-1 Grounding",
            description: "Acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
            icon: "👐"
        },
        {
            id: 3,
            title: "Physical Movement",
            description: "Even a short walk or gentle stretching can release tension and shift your mental state.",
            icon: "🚶"
        },
        {
            id: 4,
            title: "Safely Express Emotions",
            description: "Write in a journal, talk to someone you trust, or even cry. Expressing emotions helps process them.",
            icon: "📝"
        },
        {
            id: 5,
            title: "Distraction Techniques",
            description: "Engage in an absorbing activity that requires focus, like a puzzle, detailed craft, or playing music.",
            icon: "🧩"
        },
        {
            id: 6,
            title: "Connect With Others",
            description: "Reach out to a trusted friend or family member. Social connection is one of the strongest protective factors against suicidal thoughts.",
            icon: "👥"
        },
        {
            id: 7,
            title: "Postpone Big Decisions",
            description: "Give yourself permission to wait 24 hours before making any major decision when in emotional distress.",
            icon: "⏱️"
        }
    ];

    const comparison = [
        {
            aspect: "Purpose",
            blue: "Manipulates vulnerable individuals toward self-harm and ultimately suicide through 50 days of increasingly dangerous tasks",
            red: "Guides people toward healing and life-affirmation through 50 days of increasingly meaningful positive activities"
        },
        {
            aspect: "Methodology",
            blue: "Uses isolation, sleep deprivation, and psychological manipulation to break down resistance",
            red: "Uses connection, self-care, and psychological reinforcement to build resilience"
        },
        {
            aspect: "Outcome",
            blue: "Aims to end life",
            red: "Aims to enrich life and create meaning"
        },
        {
            aspect: "Support System",
            blue: "Cuts victims off from friends and family; creates dependency on the 'curator'",
            red: "Strengthens relationships with others; builds a network of support"
        },
        {
            aspect: "Psychological Approach",
            blue: "Exploits vulnerabilities and mental health challenges",
            red: "Addresses vulnerabilities and helps develop healthy coping mechanisms"
        },
        {
            aspect: "Accessibility",
            blue: "Operates in shadows, only accessible through secret groups",
            red: "Open, transparent platform available to anyone seeking help"
        }
    ];

    return (
        <div className="solmate-gradient" style={{ minHeight: '100vh', color: 'white', paddingTop: '30px', paddingBottom: '50px' }}>
            <div className="container">
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '10px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Resources & Support
                </h1>
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    fontSize: '1.1rem',
                    maxWidth: '700px',
                    margin: '0 auto 30px'
                }}>
                    Knowledge is power. These resources can help you or someone you know navigate difficult times.
                </p>

                {/* Tabs */}
                <div className="flex justify-center mb-20" style={{
                    maxWidth: '900px',
                    margin: '0 auto 30px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50px',
                    padding: '5px'
                }}>
                    {['helplines', 'stories', 'coping', 'compare'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="btn"
                            style={{
                                background: activeTab === tab ? 'white' : 'transparent',
                                border: 'none',
                                color: activeTab === tab ? 'var(--primary)' : 'white',
                                fontSize: '1rem',
                                padding: '12px 20px',
                                borderRadius: '50px',
                                fontWeight: activeTab === tab ? 'bold' : 'normal',
                                flex: 1,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab === 'helplines' ? 'Helplines' :
                                tab === 'stories' ? 'Stories' :
                                    tab === 'coping' ? 'Coping Strategies' :
                                        'Solmate vs Blue Whale'}
                        </button>
                    ))}
                </div>

                <div className="content-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {/* Helplines */}
                    {activeTab === 'helplines' && (
                        <div>
                            <div className="card" style={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: 'var(--dark)',
                                textAlign: 'center',
                                padding: '20px',
                                marginBottom: '30px',
                                borderRadius: '12px'
                            }}>
                                <p style={{ fontSize: '1.1rem' }}>
                                    If you or someone you know is in immediate danger, please call emergency services (112) right away.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {helplines.map(helpline => (
                                    <div key={helpline.id} className="card" style={{
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        color: 'var(--dark)',
                                        borderRadius: '12px',
                                        padding: '25px',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                    }}>
                                        <h3 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1.4rem' }}>
                                            {helpline.name}
                                        </h3>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                                            <div style={{
                                                backgroundColor: 'var(--primary)',
                                                color: 'white',
                                                padding: '8px 15px',
                                                borderRadius: '50px',
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <span style={{ fontSize: '1.2rem' }}>📞</span>
                                                <span>{helpline.number}</span>
                                            </div>
                                            <div style={{
                                                backgroundColor: '#f5f5f5',
                                                padding: '6px 15px',
                                                borderRadius: '50px',
                                                fontSize: '0.9rem'
                                            }}>
                                                {helpline.hours}
                                            </div>
                                        </div>
                                        <p style={{ marginBottom: '15px' }}>{helpline.description}</p>
                                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                            <a
                                                href={`tel:${helpline.number.replace(/\D/g, '')}`}
                                                className="btn"
                                                style={{
                                                    backgroundColor: 'var(--primary)',
                                                    color: 'white',
                                                    padding: '10px 20px',
                                                    borderRadius: '50px',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}
                                            >
                                                <span>Call Now</span>
                                            </a>
                                            {helpline.website && (
                                                <a
                                                    href={helpline.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn"
                                                    style={{
                                                        backgroundColor: '#f5f5f5',
                                                        color: 'var(--dark)',
                                                        padding: '10px 20px',
                                                        borderRadius: '50px',
                                                        textDecoration: 'none',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '5px'
                                                    }}
                                                >
                                                    <span>Website</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Survivor Stories */}
                    {activeTab === 'stories' && (
                        <div>
                            <div className="card" style={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: 'var(--dark)',
                                textAlign: 'center',
                                padding: '20px',
                                marginBottom: '30px',
                                borderRadius: '12px'
                            }}>
                                <p style={{ fontSize: '1.1rem' }}>
                                    Real stories from people who have faced similar challenges and found hope on the other side.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {stories.map(story => (
                                    <div key={story.id} className="card" style={{
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        color: 'var(--dark)',
                                        borderRadius: '12px',
                                        padding: '25px',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                    }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                                            <h3 style={{ color: 'var(--primary)', marginBottom: '0', fontSize: '1.4rem' }}>
                                                {story.name}, {story.age}
                                            </h3>
                                            <div style={{
                                                backgroundColor: '#f5f5f5',
                                                padding: '5px 12px',
                                                borderRadius: '50px',
                                                fontSize: '0.9rem',
                                                display: 'inline-block'
                                            }}>
                                                {story.location}
                                            </div>
                                        </div>

                                        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>{story.story}</p>

                                        <div style={{
                                            backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                                            borderLeft: '4px solid var(--primary)',
                                            padding: '15px',
                                            borderRadius: '0 8px 8px 0',
                                            fontStyle: 'italic',
                                            marginBottom: '15px'
                                        }}>
                                            "{story.quote}"
                                        </div>

                                        <Link
                                            to="/chat"
                                            className="btn"
                                            style={{
                                                backgroundColor: 'var(--primary)',
                                                color: 'white',
                                                padding: '10px 20px',
                                                borderRadius: '50px',
                                                textDecoration: 'none',
                                                fontWeight: 'bold',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            <span>Share Your Story</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Coping Strategies */}
                    {activeTab === 'coping' && (
                        <div>
                            <div className="card" style={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: 'var(--dark)',
                                textAlign: 'center',
                                padding: '20px',
                                marginBottom: '30px',
                                borderRadius: '12px'
                            }}>
                                <p style={{ fontSize: '1.1rem' }}>
                                    Practical techniques to help manage difficult emotions and moments of crisis.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                {coping.map(strategy => (
                                    <div key={strategy.id} className="card" style={{
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        color: 'var(--dark)',
                                        borderRadius: '12px',
                                        padding: '25px',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div style={{
                                            fontSize: '2.5rem',
                                            marginBottom: '15px',
                                            textAlign: 'center'
                                        }}>
                                            {strategy.icon}
                                        </div>
                                        <h3 style={{
                                            color: 'var(--primary)',
                                            marginBottom: '10px',
                                            fontSize: '1.3rem',
                                            textAlign: 'center'
                                        }}>
                                            {strategy.title}
                                        </h3>
                                        <p style={{ flex: 1 }}>{strategy.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="card" style={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                textAlign: 'center',
                                padding: '30px',
                                marginTop: '30px',
                                borderRadius: '12px'
                            }}>
                                <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Remember</h3>
                                <p style={{ fontSize: '1.1rem' }}>
                                    These techniques are tools to help in the moment, but they are not a replacement for professional support.
                                    Always reach out to a mental health professional or helpline for sustained support.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Solmate vs Blue Whale */}
                    {activeTab === 'compare' && (
                        <div>
                            <div className="card" style={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: 'var(--dark)',
                                textAlign: 'center',
                                padding: '20px',
                                marginBottom: '30px',
                                borderRadius: '12px'
                            }}>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Understanding the Difference</h2>
                                <p style={{ fontSize: '1.1rem' }}>
                                    The Solmate Challenge was created as a direct response to combat the harmful Blue Whale Challenge.
                                    Here's how they fundamentally differ:
                                </p>
                            </div>

                            <div className="comparison-table" style={{
                                marginBottom: '30px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                            }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    padding: '15px',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                    <div>Aspect</div>
                                    <div style={{ backgroundColor: '#1565C0', padding: '10px', margin: '-5px', borderRadius: '8px' }}>Blue Whale</div>
                                    <div style={{ backgroundColor: '#C62828', padding: '10px', margin: '-5px', borderRadius: '8px' }}>Solmate</div>
                                </div>

                                {comparison.map((row, index) => (
                                    <div key={index} style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                        backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
                                        padding: '15px',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ fontWeight: 'bold', color: 'var(--dark)' }}>{row.aspect}</div>
                                        <div style={{
                                            backgroundColor: 'rgba(21, 101, 192, 0.1)',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            color: 'var(--dark)',
                                            fontSize: '0.95rem'
                                        }}>
                                            {row.blue}
                                        </div>
                                        <div style={{
                                            backgroundColor: 'rgba(198, 40, 40, 0.1)',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            color: 'var(--dark)',
                                            fontSize: '0.95rem'
                                        }}>
                                            {row.red}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="card" style={{
                                backgroundColor: 'rgba(198, 40, 40, 0.9)',
                                color: 'white',
                                padding: '25px',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ marginBottom: '15px', fontSize: '1.4rem' }}>Join the Solmate Challenge</h3>
                                <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                                    Take a stand against harmful challenges. Embrace 50 days of positive growth,
                                    connection, and healing instead.
                                </p>
                                <Link
                                    to="/game"
                                    className="btn"
                                    style={{
                                        backgroundColor: 'white',
                                        color: 'var(--primary)',
                                        padding: '12px 30px',
                                        borderRadius: '50px',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        display: 'inline-block',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Start the Challenge
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Resources; 