import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { studentService } from "../services/studentService";
import { stageService } from "../services/stageService";
import { courseService } from "../services/courseService";
import { attendanceService } from "../services/attendanceService";

export const useStudentStore = defineStore("student", () => {
  // State
  const students = ref([]);
  const stages = ref([]);
  const courses = ref([]);
  const attendance = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Getters
  const getStudentById = (id) => {
    return students.value.find((s) => s.id === String(id));
  };

  const getStageById = (id) => {
    return stages.value.find((s) => s.id === String(id));
  };

  const getCourseById = (id) => {
    return courses.value.find((c) => c.id === String(id));
  };

  // Actions - Students
  const fetchAllStudents = async () => {
    loading.value = true;
    error.value = null;
    try {
      students.value = await studentService.getAllStudents();
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addStudent = async (student) => {
    loading.value = true;
    error.value = null;
    try {
      const newStudent = await studentService.addStudent(student);
      students.value.push(newStudent);
      return newStudent;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateStudent = async (id, updates) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await studentService.updateStudent(id, updates);
      const index = students.value.findIndex((s) => s.id === id);
      if (index > -1) {
        students.value[index] = { ...students.value[index], ...updates };
      }
      return updated;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteStudent = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await studentService.deleteStudent(id);
      students.value = students.value.filter((s) => s.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getStudentsByStage = async (stageId) => {
    try {
      return await studentService.getStudentsByStage(stageId);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // Actions - Stages
  const fetchAllStages = async () => {
    loading.value = true;
    error.value = null;
    try {
      stages.value = await stageService.getAllStages();
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addStage = async (stageName) => {
    loading.value = true;
    error.value = null;
    try {
      const newStage = await stageService.addStage(stageName);
      stages.value.push(newStage);
      return newStage;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Actions - Courses
  const fetchAllCourses = async () => {
    loading.value = true;
    error.value = null;
    try {
      courses.value = await courseService.getAllCourses();
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getStudentCourses = (studentId) => {
    const student = getStudentById(studentId);
    if (!student) return [];
    return (student.courses || [])
      .map((courseId) => getCourseById(courseId))
      .filter((c) => c);
  };

  const assignCourses = async (studentId, courseIds) => {
    loading.value = true;
    error.value = null;
    try {
      const student = getStudentById(studentId);
      if (!student) throw new Error("Student not found");
      const updatedCourses = Array.from(
        new Set([...(student.courses || []), ...courseIds])
      );
      const updated = await updateStudent(studentId, {
        courses: updatedCourses,
      });
      return updated;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addCourse = async (courseName) => {
    loading.value = true;
    error.value = null;
    try {
      const newCourse = await courseService.addCourse(courseName);
      courses.value.push(newCourse);
      return newCourse;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteCourse = async (courseId) => {
    loading.value = true;
    error.value = null;
    try {
      await courseService.deleteCourse(courseId);
      courses.value = courses.value.filter((c) => c.id !== courseId);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Actions - Attendance
  const fetchAllAttendance = async () => {
    loading.value = true;
    error.value = null;
    try {
      attendance.value = await attendanceService.getAllAttendance();
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const saveAttendanceRecord = async (records) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await attendanceService.saveAttendance(records);
      const recordsArray = Array.isArray(result) ? result : [result];
      attendance.value.push(...recordsArray);
      return result;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Computed getters
  const totalStudents = computed(() => students.value.length);
  const totalStages = computed(() => stages.value.length);

  return {
    // State
    students,
    stages,
    courses,
    attendance,
    loading,
    error,

    // Computed getters
    totalStudents,
    totalStages,

    // Functions
    getStudentById,
    getStageById,
    getCourseById,

    // Student actions
    fetchAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentsByStage,

    // Stage actions
    fetchAllStages,
    addStage,

    // Course actions
    fetchAllCourses,
    getStudentCourses,
    assignCourses,
    addCourse,
    deleteCourse,

    // Attendance actions
    fetchAllAttendance,
    saveAttendanceRecord,
  };
});
