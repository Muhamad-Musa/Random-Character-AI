import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const COURSES_COLLECTION = 'courses'

export const courseService = {
  // Get all courses
  async getAllCourses() {
    try {
      const q = query(
        collection(db, COURSES_COLLECTION),
        orderBy('name')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching courses:', error)
      throw error
    }
  },

  // Get single course
  async getCourseById(id) {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        }
      }
      return null
    } catch (error) {
      console.error('Error fetching course:', error)
      throw error
    }
  },

  // Add new course
  async addCourse(courseName) {
    try {
      const docRef = await addDoc(collection(db, COURSES_COLLECTION), {
        name: courseName,
        createdAt: new Date().toISOString(),
      })
      return {
        id: docRef.id,
        name: courseName,
      }
    } catch (error) {
      console.error('Error adding course:', error)
      throw error
    }
  },

  // Update course
  async updateCourse(id, updates) {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id)
      await updateDoc(docRef, updates)
      return {
        id,
        ...updates,
      }
    } catch (error) {
      console.error('Error updating course:', error)
      throw error
    }
  },

  // Delete course
  async deleteCourse(id) {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id)
      await deleteDoc(docRef)
      return id
    } catch (error) {
      console.error('Error deleting course:', error)
      throw error
    }
  },
}
