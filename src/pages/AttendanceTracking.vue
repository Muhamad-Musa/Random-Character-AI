<template>
  <div class="attendance-page">
    <h1>📅 Attendance Tracking</h1>

    <!-- Select class -->
    <div class="form-group">
      <label for="class">Select Class:</label>
      <select v-model="selectedClass" id="class" required>
        <option disabled value="">-- Choose a class --</option>
        <option
          v-for="className in store.classes"
          :key="className"
          :value="className"
        >
          {{ className }}
        </option>
      </select>
    </div>

    <!-- Select date -->
    <div class="form-group">
      <label for="date">Select Date:</label>
      <input type="date" v-model="selectedDate" id="date" required />
    </div>

    <!-- Student List -->
    <div v-if="selectedClass && selectedDate" class="student-list">
      <h2>👩‍🎓 Students in {{ selectedClass }}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in studentsInClass" :key="student.id">
            <td>{{ student.name }}</td>
            <td>
              <select
                v-model="attendance[student.id]"
                class="status-select"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="saveAttendance" class="save-btn">Save Attendance</button>
    </div>

    <!-- History -->
    <div v-if="attendanceHistory.length > 0" class="history">
      <h2>🕒 Attendance History</h2>
      <ul>
        <li v-for="(record, index) in attendanceHistory" :key="index">
          {{ record.date }} - {{ record.className }} ({{ record.presentCount }} present)
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStudentStore } from "../stores/studentStore";

const store = useStudentStore();

const selectedClass = ref("");
const selectedDate = ref("");
const attendance = ref({});
const attendanceHistory = ref([]);

const studentsInClass = computed(() =>
  store.students.filter((s) => s.class === selectedClass.value)
);

function saveAttendance() {
  if (!selectedClass.value || !selectedDate.value) return alert("Select class and date first!");

  const presentCount = Object.values(attendance.value).filter(
    (status) => status === "Present"
  ).length;

  attendanceHistory.value.push({
    className: selectedClass.value,
    date: selectedDate.value,
    presentCount,
    data: { ...attendance.value },
  });

  store.saveAttendanceRecord({
    className: selectedClass.value,
    date: selectedDate.value,
    records: { ...attendance.value },
  });

  alert("✅ Attendance saved successfully!");
}
</script>

<style scoped>
.attendance-page {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}

select,
input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.student-list {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background: #f1f1f1;
}

.status-select {
  padding: 5px;
  border-radius: 4px;
}

.save-btn {
  background-color: #0078d4;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.save-btn:hover {
  background-color: #005fa3;
}

.history {
  margin-top: 30px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.history ul {
  list-style: none;
  padding: 0;
}
</style>
