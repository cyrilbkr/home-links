import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useConfig } from '@/composables/useConfig'

describe('useConfig', () => {
  let originalFetch

  beforeEach(() => {
    originalFetch = global.fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('should initialize with loading state', () => {
    const { isLoading, config } = useConfig()
    expect(isLoading.value).toBe(true)
    expect(config.value).toBe(null)
  })

  it('should load default config when fetch fails', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))

    const { loadConfig, config, isLoading } = useConfig()
    await loadConfig()

    expect(isLoading.value).toBe(false)
    expect(config.value).toBeTruthy()
    expect(config.value.title).toBe('Home Links')
    expect(Array.isArray(config.value.sections)).toBe(true)
  })

  it('should load default config when response is not ok', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404
      })
    )

    const { loadConfig, config, isLoading } = useConfig()
    await loadConfig()

    expect(isLoading.value).toBe(false)
    expect(config.value).toBeTruthy()
    expect(config.value.title).toBe('Home Links')
  })

  it('should load config from /config.json when available', async () => {
    const mockConfig = {
      title: 'My Custom Title',
      subtitle: 'My Subtitle',
      footer: 'Custom Footer',
      sections: [
        {
          id: 'custom',
          title: 'Custom Section',
          icon: '⭐',
          links: [
            { name: 'Test', url: 'https://example.com', icon: '🔗' }
          ]
        }
      ]
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockConfig)
      })
    )

    const { loadConfig, config, isLoading } = useConfig()
    await loadConfig()

    expect(isLoading.value).toBe(false)
    expect(config.value).toEqual(mockConfig)
    expect(config.value.title).toBe('My Custom Title')
  })

  it('should have valid default config structure', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))

    const { loadConfig, config } = useConfig()
    await loadConfig()

    expect(config.value).toHaveProperty('title')
    expect(config.value).toHaveProperty('subtitle')
    expect(config.value).toHaveProperty('footer')
    expect(config.value).toHaveProperty('sections')
    expect(Array.isArray(config.value.sections)).toBe(true)

    if (config.value.sections.length > 0) {
      const section = config.value.sections[0]
      expect(section).toHaveProperty('id')
      expect(section).toHaveProperty('title')
      expect(section).toHaveProperty('links')
      expect(Array.isArray(section.links)).toBe(true)

      if (section.links.length > 0) {
        const link = section.links[0]
        expect(link).toHaveProperty('name')
        expect(link).toHaveProperty('url')
      }
    }
  })
})
