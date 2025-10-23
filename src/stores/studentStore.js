import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => ({
    students: [
      // Example starter data
      { id: 1, name: "Ali Hassan", age: 20, class: "Class A", email: "ali@example.com", courses: [] },
      { id: 2, name: "Sara Ahmed", age: 22, class: "Class B", email: "sara@example.com", courses: [] },
    ],

    classes: ["Class A", "Class B"],

    attendance: [] // for attendance records
  }),

  getters: {
    totalStudents: (state) => state.students.length,
    totalClasses: (state) => state.classes.length,
  },

  actions: {
    // ✅ Add new student
    addStudent(student) {
      student.id = Date.now();
      this.students.push(student);
    },

    // ✅ Delete student by ID
    deleteStudent(id) {
      this.students = this.students.filter((s) => s.id !== id);
    },

    // ✅ Add new class
    addClass(className) {
      if (!this.classes.includes(className)) {
        this.classes.push(className);
      }
    },

    // ✅ Assign courses to student
    assignCourses(studentId, courses) {
      const student = this.students.find((s) => s.id === studentId);
      if (student) {
        const existing = student.courses || [];
        student.courses = Array.from(new Set([...existing, ...courses]));
      }
    },

    // ✅ Save attendance record
    saveAttendanceRecord(record) {
      if (!this.attendance) this.attendance = [];
      this.attendance.push(record);
    },
  },
});
