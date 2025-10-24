<template>
  <div class="attendance-page">
    <h1>📅 Attendance Tracking</h1>

    <!-- Select course -->
    <div class="form-group">
      <label for="course">Select Course:</label>
      <select v-model.number="selectedCourseId" id="course">
        <option :value="null">-- Choose a course --</option>
        <option
          v-for="course in store.courses"
          :key="course.id"
          :value="course.id"
        >
          {{ course.name }}
        </option>
      </select>
    </div>

    <!-- Select date -->
    <div class="form-group">
      <label for="date">Select Date:</label>
      <input type="date" v-model="selectedDate" id="date" />
    </div>

    <!-- Load button -->
    <button
      v-if="selectedCourseId && selectedDate"
      class="load-btn"
      @click="loadAttendance"
    >
      Load Students
    </button>

    <!-- Student List -->
    <div v-if="attendanceLoaded && studentsInCourse.length > 0" class="student-list">
      <h2>��‍🎓 Mark Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in studentsInCourse" :key="student.id">
            <td>{{ student.name }}</td>
            <td>
              <select
                v-model="attendanceData[student.id]"
                class="status-select"
              >
                <option value="">-- Select --</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="saveAttendance" class="save-btn">Save Attendance</button>
    </div>

    <div v-if="attendanceLoaded && studentsInCourse.length === 0" class="no-students">
      <p>No students enrolled in this course.</p>
    </div>

    <!-- History -->
    <div v-if="attendanceHistory.length > 0" class="history">
      <h2>🕒 Attendance History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in attendanceHistory" :key="index">
            <td>{{ record.date }}</td>
            <td>{{ record.courseName }}</td>
            <td>{{ record.presentCount }}</td>
            <td>{{ record.absentCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStudentStore } from "../stores/studentStore";

const store = useStudentStore();

const selectedCourseId = ref(null);
const selectedDate = ref("");
const attendanceData = ref({});
const attendanceLoaded = ref(false);
const attendanceHistory = ref([]);

// Get students enrolled in selected course
const studentsInCourse = computed(() => {
  if (!selectedCourseId.value) return [];
  return store.students.filter((s) =>
    s.courses.includes(selectedCourseId.value)
  );
});

function loadAttendance() {
  if (!selectedCourseId.value || !selectedDate.value) {
    alert("Please select both course and date");
    return;
  }
  attendanceData.value = {};
  studentsInCourse.value.forEach((student) => {
    attendanceData.value[student.id] = "";
  });
  attendanceLoaded.value = true;
}

function saveAttendance() {
  if (!selectedCourseId.value || !selectedDate.value) return;

  // Create attendance records
  const records = [];
  let presentCount = 0;
  let absentCount = 0;

  studentsInCourse.value.forEach((student) => {
    const status = attendanceData.value[student.id];
    if (status) {
      records.push({
        student_id: student.id,
        course_id: selectedCourseId.value,
        date: selectedDate.value,
        status: status,
      });
      if (status === "Present") presentCount++;
      if (status === "Absent") absentCount++;
    }
  });

  if (records.length === 0) {
    alert("Please mark attendance for at least one student");
    return;
  }

  // Save to store
  store.saveAttendanceRecord(records);

  // Add to history
  const courseName = store.courses.find(
    (c) => c.id === selectedCourseId.value
  )?.name || "Unknown";

  attendanceHistory.value.push({
    date: selectedDate.value,
    courseName: courseName,
    presentCount,
    absentCount,
  });

  alert("✅ Attendance saved successfully!");
  attendanceLoaded.value = false;
  attendanceData.value = {};
  selectedCourseId.value = null;
  selectedDate.value = "";
}
</script>

<style scoped>
.attendance-page {
  padding: 20px;
  max-width: 900px;
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

.load-btn {
  background-color: #2f80ed;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  transition: 0.3s;
}

.load-btn:hover {
  background-color: #2563be;
}

.student-list {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  background: white;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #f0f0f0;
  font-weight: bold;
}

.status-select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.save-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.save-btn:hover {
  background-color: #1e8449;
}

.no-students {
  background: #fff3cd;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
  color: #856404;
}

.history {
  margin-top: 30px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}
</style>
