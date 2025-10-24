import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const STUDENTS_COLLECTION = 'students'

export const studentService = {
  // Get all students
  async getAllStudents() {
    try {
      const q = query(
        collection(db, STUDENTS_COLLECTION),
        orderBy('name')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching students:', error)
      throw error
    }
  },

  // Get single student
  async getStudentById(id) {
    try {
      const docRef = doc(db, STUDENTS_COLLECTION, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        }
      }
      return null
    } catch (error) {
      console.error('Error fetching student:', error)
      throw error
    }
  },

  // Add new student
  async addStudent(studentData) {
    try {
      const docRef = await addDoc(collection(db, STUDENTS_COLLECTION), {
        ...studentData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return {
        id: docRef.id,
        ...studentData,
      }
    } catch (error) {
      console.error('Error adding student:', error)
      throw error
    }
  },

  // Update student
  async updateStudent(id, updates) {
    try {
      const docRef = doc(db, STUDENTS_COLLECTION, id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      return {
        id,
        ...updates,
      }
    } catch (error) {
      console.error('Error updating student:', error)
      throw error
    }
  },

  // Delete student
  async deleteStudent(id) {
    try {
      const docRef = doc(db, STUDENTS_COLLECTION, id)
      await deleteDoc(docRef)
      return id
    } catch (error) {
      console.error('Error deleting student:', error)
      throw error
    }
  },

  // Get students by stage
  async getStudentsByStage(stageId) {
    try {
      const q = query(
        collection(db, STUDENTS_COLLECTION),
        where('stage_id', '==', stageId),
        orderBy('name')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching students by stage:', error)
      throw error
    }
  },
}
