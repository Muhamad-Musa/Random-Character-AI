<template>
  <div class="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img
          src="/assets/gym-logo.png"
          alt="Gym Logo"
          class="w-10 h-10 rounded-full object-cover"
        />
        <h1 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Gym Chat Coach</h1>
      </div>
      <button
        @click="toggleDarkMode"
        class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
      >
        <i class="fa-solid" :class="darkMode ? 'fa-sun' : 'fa-moon'"></i>
      </button>
    </header>

    <!-- Chat Messages -->
    <div
      ref="chatContainer"
      class="flex-1 overflow-y-auto px-4 py-3 space-y-4 scroll-smooth"
    >
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex"
        :class="msg.isUser ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[80%] p-3 rounded-2xl shadow-sm"
          :class="msg.isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'"
        >
          <p class="whitespace-pre-wrap">{{ msg.text }}</p>
          <span class="text-xs opacity-70 block mt-1 text-right">
            {{ formatTime(msg.time) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Input Box -->
    <form @submit.prevent="sendMessage" class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-3">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 p-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition"
        >
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const messages = ref([
  { text: "Welcome to Gym Chat! 💪", isUser: false, time: new Date() },
]);

const newMessage = ref("");
const chatContainer = ref(null);
const darkMode = ref(false);

const sendMessage = () => {
  if (newMessage.value.trim() === "") return;

  messages.value.push({
    text: newMessage.value,
    isUser: true,
    time: new Date(),
  });

  // Simulated bot response
  setTimeout(() => {
    messages.value.push({
      text: "Got it! I’ll help you with your fitness goals. 🏋️‍♂️",
      isUser: false,
      time: new Date(),
    });
  }, 700);

  newMessage.value = "";
};

watch(messages, () => {
  nextTick(() => {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  });
});

const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle("dark", darkMode.value);
};

onMounted(() => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    darkMode.value = true;
    document.documentElement.classList.add("dark");
  }
});
</script>

<style scoped>
/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
