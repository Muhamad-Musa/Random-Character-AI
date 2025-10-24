import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const COURSE_ASSIGNMENTS_COLLECTION = 'course_assignments'

export const courseAssignmentService = {
  // Get all assignments
  async getAllAssignments() {
    try {
      const q = query(
        collection(db, COURSE_ASSIGNMENTS_COLLECTION),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching assignments:', error)
      throw error
    }
  },

  // Get assignments for a specific student
  async getAssignmentsByStudent(studentId) {
    try {
      const q = query(
        collection(db, COURSE_ASSIGNMENTS_COLLECTION),
        where('student_id', '==', studentId)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching student assignments:', error)
      throw error
    }
  },

  // Get assignments for a specific course
  async getAssignmentsByCourse(courseId) {
    try {
      const q = query(
        collection(db, COURSE_ASSIGNMENTS_COLLECTION),
        where('course_id', '==', courseId)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching course assignments:', error)
      throw error
    }
  },

  // Assign course to student
  async assignCourseToStudent(studentId, courseId) {
    try {
      const docRef = await addDoc(collection(db, COURSE_ASSIGNMENTS_COLLECTION), {
        student_id: studentId,
        course_id: courseId,
        createdAt: new Date().toISOString(),
      })
      return {
        id: docRef.id,
        student_id: studentId,
        course_id: courseId,
      }
    } catch (error) {
      console.error('Error assigning course:', error)
      throw error
    }
  },

  // Remove course assignment
  async removeAssignment(assignmentId) {
    try {
      const docRef = doc(db, COURSE_ASSIGNMENTS_COLLECTION, assignmentId)
      await deleteDoc(docRef)
      return assignmentId
    } catch (error) {
      console.error('Error removing assignment:', error)
      throw error
    }
  },
}
