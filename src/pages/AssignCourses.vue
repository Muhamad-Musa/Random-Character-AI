<template>
  <div class="assign-courses">
    <h1>📘 Assign Courses</h1>

    <!-- Select student -->
    <div class="form-group">
      <label for="student">Select Student:</label>
      <select v-model.number="selectedStudentId" id="student">
        <option :value="null">-- Choose a student --</option>
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
      <label>Available Courses:</label>
      <div class="courses-list">
        <div
          v-for="course in store.courses"
          :key="course.id"
          class="course-item"
        >
          <input
            type="checkbox"
            :id="'course-' + course.id"
            :value="course.id"
            v-model="selectedCourses"
          />
          <label :for="'course-' + course.id">{{ course.name }}</label>
        </div>
      </div>
    </div>

    <!-- Assign button -->
    <button
      v-if="selectedStudentId"
      class="assign-btn"
      @click="assignCourses"
      :disabled="selectedCourses.length === 0"
    >
      Assign Selected Courses
    </button>

    <!-- Assigned courses -->
    <div v-if="selectedStudent && assignedCourses.length" class="assigned-list">
      <h2>🎓 Currently Assigned Courses</h2>
      <ul>
        <li v-for="course in assignedCourses" :key="course.id">
          {{ course.name }}
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

const selectedStudentId = ref(null);
const selectedCourses = ref([]);

const selectedStudent = computed(() =>
  store.getStudentById(selectedStudentId.value)
);

const assignedCourses = computed(() => {
  if (!selectedStudent.value) return [];
  return store.getStudentCourses(selectedStudent.value.id);
});

function assignCourses() {
  if (!selectedStudentId.value || selectedCourses.length === 0) return;

  store.assignCourses(selectedStudentId.value, selectedCourses.value);
  selectedCourses.value = [];
  alert("✅ Courses assigned successfully!");
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
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 10px;
}

.course-item {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.course-item input {
  cursor: pointer;
}

.course-item label {
  margin: 0;
  display: inline;
  font-weight: normal;
  cursor: pointer;
}

.assign-btn {
  display: inline-block;
  background: #2f80ed;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
}

.assign-btn:hover:not(:disabled) {
  background: #2563be;
}

.assign-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
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
  margin: 0;
}

.assigned-list li {
  background: white;
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 4px;
  border-left: 3px solid #2f80ed;
}

.empty-msg {
  color: #777;
  font-style: italic;
  margin-top: 20px;
}
</style>
