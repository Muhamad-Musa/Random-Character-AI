# Random Character AI — Name & Personality Generator

## Project Overview
Random Character AI is a web application that generates unique fictional characters with a name, hobby, quirky fact, and mini description. Users can interact with the character via chat, and the character can respond in voice using text-to-speech. The app combines API data fetching, randomness, and AI-powered conversational interaction to create a fun and interactive experience.

---

## Target Users
- College students and hobbyists who enjoy interactive AI experiences.  
- Writers or game designers looking for creative character ideas.  
- Anyone curious about quirky fictional characters and AI chat interaction.

---

## Success Criteria
- Generates a random character with name, hobby, quirky fact, and description.  
- Character can respond to user input in a chat interface.  
- Character's responses can be read aloud using text-to-speech.  
- Fully front-end implementation using free APIs or browser features.  
- Easy-to-use interface with interactive elements and clear layout.

---

## User Stories
1. As a user, I can click a button to generate a new random character.  
2. As a user, I can view the character’s name, age (optional), hobby, quirky fact, and description.  
3. As a user, I can type a message to the character and receive AI-generated responses.  
4. As a user, I can listen to the character’s responses via text-to-speech.  
5. As a user, I can regenerate the character at any time to get a new profile.  
6. As a user, I can replay the character’s voice output.  
7. As a developer, I can easily replace or extend the hobby/fact arrays or AI prompts.  

---

## Non-Goals
- No backend or database required; all functionality is front-end.  
- No persistent chat history across sessions.  
- No advanced AI model training; uses free APIs or predefined prompts.  
- No complex animations or gamification (beyond simple interactivity).  

---

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **APIs:** Random User API (for names/pictures), optional Words API (for hobbies/facts)  
- **AI Interaction:** OpenAI free-tier API (or any free chatbot API)  
- **Text-to-Speech:** Browser built-in `speechSynthesis` API  
- **Development Tools:** VS Code, Live Server  

---

## Project Structure (Suggested Skeleton)
