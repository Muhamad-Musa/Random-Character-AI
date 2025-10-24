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
const MARKS_SUBCOLLECTION = 'marks'

export const marksService = {
  // Get all marks for a student's enrollment
  async getEnrollmentMarks(studentId, enrollmentId) {
    try {
      const q = query(
        collection(
          db,
          STUDENTS_COLLECTION,
          studentId,
          ENROLLMENTS_SUBCOLLECTION,
          enrollmentId,
          MARKS_SUBCOLLECTION
        ),
        orderBy('exam_date', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching marks:', error)
      throw error
    }
  },

  // Add mark for a student's enrollment
  async addMark(studentId, enrollmentId, markData) {
    try {
      const docRef = await addDoc(
        collection(
          db,
          STUDENTS_COLLECTION,
          studentId,
          ENROLLMENTS_SUBCOLLECTION,
          enrollmentId,
          MARKS_SUBCOLLECTION
        ),
        {
          exam_name: markData.exam_name,
          score: markData.score,
          total_marks: markData.total_marks || 100,
          exam_date: markData.exam_date || new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }
      )
      return {
        id: docRef.id,
        ...markData,
      }
    } catch (error) {
      console.error('Error adding mark:', error)
      throw error
    }
  },

  // Update mark
  async updateMark(studentId, enrollmentId, markId, updates) {
    try {
      const docRef = doc(
        db,
        STUDENTS_COLLECTION,
        studentId,
        ENROLLMENTS_SUBCOLLECTION,
        enrollmentId,
        MARKS_SUBCOLLECTION,
        markId
      )
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      return {
        id: markId,
        ...updates,
      }
    } catch (error) {
      console.error('Error updating mark:', error)
      throw error
    }
  },

  // Delete mark
  async deleteMark(studentId, enrollmentId, markId) {
    try {
      const docRef = doc(
        db,
        STUDENTS_COLLECTION,
        studentId,
        ENROLLMENTS_SUBCOLLECTION,
        enrollmentId,
        MARKS_SUBCOLLECTION,
        markId
      )
      await deleteDoc(docRef)
      return markId
    } catch (error) {
      console.error('Error deleting mark:', error)
      throw error
    }
  },

  // Calculate average marks for enrollment
  async getAverageMarks(studentId, enrollmentId) {
    try {
      const marks = await this.getEnrollmentMarks(studentId, enrollmentId)
      if (marks.length === 0) return 0
      const sum = marks.reduce((acc, mark) => acc + mark.score, 0)
      return (sum / marks.length).toFixed(2)
    } catch (error) {
      console.error('Error calculating average:', error)
      throw error
    }
  },
}
