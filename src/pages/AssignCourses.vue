<template>
  <div class="assign-courses">
    <h1>📘 Assign Courses</h1>

    <!-- Select student -->
    <div class="form-group">
      <label for="student">Select Student:</label>
      <select v-model="selectedStudentId" id="student">
        <option disabled value="">-- Choose a student --</option>
        <option
          v-for="student in store.students"
          :key="student.id"
          :value="student.id"
        >
          {{ student.name }}
        </option>
      </select>
    </div>

    <!-- Select courses -->
    <div v-if="selectedStudentId" class="form-group">
      <label>Select Courses:</label>
      <div class="courses-list">
        <div
          v-for="course in availableCourses"
          :key="course"
          class="course-item"
        >
          <input
            type="checkbox"
            :id="course"
            :value="course"
            v-model="selectedCourses"
          />
          <label :for="course">{{ course }}</label>
        </div>
      </div>
    </div>

    <!-- Assign button -->
    <button
      v-if="selectedStudentId"
      class="assign-btn"
      @click="assignCourses"
    >
      Assign Selected Courses
    </button>

    <!-- Assigned courses -->
    <div v-if="selectedStudent && selectedStudent.courses?.length" class="assigned-list">
      <h2>🎓 Courses Assigned to {{ selectedStudent.name }}</h2>
      <ul>
        <li v-for="course in selectedStudent.courses" :key="course">
          {{ course }}
        </li>
      </ul>
    </div>

    <p v-else-if="selectedStudentId" class="empty-msg">
      No courses assigned yet.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStudentStore } from "../stores/studentStore";

const store = useStudentStore();

const availableCourses = ref([
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English Literature",
]);

const selectedStudentId = ref("");
const selectedCourses = ref([]);

const selectedStudent = computed(() =>
  store.students.find((s) => s.id === selectedStudentId.value)
);

function assignCourses() {
  if (!selectedStudentId.value) return;

  store.assignCourses(selectedStudentId.value, selectedCourses.value);
  selectedCourses.value = [];
}
</script>

<style scoped>
.assign-courses {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 6px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.courses-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.course-item {
  background: #f8f9fa;
  padding: 8px;
  border-radius: 6px;
}

.assign-btn {
  display: inline-block;
  background: #0078d4;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.assign-btn:hover {
  background: #005fa3;
}

.assigned-list {
  margin-top: 30px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.assigned-list ul {
  list-style: none;
  padding: 0;
}

.empty-msg {
  color: #777;
  font-style: italic;
}
</style>
