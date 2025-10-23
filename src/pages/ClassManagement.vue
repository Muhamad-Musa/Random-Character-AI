<template>
  <div class="class-management">
    <h1>🏫 Class Management</h1>

    <!-- Add New Class -->
    <form @submit.prevent="addClass" class="add-class-form">
      <input
        v-model="newClassName"
        placeholder="Enter class name"
        required
      />
      <button type="submit">Add Class</button>
    </form>

    <!-- Class List -->
    <div class="class-list">
      <h2>📚 Available Classes</h2>
      <ul>
        <li
          v-for="(classItem, index) in classes"
          :key="index"
          @click="selectClass(classItem)"
          :class="{ active: selectedClass === classItem }"
        >
          {{ classItem }}
        </li>
      </ul>
    </div>

    <!-- Students in Selected Class -->
    <div v-if="selectedClass" class="students-list">
      <h3>👨‍🎓 Students in {{ selectedClass }}</h3>
      <ul>
        <li
          v-for="student in studentsInSelectedClass"
          :key="student.id"
        >
          {{ student.name }} (Age: {{ student.age }})
        </li>
      </ul>
      <p v-if="studentsInSelectedClass.length === 0" class="empty-msg">
        No students assigned yet.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStudentStore } from "../stores/studentStore";

const store = useStudentStore();
const newClassName = ref("");
const selectedClass = ref(null);

// reactive list of classes from store
const classes = computed(() => store.classes);

// add class function
function addClass() {
  if (newClassName.value.trim() === "") return;

  store.addClass(newClassName.value.trim());
  newClassName.value = "";
}

// computed: students of selected class
const studentsInSelectedClass = computed(() =>
  store.students.filter((s) => s.class === selectedClass.value)
);

function selectClass(classItem) {
  selectedClass.value = classItem;
}
</script>

<style scoped>
.class-management {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.add-class-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-class-form input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.add-class-form button {
  background-color: #0078d4;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.add-class-form button:hover {
  background-color: #005fa3;
}

.class-list ul {
  list-style: none;
  padding: 0;
}

.class-list li {
  background: #f8f9fa;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.class-list li:hover {
  background: #e2e6ea;
}

.class-list li.active {
  background: #0078d4;
  color: white;
}

.students-list {
  margin-top: 30px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.empty-msg {
  color: #777;
  font-style: italic;
}
</style>
