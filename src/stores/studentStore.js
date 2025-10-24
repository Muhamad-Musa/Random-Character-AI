import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { studentService } from "../services/studentService";
import { stageService } from "../services/stageService";
import { courseService } from "../services/courseService";
import { enrollmentService } from "../services/enrollmentService";
import { marksService } from "../services/marksService";
import { attendanceService } from "../services/attendanceService";

export const useStudentStore = defineStore("student", () => {
  // State
  const students = ref([]);
  const stages = ref([]);
  const courses = ref([]);
  const studentEnrollments = ref({}); // { studentId: [enrollments...] }
  const enrollmentMarks = ref({}); // { studentId_enrollmentId: [marks...] }
  const enrollmentAttendance = ref({}); // { studentId_enrollmentId: [attendance...] }
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
    // Get enrollments for this student
    const enrollments = studentEnrollments.value[String(studentId)] || [];
    return enrollments;
  };

  const assignCourses = async (studentId, courseIds) => {
    loading.value = true;
    error.value = null;
    try {
      const student = getStudentById(studentId);
      if (!student) throw new Error("Student not found");

      // Get current enrollments
      const currentEnrollments = studentEnrollments.value[String(studentId)] || [];
      const enrolledCourseIds = currentEnrollments.map((e) => e.course_id);

      // Enroll in new courses
      for (const courseId of courseIds) {
        if (!enrolledCourseIds.includes(String(courseId))) {
          const course = getCourseById(courseId);
          const enrollment = await enrollmentService.enrollStudentInCourse(
            String(studentId),
            String(courseId),
            course?.name || "Unknown Course"
          );
          if (!studentEnrollments.value[String(studentId)]) {
            studentEnrollments.value[String(studentId)] = [];
          }
          studentEnrollments.value[String(studentId)].push(enrollment);
        }
      }

      return student;
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

  // Actions - Enrollments
  const fetchStudentEnrollments = async (studentId) => {
    loading.value = true;
    error.value = null;
    try {
      const enrollments = await enrollmentService.getStudentEnrollments(String(studentId));
      studentEnrollments.value[String(studentId)] = enrollments;
      return enrollments;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeEnrollment = async (studentId, enrollmentId) => {
    loading.value = true;
    error.value = null;
    try {
      await enrollmentService.removeEnrollment(String(studentId), enrollmentId);
      if (studentEnrollments.value[String(studentId)]) {
        studentEnrollments.value[String(studentId)] = 
          studentEnrollments.value[String(studentId)].filter(e => e.id !== enrollmentId);
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Actions - Marks
  const fetchEnrollmentMarks = async (studentId, enrollmentId) => {
    loading.value = true;
    error.value = null;
    try {
      const key = `${studentId}_${enrollmentId}`;
      const marks = await marksService.getEnrollmentMarks(String(studentId), enrollmentId);
      enrollmentMarks.value[key] = marks;
      return marks;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addMark = async (studentId, enrollmentId, markData) => {
    loading.value = true;
    error.value = null;
    try {
      const mark = await marksService.addMark(String(studentId), enrollmentId, markData);
      const key = `${studentId}_${enrollmentId}`;
      if (!enrollmentMarks.value[key]) {
        enrollmentMarks.value[key] = [];
      }
      enrollmentMarks.value[key].push(mark);
      return mark;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getAverageMarks = async (studentId, enrollmentId) => {
    try {
      return await marksService.getAverageMarks(String(studentId), enrollmentId);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // Actions - Attendance
  const fetchEnrollmentAttendance = async (studentId, enrollmentId) => {
    loading.value = true;
    error.value = null;
    try {
      const key = `${studentId}_${enrollmentId}`;
      const records = await attendanceService.getEnrollmentAttendance(String(studentId), enrollmentId);
      enrollmentAttendance.value[key] = records;
      return records;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const recordAttendance = async (studentId, enrollmentId, attendanceData) => {
    loading.value = true;
    error.value = null;
    try {
      const record = await attendanceService.recordAttendance(
        String(studentId),
        enrollmentId,
        attendanceData
      );
      const key = `${studentId}_${enrollmentId}`;
      if (!enrollmentAttendance.value[key]) {
        enrollmentAttendance.value[key] = [];
      }
      enrollmentAttendance.value[key].push(record);
      return record;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const recordBulkAttendance = async (attendanceRecords) => {
    loading.value = true;
    error.value = null;
    try {
      const results = await attendanceService.recordBulkAttendance(attendanceRecords);
      // Update local state for each record
      for (const result of results) {
        const key = `${result.studentId}_${result.enrollmentId}`;
        if (!enrollmentAttendance.value[key]) {
          enrollmentAttendance.value[key] = [];
        }
        enrollmentAttendance.value[key].push(result);
      }
      return results;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getAttendanceStats = async (studentId, enrollmentId) => {
    try {
      return await attendanceService.getAttendanceStats(String(studentId), enrollmentId);
    } catch (err) {
      error.value = err.message;
      throw err;
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
    studentEnrollments,
    enrollmentMarks,
    enrollmentAttendance,
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

    // Enrollment actions
    fetchStudentEnrollments,
    removeEnrollment,

    // Marks actions
    fetchEnrollmentMarks,
    addMark,
    getAverageMarks,

    // Attendance actions
    fetchEnrollmentAttendance,
    recordAttendance,
    recordBulkAttendance,
    getAttendanceStats,
  };
});
