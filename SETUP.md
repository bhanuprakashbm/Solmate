# Solmate Development Setup Guide

This guide will help you set up the development environment for the Solmate project.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) (v6.0.0 or later)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)
- [Firebase account](https://firebase.google.com/) (for backend functionality)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/solmate.git
cd solmate
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all the required dependencies specified in `package.json`.

## Step 3: Firebase Setup

### Option 1: Use the Existing Firebase Project

The project is already configured to use a Firebase project. If you want to use the existing configuration, you don't need to change anything in the `src/firebase.js` file.

### Option 2: Set Up Your Own Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Copy the Firebase configuration object
5. Update the configuration in `src/firebase.js`:

```javascript
// Replace with your own Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Set Up Firestore Database

1. In the Firebase console, go to "Firestore Database"
2. Create a database in test mode
3. Set up the following collections with appropriate security rules:
   - `chats`: For storing chat messages
   - `gameProgress`: For storing user game progress

### Optional: Install Firebase Tools

For advanced Firebase functionality (like deploying to Firebase Hosting), install Firebase tools:

```bash
npm install -g firebase-tools
firebase login
firebase init
```

## Step 4: Start the Development Server

```bash
npm start
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

## Step 5: Project Structure

The project follows a standard React application structure:

```
src/
  ├── components/       # Reusable UI components
  ├── pages/            # Main application pages
  ├── firebase.js       # Firebase configuration
  ├── assets/           # Static assets
  ├── App.js            # Main application component
  ├── index.js          # Entry point
  └── index.css         # Global styles
```

### Key Files

- `src/App.js`: Contains the main routing setup
- `src/components/Navbar.js`: Navigation component
- `src/pages/`: Contains all the page components
- `src/firebase.js`: Firebase configuration and service exports

## Step 6: Available Commands

- `npm start`: Starts the development server
- `npm test`: Runs the test suite
- `npm run build`: Creates a production build in the `build` folder
- `npm run eject`: Ejects the configuration (use with caution)

## Step 7: Firebase Deployment (Optional)

To deploy the application to Firebase Hosting:

1. Ensure you have Firebase tools installed and you're logged in
2. Build the production version of the app:
   ```bash
   npm run build
   ```
3. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

## Step 8: Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the code

3. Test your changes locally:
   ```bash
   npm start
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

5. Push your changes to the repository:
   ```bash
   git push origin feature/your-feature-name
   ```

## Troubleshooting

### Common Issues

1. **Module not found errors**:
   - Make sure you've installed all dependencies with `npm install`
   - Check for typos in import statements

2. **React-router errors**:
   - Make sure all routes are correctly defined in `App.js`
   - Check that all components are correctly imported

3. **Firebase connection issues**:
   - Verify your Firebase configuration in `src/firebase.js`
   - Check Firebase console for any service disruptions
   - Ensure your Firebase security rules allow the operations you're trying to perform

4. **Styling issues**:
   - CSS custom properties are defined in `index.css`
   - Component-specific styles are defined inline in each component

### Getting Help

If you encounter any issues not covered in this guide, please:

1. Check the [React documentation](https://reactjs.org/docs/getting-started.html)
2. Check the [React Router documentation](https://reactrouter.com/docs/en/v6)
3. Check the [Firebase documentation](https://firebase.google.com/docs)
4. Open an issue in the repository with details about your problem

## Contributing Guidelines

1. Follow the existing code style and conventions
2. Write meaningful commit messages
3. Include documentation for new features
4. Test your changes thoroughly before submitting a pull request

---

Thank you for contributing to the Solmate project! Your work will help create a platform that provides crucial support to those in need. 