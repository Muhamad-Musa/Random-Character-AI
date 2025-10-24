import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const ATTENDANCE_COLLECTION = 'attendance'

export const attendanceService = {
  // Get all attendance records
  async getAllAttendance() {
    try {
      const q = query(
        collection(db, ATTENDANCE_COLLECTION),
        orderBy('date', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching attendance:', error)
      throw error
    }
  },

  // Get attendance by course and date
  async getAttendanceByCourseAndDate(courseId, date) {
    try {
      const q = query(
        collection(db, ATTENDANCE_COLLECTION),
        where('course_id', '==', courseId),
        where('date', '==', date),
        orderBy('student_id')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching attendance records:', error)
      throw error
    }
  },

  // Get attendance by student
  async getAttendanceByStudent(studentId) {
    try {
      const q = query(
        collection(db, ATTENDANCE_COLLECTION),
        where('student_id', '==', studentId),
        orderBy('date', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching student attendance:', error)
      throw error
    }
  },

  // Save attendance record(s)
  async saveAttendance(records) {
    try {
      const recordsArray = Array.isArray(records) ? records : [records]
      const results = []

      for (const record of recordsArray) {
        const docRef = await addDoc(collection(db, ATTENDANCE_COLLECTION), {
          ...record,
          createdAt: new Date().toISOString(),
        })
        results.push({
          id: docRef.id,
          ...record,
        })
      }

      return results.length === 1 ? results[0] : results
    } catch (error) {
      console.error('Error saving attendance:', error)
      throw error
    }
  },
}
