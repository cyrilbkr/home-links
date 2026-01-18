import { describe, it, expect } from 'vitest'
import { useColor } from '@/composables/useColor'

describe('useColor', () => {
  it('should return a reactive color object', () => {
    const { currentColor } = useColor()

    expect(currentColor).toBeDefined()
    expect(currentColor).toHaveProperty('primary')
    expect(currentColor).toHaveProperty('secondary')
    expect(currentColor).toHaveProperty('name')
  })

  it('should have valid color values', () => {
    const { currentColor } = useColor()

    expect(typeof currentColor.primary).toBe('string')
    expect(typeof currentColor.secondary).toBe('string')
    expect(typeof currentColor.name).toBe('string')

    // Check hex color format
    expect(currentColor.primary).toMatch(/^#[0-9A-Fa-f]{6}$/)
    expect(currentColor.secondary).toMatch(/^#[0-9A-Fa-f]{6}$/)
  })

  it('should have default color values', () => {
    const { currentColor } = useColor()

    expect(currentColor.primary).toBe('#667eea')
    expect(currentColor.secondary).toBe('#764ba2')
    expect(currentColor.name).toBe('Violet Dream')
  })

  it('should be reactive', () => {
    const { currentColor } = useColor()
    const initialPrimary = currentColor.primary

    // Modify the color
    currentColor.primary = '#ff0000'

    expect(currentColor.primary).toBe('#ff0000')
    expect(currentColor.primary).not.toBe(initialPrimary)
  })
})
