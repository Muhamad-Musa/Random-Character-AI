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
      <div v-if="store.classes.length > 0">
        <ul>
          <li
            v-for="classItem in store.classes"
            :key="classItem.id"
            @click="selectClass(classItem.id)"
            :class="{ active: selectedClassId === classItem.id }"
          >
            {{ classItem.name }}
          </li>
        </ul>
      </div>
      <div v-else>No classes yet</div>
    </div>

    <!-- Students in Selected Class -->
    <div v-if="selectedClassId" class="students-list">
      <h3>👨‍🎓 Students in {{ selectedClassName }}</h3>
      <div v-if="studentsInSelectedClass.length > 0">
        <ul>
          <li
            v-for="student in studentsInSelectedClass"
            :key="student.id"
          >
            {{ student.name }} (Age: {{ student.age }})
          </li>
        </ul>
      </div>
      <p v-else class="empty-msg">
        No students assigned to this class yet.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStudentStore } from "../stores/studentStore";

const store = useStudentStore();
const newClassName = ref("");
const selectedClassId = ref(null);

// add class function
function addClass() {
  if (newClassName.value.trim() === "") return;
  store.addClass(newClassName.value.trim());
  newClassName.value = "";
}

// Get the name of selected class
const selectedClassName = computed(() => {
  const classItem = store.classes.find((c) => c.id === selectedClassId.value);
  return classItem ? classItem.name : "";
});

// computed: students of selected class
const studentsInSelectedClass = computed(() =>
  store.getStudentsByClass(selectedClassId.value)
);

function selectClass(classId) {
  selectedClassId.value = classId;
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
  background-color: #2f80ed;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.add-class-form button:hover {
  background-color: #2563be;
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
  background: #2f80ed;
  color: white;
}

.students-list {
  margin-top: 30px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.students-list ul {
  list-style: none;
  padding: 0;
}

.students-list li {
  background: white;
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 4px;
  border-left: 3px solid #2f80ed;
}

.empty-msg {
  color: #777;
  font-style: italic;
}
</style>
