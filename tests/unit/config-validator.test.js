import { describe, it, expect } from 'vitest'
import { validateConfig } from '@/utils/config-validator'

describe('config-validator', () => {
  it('should validate a correct config structure', () => {
    const validConfig = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      footer: 'Test Footer',
      sections: [
        {
          id: 'test',
          title: 'Test Section',
          icon: '⭐',
          links: [
            {
              name: 'Test Link',
              url: 'https://example.com',
              icon: '🔗',
              description: 'Test description'
            }
          ]
        }
      ]
    }

    const result = validateConfig(validConfig)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should reject config without title', () => {
    const invalidConfig = {
      sections: []
    }

    const result = validateConfig(invalidConfig)
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors.some(e => e.includes('title'))).toBe(true)
  })

  it('should reject config without sections array', () => {
    const invalidConfig = {
      title: 'Test',
      sections: 'not an array'
    }

    const result = validateConfig(invalidConfig)
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('sections array'))).toBe(true)
  })

  it('should reject section without id', () => {
    const invalidConfig = {
      title: 'Test',
      sections: [
        {
          title: 'Test Section',
          links: []
        }
      ]
    }

    const result = validateConfig(invalidConfig)
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('id'))).toBe(true)
  })

  it('should reject link without name', () => {
    const invalidConfig = {
      title: 'Test',
      sections: [
        {
          id: 'test',
          title: 'Test Section',
          links: [
            {
              url: 'https://example.com'
            }
          ]
        }
      ]
    }

    const result = validateConfig(invalidConfig)
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('name'))).toBe(true)
  })

  it('should reject link without url', () => {
    const invalidConfig = {
      title: 'Test',
      sections: [
        {
          id: 'test',
          title: 'Test Section',
          links: [
            {
              name: 'Test Link'
            }
          ]
        }
      ]
    }

    const result = validateConfig(invalidConfig)
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('url'))).toBe(true)
  })

  it('should reject invalid URLs', () => {
    const invalidConfig = {
      title: 'Test',
      sections: [
        {
          id: 'test',
          title: 'Test Section',
          links: [
            {
              name: 'Test Link',
              url: 'not-a-valid-url'
            }
          ]
        }
      ]
    }

    const result = validateConfig(invalidConfig)
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('invalid URL'))).toBe(true)
  })

  it('should accept valid URLs', () => {
    const validConfig = {
      title: 'Test',
      sections: [
        {
          id: 'test',
          title: 'Test Section',
          links: [
            {
              name: 'Test Link',
              url: 'https://example.com'
            },
            {
              name: 'Test Link 2',
              url: 'http://example.com'
            }
          ]
        }
      ]
    }

    const result = validateConfig(validConfig)
    expect(result.valid).toBe(true)
  })

  it('should reject null or undefined config', () => {
    expect(validateConfig(null).valid).toBe(false)
    expect(validateConfig(undefined).valid).toBe(false)
  })

  it('should provide detailed error messages', () => {
    const invalidConfig = {
      title: 'Test',
      sections: [
        {
          id: 'test',
          title: 'Test Section',
          links: [
            {
              name: 'Link 1',
              url: 'invalid-url'
            },
            {
              name: 'Link 2'
              // missing url
            }
          ]
        }
      ]
    }

    const result = validateConfig(invalidConfig)
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors.some(e => e.includes('invalid URL'))).toBe(true)
    expect(result.errors.some(e => e.includes('url'))).toBe(true)
  })
})
