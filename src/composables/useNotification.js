import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Pinia store for managing notifications/toasts
 */
export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  let notificationId = 0

  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = notificationId++
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
    }

    notifications.value.push(notification)

    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  const success = (message, duration) => addNotification(message, 'success', duration)
  const error = (message, duration = 5000) => addNotification(message, 'error', duration)
  const warning = (message, duration) => addNotification(message, 'warning', duration)
  const info = (message, duration) => addNotification(message, 'info', duration)

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  }
})

/**
 * Composable for using notifications
 */
export function useNotification() {
  const store = useNotificationStore()

  return {
    notify: store.addNotification,
    success: store.success,
    error: store.error,
    warning: store.warning,
    info: store.info,
  }
}
