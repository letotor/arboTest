import { defineStore, Pinia } from 'pinia'

interface Checkbox {
  id: number;
  isActive: boolean;
}

export const useCheckboxStore = defineStore('checkbox', {
  state: (): { checkboxes: Checkbox[] } => ({
    checkboxes: []
  }),
  getters: {
    isParentCheckboxActive(): boolean {
      return this.checkboxes.every((checkbox: Checkbox) => checkbox.isActive)
    }
  },
  actions: {
    addChildCheckbox(checkbox: Checkbox): void {
      this.checkboxes.push(checkbox)
    },
    removeChildCheckbox(checkbox: Checkbox): void {
      const index = this.checkboxes.indexOf(checkbox)
      if (index > -1) {
        this.checkboxes.splice(index, 1)
      }
    }
    
  }
})
