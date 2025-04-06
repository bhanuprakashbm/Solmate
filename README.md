# Solmate - AI-Powered Emotional First-Aid Platform

Solmate is an AI-powered emotional first-aid platform designed to intercept and support individuals in suicidal distress. Inspired as the reverse of the infamous "Blue Whale" game, Solmate gamifies survival, self-worth, and emotional release.

## Challenge Overview

The Blue Whale challenge led vulnerable people down a 50-day path ending in suicide. Solmate is the antidote: a 50-day journey toward healing and reconnection.

Solmate initiates immediate conversation, redirects thoughts, and supports healing — right at the crisis moment. It provides:

- Emotionally Intelligent AI Companion (simulating a human psychologist)
- Guided "Survival Game" with life-affirming tasks
- Emergency resources and crisis support
- Coping strategies and grounding techniques
- Survivor stories for inspiration

## Demo Prototype Features

This prototype demonstrates the following key features:

1. **AI Chat Interface**: Conversation with an empathetic AI designed to provide emotional support
2. **Survival Game**: A three-level game that encourages users to complete life-affirming tasks
3. **Resources**: Helplines, survivor stories, and coping strategies
4. **Emergency SOS**: Immediate support options including breathing exercises and grounding techniques

## Firebase Integration

This project uses Firebase for backend services:

- **Firestore Database**: Stores chat messages and game progress
- **Authentication**: Anonymous session tracking
- **Cloud Storage**: Potential future use for storing user-generated content

### Data Structure

```
firestore/
  ├── chats/                # Chat conversations
  │   └── [sessionId]/      # Unique session ID
  │       └── messages/     # Messages in the conversation
  │           ├── message1  # Individual message
  │           ├── message2
  │           └── ...
  └── gameProgress/         # User game progress
      └── [userId]/         # Unique user ID
          ├── currentLevel  # Current game level
          ├── completedTasks# Array of completed task IDs
          ├── createdAt     # First session timestamp
          └── lastActive    # Last activity timestamp
```

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Firebase account (for backend functionality)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/solmate.git
cd solmate
```

2. Install dependencies
```
npm install
```