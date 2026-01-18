<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  link: {
    type: Object,
    required: true
  }
})

const currentColor = inject('currentColor')

const cardStyle = computed(() => ({
  '--hover-color': currentColor.value?.primary || '#667eea'
}))

const faviconUrl = computed(() => {
  if (props.link.favicon) return props.link.favicon
  try {
    const url = new URL(props.link.url)
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`
  } catch {
    return null
  }
})
</script>

<template>
  <a 
    :href="link.url" 
    class="link-card"
    :style="cardStyle"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="link-icon">
      <span
        v-if="link.icon"
        class="emoji-icon"
      >{{ link.icon }}</span>
      <img 
        v-else-if="faviconUrl" 
        :src="faviconUrl" 
        :alt="`${link.name} favicon`"
        class="favicon"
        loading="lazy"
        @error="$event.target.style.display='none'"
      >
      <span
        v-else
        class="fallback-icon"
      >🔗</span>
    </div>
    
    <div class="link-content">
      <span class="link-name">{{ link.name }}</span>
      <span
        v-if="link.description"
        class="link-description"
      >{{ link.description }}</span>
    </div>
    
    <div class="link-arrow">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </div>
  </a>
</template>

<style scoped>
.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s var(--transition-smooth);
  animation: fadeIn 0.4s ease-out backwards;
}

.link-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--hover-color);
  transform: translateX(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2),
              0 0 0 1px var(--hover-color);
}

.link-card:active {
  transform: translateX(8px) scale(0.99);
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  flex-shrink: 0;
  overflow: hidden;
}

.emoji-icon {
  font-size: 1.5rem;
}

.favicon {
  width: 28px;
  height: 28px;
  border-radius: 4px;
}

.fallback-icon {
  font-size: 1.25rem;
  opacity: 0.7;
}

.link-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.link-name {
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-description {
  font-size: 0.8125rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--text-muted);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s var(--transition-smooth);
}

.link-card:hover .link-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--hover-color);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .link-card {
    padding: 0.875rem 1rem;
    gap: 0.875rem;
  }

  .link-icon {
    width: 40px;
    height: 40px;
  }

  .emoji-icon {
    font-size: 1.25rem;
  }

  .link-arrow {
    display: none;
  }
}
</style>
