import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const STUDENTS_COLLECTION = 'students'
const ENROLLMENTS_SUBCOLLECTION = 'enrollments'
const ATTENDANCE_SUBCOLLECTION = 'attendance'

export const attendanceService = {
  // Get all attendance records for a student's enrollment
  async getEnrollmentAttendance(studentId, enrollmentId) {
    try {
      const q = query(
        collection(
          db,
          STUDENTS_COLLECTION,
          studentId,
          ENROLLMENTS_SUBCOLLECTION,
          enrollmentId,
          ATTENDANCE_SUBCOLLECTION
        ),
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

  // Record attendance for a student's enrollment
  async recordAttendance(studentId, enrollmentId, attendanceData) {
    try {
      const docRef = await addDoc(
        collection(
          db,
          STUDENTS_COLLECTION,
          studentId,
          ENROLLMENTS_SUBCOLLECTION,
          enrollmentId,
          ATTENDANCE_SUBCOLLECTION
        ),
        {
          date: attendanceData.date,
          status: attendanceData.status, // "Present" | "Absent" | "Late"
          notes: attendanceData.notes || '',
          recordedAt: new Date().toISOString(),
        }
      )
      return {
        id: docRef.id,
        ...attendanceData,
      }
    } catch (error) {
      console.error('Error recording attendance:', error)
      throw error
    }
  },

  // Record bulk attendance for multiple students
  async recordBulkAttendance(attendanceRecords) {
    try {
      const results = []
      for (const record of attendanceRecords) {
        const { studentId, enrollmentId, ...data } = record
        const docRef = await addDoc(
          collection(
            db,
            STUDENTS_COLLECTION,
            studentId,
            ENROLLMENTS_SUBCOLLECTION,
            enrollmentId,
            ATTENDANCE_SUBCOLLECTION
          ),
          {
            date: data.date,
            status: data.status,
            notes: data.notes || '',
            recordedAt: new Date().toISOString(),
          }
        )
        results.push({
          id: docRef.id,
          studentId,
          enrollmentId,
          ...data,
        })
      }
      return results
    } catch (error) {
      console.error('Error recording bulk attendance:', error)
      throw error
    }
  },

  // Update attendance record
  async updateAttendance(studentId, enrollmentId, attendanceId, updates) {
    try {
      const docRef = doc(
        db,
        STUDENTS_COLLECTION,
        studentId,
        ENROLLMENTS_SUBCOLLECTION,
        enrollmentId,
        ATTENDANCE_SUBCOLLECTION,
        attendanceId
      )
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      return {
        id: attendanceId,
        ...updates,
      }
    } catch (error) {
      console.error('Error updating attendance:', error)
      throw error
    }
  },

  // Delete attendance record
  async deleteAttendance(studentId, enrollmentId, attendanceId) {
    try {
      const docRef = doc(
        db,
        STUDENTS_COLLECTION,
        studentId,
        ENROLLMENTS_SUBCOLLECTION,
        enrollmentId,
        ATTENDANCE_SUBCOLLECTION,
        attendanceId
      )
      await deleteDoc(docRef)
      return attendanceId
    } catch (error) {
      console.error('Error deleting attendance:', error)
      throw error
    }
  },

  // Calculate attendance statistics
  async getAttendanceStats(studentId, enrollmentId) {
    try {
      const records = await this.getEnrollmentAttendance(studentId, enrollmentId)
      const stats = {
        total: records.length,
        present: records.filter(r => r.status === 'Present').length,
        absent: records.filter(r => r.status === 'Absent').length,
        late: records.filter(r => r.status === 'Late').length,
        percentage: 0,
      }
      if (stats.total > 0) {
        stats.percentage = ((stats.present / stats.total) * 100).toFixed(2)
      }
      return stats
    } catch (error) {
      console.error('Error calculating attendance stats:', error)
      throw error
    }
  },
}
