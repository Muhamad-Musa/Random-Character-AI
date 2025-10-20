import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'vuework_student_data_v1'
const loadInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const defaultData = () => ({
  classes: [
    { id: 1, name: 'Class A' },
    { id: 2, name: 'Class B' }
  ],
  courses: [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'History' }
  ],
  students: [
    { id: 1, name: 'Ali Ahmad', age: 20, email: 'ali@example.com', classId: 1, courses: [1, 2] },
    { id: 2, name: 'Sara Karim', age: 19, email: 'sara@example.com', classId: 2, courses: [3] }
  ],
  attendance: []
})

export const useStudentStore = defineStore('student', () => {
  const persisted = loadInitial()
  const data = ref(persisted ?? defaultData())

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))

  const students = computed(() => data.value.students)
  const classes = computed(() => data.value.classes)
  const courses = computed(() => data.value.courses)
  const attendance = computed(() => data.value.attendance)

  const nextId = (arr) => (arr.length ? Math.max(...arr.map((i) => i.id)) + 1 : 1)

  function addStudent(payload) {
    const id = nextId(data.value.students)
    const student = { id, name: payload.name, age: payload.age, email: payload.email, classId: payload.classId || null, courses: payload.courses || [] }
    data.value.students.push(student)
    save()
    return student
  }

  function deleteStudent(id) {
    data.value.students = data.value.students.filter((s) => s.id !== id)
    data.value.attendance = data.value.attendance.filter((a) => a.studentId !== id)
    save()
  }

  function getStudentById(id) {
    return data.value.students.find((s) => s.id === Number(id)) || null
  }

  function updateStudent(id, patch) {
    const s = data.value.students.find((st) => st.id === Number(id))
    if (!s) return null
    Object.assign(s, patch)
    save()
    return s
  }

  function addClass(name) {
    const id = nextId(data.value.classes)
    data.value.classes.push({ id, name })
    save()
  }

  function assignCoursesToStudent(studentId, courseIds) {
    const s = getStudentById(studentId)
    if (!s) return null
    s.courses = Array.from(new Set(courseIds.map(Number)))
    save()
    return s
  }

  return {
    data,
    students,
    classes,
    courses,
    attendance,
    addStudent,
    deleteStudent,
    getStudentById,
    updateStudent,
    addClass,
    assignCoursesToStudent,
    save
  }
})
