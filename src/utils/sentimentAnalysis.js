/**
 * A simple rule-based sentiment analysis utility for emergency response
 * Analyzes text input to determine emotional state and suggests appropriate responses
 */

// Categories of negative emotional states to detect
const EMOTIONS = {
    SUICIDAL: {
        keywords: ['kill myself', 'suicide', 'end my life', 'die', 'not alive', 'better off dead', 'no reason to live', 'want to die'],
        intensity: 5,
        type: 'crisis'
    },
    SEVERE_DEPRESSION: {
        keywords: ['hopeless', 'worthless', 'burden', 'can\'t go on', 'never get better', 'no future', 'nothing matters', 'tired of living'],
        intensity: 4,
        type: 'depression'
    },
    SELF_HARM: {
        keywords: ['cut myself', 'hurt myself', 'harm myself', 'self-harm', 'cutting', 'feel pain'],
        intensity: 4,
        type: 'harm'
    },
    GRIEF: {
        keywords: ['lost', 'gone', 'miss them', 'died', 'grief', 'death', 'funeral', 'passed away'],
        intensity: 3,
        type: 'grief'
    },
    ANXIETY: {
        keywords: ['anxious', 'panic', 'worried', 'scared', 'fear', 'terrified', 'can\'t breathe', 'heart racing'],
        intensity: 3,
        type: 'anxiety'
    },
    LONELINESS: {
        keywords: ['alone', 'lonely', 'no one cares', 'nobody loves', 'abandoned', 'no friends', 'isolated'],
        intensity: 3,
        type: 'loneliness'
    },
    DEPRESSION: {
        keywords: ['sad', 'depressed', 'empty', 'numb', 'pointless', 'exhausted', 'no energy'],
        intensity: 2,
        type: 'depression'
    },
    ANGER: {
        keywords: ['angry', 'furious', 'hate', 'rage', 'frustrated', 'mad'],
        intensity: 2,
        type: 'anger'
    },
    GENERAL_DISTRESS: {
        keywords: ['overwhelmed', 'stressed', 'struggling', 'difficult', 'hard time', 'hurting', 'pain'],
        intensity: 1,
        type: 'distress'
    }
};

