import { ref } from 'vue'

const defaultConfig = {
  title: 'Home Links',
  subtitle: 'Your personalized home page',
  footer: '© 2026 Home Links',
  sections: [
    {
      id: 'productivity',
      title: 'Productivity',
      icon: '⚡',
      links: [
        { name: 'Gmail', url: 'https://gmail.com', icon: '📧', description: 'Email' },
        { name: 'Google Drive', url: 'https://drive.google.com', icon: '📁', description: 'Cloud storage' },
        { name: 'Notion', url: 'https://notion.so', icon: '📝', description: 'Notes & Docs' }
      ]
    },
    {
      id: 'dev',
      title: 'Development',
      icon: '💻',
      links: [
        { name: 'GitHub', url: 'https://github.com', icon: '🐙', description: 'Code hosting' },
        { name: 'GitLab', url: 'https://gitlab.com', icon: '🦊', description: 'DevOps platform' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚', description: 'Q&A' }
      ]
    },
    {
      id: 'social',
      title: 'Social',
      icon: '🌐',
      links: [
        { name: 'Twitter/X', url: 'https://x.com', icon: '🐦', description: 'Microblogging' },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', description: 'Professional network' },
        { name: 'Reddit', url: 'https://reddit.com', icon: '🔴', description: 'Forums' }
      ]
    },
    {
      id: 'media',
      title: 'Media',
      icon: '🎬',
      links: [
        { name: 'YouTube', url: 'https://youtube.com', icon: '▶️', description: 'Videos' },
        { name: 'Spotify', url: 'https://spotify.com', icon: '🎵', description: 'Music' },
        { name: 'Netflix', url: 'https://netflix.com', icon: '🎥', description: 'Streaming' }
      ]
    }
  ]
}

export function useConfig() {
  const config = ref(null)
  const isLoading = ref(true)

  const loadConfig = async () => {
    isLoading.value = true

    try {
      // Load from static config file
      const response = await fetch('/config.json')
      if (response.ok) {
        config.value = await response.json()
        isLoading.value = false
        return
      }
    } catch (e) {
      // Config file not available
    }

    // Use default config
    config.value = defaultConfig
    isLoading.value = false
  }

  return {
    config,
    isLoading,
    loadConfig
  }
}
