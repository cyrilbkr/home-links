<script setup>
import { inject, computed } from 'vue'
import LinkCard from './LinkCard.vue'

defineProps({
  section: {
    type: Object,
    required: true
  }
})

const currentColor = inject('currentColor')

const accentStyle = computed(() => ({
  '--section-accent': currentColor.value?.primary || '#667eea'
}))
</script>

<template>
  <section
    class="link-section"
    :style="accentStyle"
  >
    <header class="section-header">
      <span
        class="section-icon"
        aria-hidden="true"
      >{{ section.icon || '📁' }}</span>
      <h2 class="section-title">
        {{ section.title }}
      </h2>
      <span class="section-count">{{ section.links?.length || 0 }}</span>
    </header>
    
    <div class="links-grid">
      <LinkCard
        v-for="(link, index) in section.links"
        :key="link.url || index"
        :link="link"
        :style="{ animationDelay: `${index * 0.05}s` }"
      />
    </div>
  </section>
</template>

<style scoped>
.link-section {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  box-shadow: var(--glass-shadow);
  animation: fadeIn 0.6s ease-out backwards;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.section-title {
  flex: 1;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.section-count {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--text-secondary);
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .link-section {
    padding: 1.25rem;
    border-radius: 16px;
  }

  .section-icon {
    font-size: 1.25rem;
  }

  .section-title {
    font-size: 1.125rem;
  }
}
</style>
