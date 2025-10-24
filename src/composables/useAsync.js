import { ref, reactive } from 'vue'

/**
 * Composable for handling async operations with loading, error, and data states
 * @param {Function} asyncFn - The async function to execute
 * @returns {Object} - Object with loading, error, data states and execute function
 */
export function useAsync(asyncFn) {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const execute = async (...args) => {
    loading.value = true
    error.value = null
    try {
      const result = await asyncFn(...args)
      data.value = result
      return result
    } catch (err) {
      error.value = err.message || 'An error occurred'
      console.error('Async error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    loading.value = false
    error.value = null
    data.value = null
  }

  return {
    loading,
    error,
    data,
    execute,
    reset,
  }
}

/**
 * Composable for handling multiple async operations
 */
export function useAsyncList() {
  const loading = ref(false)
  const error = ref(null)
  const items = ref([])

  const loadItems = async (fetchFn) => {
    loading.value = true
    error.value = null
    try {
      items.value = await fetchFn()
      return items.value
    } catch (err) {
      error.value = err.message || 'Failed to load items'
      console.error('Error loading items:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    loading.value = false
    error.value = null
    items.value = []
  }

  return {
    loading,
    error,
    items,
    loadItems,
    reset,
  }
}