// Response templates based on emotional states
const RESPONSE_TEMPLATES = {
    crisis: [
        "I'm deeply concerned about what you're sharing. Your life matters tremendously. Can you stay with me while we talk through this? Would it help to call a crisis line right now?",
        "What you're feeling is incredibly difficult, but please know that these feelings can change. You don't have to face this alone. Would you be willing to reach out to emergency services or a trusted person right now?",
        "I hear how much pain you're in. These thoughts of harming yourself are serious, and I want you to be safe. Do you have someone nearby who can be with you right now?",
        "Your life has value and meaning, even if it doesn't feel that way right now. These intense feelings won't last forever. Can we work together on finding immediate support?",
        "I'm really concerned about your safety right now. These thoughts of ending your life require immediate attention. Would you be willing to call a crisis helpline with me right now?"
    ],

    depression: [
        "The pain you're describing sounds overwhelming. Depression can make everything feel impossible, but it doesn't mean things won't get better. What's one small thing that has brought you even a moment of peace recently?",
        "I hear how exhausted and hopeless you feel. Depression lies to us about our worth and our future. What would you say to a friend who was feeling this way?",
        "That emptiness you're describing is so difficult to bear. Even though it might not feel like it, you won't always feel this way. Would it help to talk about what might have triggered these feelings?",
        "The weight of depression can feel crushing. You're showing incredible strength just by reaching out today. Have you been able to tell anyone else about how you're feeling?",
        "When everything feels pointless, it's hard to see any way forward. But you matter, and your pain matters. What has helped you through difficult times before?"
    ],

    harm: [
        "The urge to hurt yourself must be really strong right now. Can we explore some alternatives that might help you cope with the overwhelming feelings without causing harm?",
        "Self-harm often comes from needing to release unbearable emotional pain. Would you be open to trying some safer alternatives like holding ice, snapping a rubber band, or intense exercise?",
        "I understand that self-harm can feel like the only way to cope sometimes. Your pain is valid. Would it help to talk about what's triggering these urges right now?",
        "The desire to hurt yourself shows how much emotional pain you're in. You deserve gentler ways to manage that pain. Have you ever spoken to a professional about these feelings?",
        "When the urge to self-harm comes, it can feel so overwhelming. Can we work together on a safety plan for the next time these urges arise?"
    ],

    grief: [
        "Losing someone you care about creates a pain like no other. Would you like to tell me more about the person you're missing?",
        "Grief can come in waves and hit us when we least expect it. There's no right way to grieve. How have you been honoring your feelings and memories?",
        "The empty space they left behind can feel impossible to navigate. What qualities or memories of them do you cherish the most?",
        "I'm so sorry for your loss. Grief is the price we pay for love, and it sounds like your love runs deep. How are you taking care of yourself during this difficult time?",
        "Missing someone can feel like a physical ache. Your grief is a testament to the significance of your relationship. Would it help to talk about your favorite memories together?"
    ],

    anxiety: [
        "That racing feeling can be so overwhelming. Let's try something together - can you take a slow, deep breath with me? In through your nose for 4 counts, hold for 7, out through your mouth for 8.",
        "Anxiety often makes us feel like everything is urgent and dangerous. What's one small area where you feel even slightly in control right now?",
        "When our minds race with worry, it's exhausting. Can you tell me what worries are feeling most pressing right now?",
        "Anxiety can make our body feel like it's in danger even when we're safe. Can you try to notice five things you can see right now, four things you can touch, three things you can hear?",
        "The physical sensations of anxiety can be terrifying. Please know that even though it feels awful, these sensations aren't dangerous and will pass. Can we work on grounding yourself?"
    ],

    loneliness: [
        "Feeling disconnected from others can be incredibly painful. Even though it might not feel like it right now, you're not alone in this moment - I'm here with you.",
        "Loneliness can make us feel invisible. Your feelings and experiences matter to me, and I'm listening. What kinds of connections would feel meaningful to you right now?",
        "It's so difficult to feel that no one understands or cares. You deserve to feel seen and valued. Have there been times in the past when you felt more connected?",
        "The sense that no one cares is one of the most painful feelings. I want you to know that I care about what you're going through right now. What small step might help you feel a little less alone?",
        "Feeling isolated can be as painful as physical pain. Your reaching out today shows courage. Would it feel helpful to explore ways to build meaningful connections?"
    ],

    anger: [
        "That level of anger sounds really intense to manage. Sometimes anger is protecting us from more vulnerable feelings underneath. Does that resonate with you at all?",
        "Feeling this angry can be overwhelming. Your anger is valid and deserves to be acknowledged. What do you think has triggered these strong feelings?",
        "Anger often comes when important boundaries have been crossed or needs haven't been met. What do you think your anger might be telling you right now?",
        "That frustration sounds really difficult to carry. Is there a safe way you could channel some of that energy - perhaps through movement or expression?",
        "When rage builds up, it can feel like it's going to consume us. Would it help to explore what's beneath the anger - perhaps hurt, fear, or disappointment?"
    ],

    distress: [
        "It sounds like you're carrying a lot right now. What's feeling most overwhelming at this moment?",
        "Being stretched beyond our capacity is exhausting. What's one small thing you could take off your plate, even temporarily?",
        "That sounds really challenging to navigate. What has helped you manage difficult times in the past?",
        "When we're overwhelmed, everything can feel impossible. Could we break down what you're facing into smaller pieces?",
        "It's understandable to feel this way with everything you're handling. How are you taking care of yourself during this difficult time?"
    ],

    // Default responses when no specific emotion is detected
    neutral: [
        "I'm here to listen. Could you tell me more about what's on your mind?",
        "Thank you for sharing. How long have you been feeling this way?",
        "I'm listening. What would be most helpful for you right now?",
        "I appreciate you opening up. What's been the hardest part of this for you?",
        "I'm here with you. Would it help to explore some coping strategies together?"
    ]
};

