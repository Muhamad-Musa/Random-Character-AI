<template>
  <div class="chat-page">
    <h1>Chat with Your Character</h1>
    <div class="chat-container">
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.type]">
          {{ message.text }}
        </div>
      </div>
      <div class="input-area">
        <input v-model="newMessage" 
               @keyup.enter="sendMessage" 
               placeholder="Type your message..." />
        <button @click="sendMessage">Send</button>
        <button @click="playVoice" class="voice-btn">
          Play Voice Response
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([
  { text: 'Hello! I\'m your character. What would you like to talk about?', type: 'character' }
])
const newMessage = ref('')

function sendMessage() {
  if (!newMessage.value.trim()) return
  
  messages.value.push({ text: newMessage.value, type: 'user' })
  newMessage.value = ''
  
  // Simulate character response
  setTimeout(() => {
    messages.value.push({ 
      text: 'That\'s interesting! Tell me more about that...', 
      type: 'character' 
    })
  }, 1000)
}

function playVoice() {
  const utterance = new SpeechSynthesisUtterance(
    messages.value[messages.value.length - 1].text
  )
  speechSynthesis.speak(utterance)
}
</script>

<style scoped>
.chat-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.chat-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
  margin-top: 2rem;
}

.messages {
  height: 400px;
  overflow-y: auto;
  padding: 1rem;
}

.message {
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  max-width: 80%;
}

.user {
  background: #e3f2fd;
  margin-left: auto;
}

.character {
  background: #f5f5f5;
}

.input-area {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #eee;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.voice-btn {
  background: #2196F3;
}
</style>