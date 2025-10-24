import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => ({
    students: [
      { id: 1, name: "Ali Hassan", age: 20, email: "ali@example.com", class_id: 1, courses: [1, 2] },
      { id: 2, name: "Sara Ahmed", age: 22, email: "sara@example.com", class_id: 2, courses: [2, 3] },
      { id: 3, name: "Omar Mohamed", age: 21, email: "omar@example.com", class_id: 1, courses: [1, 3] },
      { id: 4, name: "Fatima Ali", age: 20, email: "fatima@example.com", class_id: 2, courses: [2] },
      { id: 5, name: "Khaled Hassan", age: 23, email: "khaled@example.com", class_id: 1, courses: [1] },
    ],

    classes: [
      { id: 1, name: "Class A" },
      { id: 2, name: "Class B" },
      { id: 3, name: "Class C" },
    ],

    courses: [
      { id: 1, name: "Mathematics" },
      { id: 2, name: "Physics" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Biology" },
      { id: 5, name: "Computer Science" },
      { id: 6, name: "English Literature" },
    ],

    attendance: [],
  }),

  getters: {
    totalStudents: (state) => state.students.length,
    totalClasses: (state) => state.classes.length,
    getStudentById: (state) => (id) => {
      return state.students.find((s) => s.id === Number(id));
    },
    getClassById: (state) => (id) => {
      return state.classes.find((c) => c.id === id);
    },
    getCourseById: (state) => (id) => {
      return state.courses.find((c) => c.id === id);
    },
  },

  actions: {
    addStudent(student) {
      const newStudent = {
        id: Math.max(...this.students.map(s => s.id), 0) + 1,
        name: student.name,
        age: student.age || null,
        email: student.email,
        class_id: student.class_id || null,
        courses: student.courses || []
      };
      this.students.push(newStudent);
      return newStudent;
    },

    updateStudent(id, updates) {
      const student = this.students.find((s) => s.id === Number(id));
      if (student) {
        Object.assign(student, updates);
      }
      return student;
    },

    deleteStudent(id) {
      this.students = this.students.filter((s) => s.id !== Number(id));
    },

    addClass(className) {
      const newClass = {
        id: Math.max(...this.classes.map(c => c.id), 0) + 1,
        name: className
      };
      this.classes.push(newClass);
      return newClass;
    },

    assignCourses(studentId, courseIds) {
      const student = this.students.find((s) => s.id === Number(studentId));
      if (student) {
        student.courses = Array.from(new Set([...student.courses, ...courseIds]));
      }
      return student;
    },

    saveAttendanceRecord(records) {
      if (Array.isArray(records)) {
        this.attendance.push(...records);
      } else {
        this.attendance.push(records);
      }
    },

    getStudentCourses(studentId) {
      const student = this.students.find((s) => s.id === Number(studentId));
      if (!student) return [];
      return student.courses.map(courseId => 
        this.courses.find(c => c.id === courseId)
      ).filter(c => c);
    },

    getStudentsByClass(classId) {
      return this.students.filter((s) => s.class_id === Number(classId));
    },
  },
});