// Positive reinforcement responses for when user shows improvement
const POSITIVE_RESPONSES = [
    "I notice a bit of strength in what you just shared. Even small steps forward matter.",
    "The fact that you're reaching out shows incredible courage.",
    "I appreciate your openness. Talking about these feelings takes real bravery.",
    "You're doing something important by acknowledging these feelings rather than hiding from them.",
    "The way you're working through this difficult moment is remarkable.",
    "I hear resilience in your words, even through the pain.",
    "Your willingness to explore these difficult feelings shows inner strength.",
    "The fact that you're still here, still trying, matters tremendously."
];

// Challenge suggestions based on emotional states
const CHALLENGES = {
    crisis: [
        {
            title: "5-4-3-2-1 Grounding Exercise",
            description: "Let's try a grounding technique together. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
            timerSeconds: 120
        },
        {
            title: "Crisis Plan Creation",
            description: "Let's create a simple crisis plan. Write down 3 people you could call, 2 professional resources, and 1 personal mantra to repeat to yourself.",
            timerSeconds: 180
        }
    ],

    depression: [
        {
            title: "Tiny Joy Practice",
            description: "Think of one tiny thing that once brought you a moment of joy or peace. It could be as small as the warmth of sun on your face. Try to experience or visualize it for just 30 seconds.",
            timerSeconds: 60
        },
        {
            title: "Self-Compassion Note",
            description: "Write a brief note to yourself as if you were writing to a dear friend who was suffering exactly as you are now. What would you say to them?",
            timerSeconds: 120
        }
    ],

    harm: [
        {
            title: "Intense Sensation Exercise",
            description: "Try holding an ice cube in your hand or taking a very cold shower for 30 seconds. These intense physical sensations can help redirect the urge to harm in a safer way.",
            timerSeconds: 60
        },
        {
            title: "Emotional Release",
            description: "Tear up paper, scribble hard with a red pen, or squeeze a stress ball repeatedly. Release the emotional tension physically but safely.",
            timerSeconds: 90
        }
    ],

    anxiety: [
        {
            title: "Box Breathing",
            description: "Let's try box breathing: Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts. Repeat this cycle 4 times, visualizing tracing the sides of a box.",
            timerSeconds: 90
        },
        {
            title: "Progressive Muscle Relaxation",
            description: "Tense and then release each muscle group in your body, starting from your toes and working up to your face. Notice the contrast between tension and relaxation.",
            timerSeconds: 120
        }
    ],

    grief: [
        {
            title: "Memory Honoring",
            description: "Think of one positive memory with the person you've lost. Allow yourself to fully experience the memory for a few moments, acknowledging both the joy of having had this experience and the pain of loss.",
            timerSeconds: 90
        },
        {
            title: "Letter Writing",
            description: "Write a brief letter to the person you've lost. You might share what's been happening, what you miss about them, or what you wish you could say.",
            timerSeconds: 120
        }
    ],

    loneliness: [
        {
            title: "Digital Connection",
            description: "Send a message to someone you haven't spoken to in a while. It can be as simple as 'Just thinking of you and wanted to say hello.'",
            timerSeconds: 90
        },
        {
            title: "Self-Connection Practice",
            description: "Place your hand over your heart and speak aloud three statements beginning with 'I am...' that reflect your authentic self.",
            timerSeconds: 60
        }
    ],

    anger: [
        {
            title: "Physical Release",
            description: "Find a private space and engage in intense movement for 60 seconds - march in place, do jumping jacks, or punch the air. Physical movement can help process anger.",
            timerSeconds: 90
        },
        {
            title: "Anger Letter",
            description: "Write out everything you're angry about without censoring yourself. When finished, you can choose to destroy the letter as a symbolic release.",
            timerSeconds: 120
        }
    ],

    distress: [
        {
            title: "One Minute Breathing",
            description: "For one minute, focus only on your breathing. There's no need to change it - just notice the sensation of air moving in and out of your body.",
            timerSeconds: 90
        },
        {
            title: "Priority Focus",
            description: "Write down everything that's overwhelming you. Then circle only the one or two items that truly need your attention today.",
            timerSeconds: 120
        }
    ],

    // Default challenges when no specific emotion is detected
    neutral: [
        {
            title: "Present Moment Awareness",
            description: "Take 60 seconds to fully observe your current environment. Notice colors, textures, sounds, and sensations without judgment.",
            timerSeconds: 90
        },
        {
            title: "Gratitude Moment",
            description: "Think of three simple things present in your life right now that you can feel grateful for, no matter how small.",
            timerSeconds: 90
        }
    ]
};

