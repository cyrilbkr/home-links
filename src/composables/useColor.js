import { reactive } from 'vue'

// Static color theme
const defaultColor = { 
  primary: '#667eea', 
  secondary: '#764ba2', 
  name: 'Violet Dream' 
}

export function useColor() {
  const currentColor = reactive({ ...defaultColor })

  return {
    currentColor
  }
}
