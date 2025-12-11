# Manual Testing Checklist

Use this checklist to verify the application's functionality before any release.

## 1. Authentication & Onboarding

- [ ] **Registration**: Create a new user account with a valid email and password.
- [ ] **Login (Success)**: Log in with valid credentials. Verify redirection to the Game Page (`/game`).
- [ ] **Login (Failure)**: Attempt to log in with invalid credentials. Verify error message appears.
- [ ] **Session Persistence**: Close the browser tab and reopen it. Verify you are still logged in.

## 2. Game Initialization

- [ ] **Start Screen**: Verify the "Greeting Image" loads correctly.
- [ ] **Start Game**: Click "Choose Your Waifu". Verify transition to the Waifu Selection screen.
- [ ] **Waifu Selection**: Select a Waifu (e.g., Sweet, Cheerful). Verify transition to the Playing Screen.
- [ ] **Initial State**: Verify Affection is 50 and Mood is "neutral".

## 3. Core Gameplay

- [ ] **Chat Interaction**:
  - [ ] Type a message and send it.
  - [ ] Verify the "typing" indicator appears.
  - [ ] Verify the Waifu responds and the message is added to the history.
- [ ] **Affection System**:
  - [ ] Perform an action that should increase affection (e.g., nice chat, gift).
  - [ ] Verify the affection bar updates visually.
- [ ] **Gifting**:
  - [ ] Open the Gift menu.
  - [ ] Select a gift.
  - [ ] Verify the gift is removed from inventory (if applicable) and affection increases.
- [ ] **Dates**:
  - [ ] Trigger a date event.
  - [ ] Verify the background changes to the date location.
  - [ ] Complete the date and verify return to the main screen.

## 4. Settings & Audio

- [ ] **Settings Menu**: Open the Settings menu.
- [ ] **Audio Toggle**: Toggle Music and Sound Effects on/off. Verify audio changes immediately.
- [ ] **Theme**: Change the UI theme (if available) and verify colors update.

## 5. Persistence & State Management

- [ ] **Save State**: Play for a few minutes (change affection, add chat history).
- [ ] **Reload**: Refresh the browser page.
- [ ] **Resume**: Verify the game resumes from the exact same state (same Waifu, Affection level, Chat History).

## 6. Admin Panel (Admin Users Only)

- [ ] **Access**: Navigate to `/admin`.
- [ ] **Waifu Management**: Verify the list of Waifus loads.
- [ ] **Edit**: Try editing a Waifu's details (if implemented).

## 7. Responsive Design

- [ ] **Mobile View**: Open the game on a mobile device or use browser dev tools to simulate mobile.
- [ ] **Layout**: Verify all buttons and text are visible and clickable on smaller screens.
