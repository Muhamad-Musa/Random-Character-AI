import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    projects: [],
    tasks: []
  }),
  actions: {
    addProject(project) {
      this.projects.push(project)
    }
  }
})