/**
 * Analyzes the text for emotional sentiment and returns the detected emotion type
 * @param {string} text - The user input to analyze
 * @returns {Object} The analysis result containing emotion type and intensity
 */
export const analyzeSentiment = (text) => {
    if (!text) return { type: 'neutral', intensity: 0 };

    const lowercaseText = text.toLowerCase();
    let highestIntensity = 0;
    let detectedEmotion = 'neutral';

    // Check for crisis keywords first - these take priority
    for (const [emotion, data] of Object.entries(EMOTIONS)) {
        for (const keyword of data.keywords) {
            if (lowercaseText.includes(keyword)) {
                // If we find a crisis keyword, this takes highest priority
                if (data.intensity > highestIntensity) {
                    highestIntensity = data.intensity;
                    detectedEmotion = data.type;

                    // If this is a high-intensity crisis indicator, return immediately
                    if (data.intensity >= 4) {
                        return {
                            type: detectedEmotion,
                            intensity: highestIntensity,
                            source: emotion,
                            keyword: keyword
                        };
                    }
                }
            }
        }
    }

    return {
        type: detectedEmotion,
        intensity: highestIntensity,
        source: highestIntensity > 0 ? Object.keys(EMOTIONS).find(key => EMOTIONS[key].type === detectedEmotion) : 'NEUTRAL'
    };
};

/**
 * Gets an appropriate response template based on the sentiment analysis
 * @param {Object} sentiment - The sentiment analysis result
 * @returns {string} An appropriate response
 */
export const getResponseTemplate = (sentiment) => {
    const responseSet = RESPONSE_TEMPLATES[sentiment.type] || RESPONSE_TEMPLATES.neutral;
    const randomIndex = Math.floor(Math.random() * responseSet.length);

    // For high intensity emotions, add a compassionate prefix
    if (sentiment.intensity >= 4) {
        const prefix = "I'm really concerned about what you're sharing. ";
        return prefix + responseSet[randomIndex];
    }

    return responseSet[randomIndex];
};

/**
 * Gets a positive reinforcement response
 * @returns {string} A positive reinforcement message
 */
export const getPositiveResponse = () => {
    const randomIndex = Math.floor(Math.random() * POSITIVE_RESPONSES.length);
    return POSITIVE_RESPONSES[randomIndex];
};

/**
 * Gets a challenge suggestion based on the sentiment analysis
 * @param {Object} sentiment - The sentiment analysis result
 * @returns {Object} A challenge with title, description and timer
 */
export const getChallengeForEmotion = (sentiment) => {
    const challengeSet = CHALLENGES[sentiment.type] || CHALLENGES.neutral;
    const randomIndex = Math.floor(Math.random() * challengeSet.length);
    return challengeSet[randomIndex];
};

export default {
    analyzeSentiment,
    getResponseTemplate,
    getPositiveResponse,
    getChallengeForEmotion
}; 