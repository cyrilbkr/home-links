<script setup>
import { inject, computed } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Home Links'
  },
  subtitle: {
    type: String,
    default: ''
  }
})

const currentColor = inject('currentColor')

const accentStyle = computed(() => ({
  '--accent': currentColor?.primary || '#667eea'
}))
</script>

<template>
  <header
    class="header"
    :style="accentStyle"
  >
    <div class="header-content">
      <div class="header-text">
        <h1 class="title">
          <span class="title-icon">🏠</span>
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="subtitle"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>
    
    <div class="header-decoration">
      <div class="decoration-line" />
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 2rem 0;
  animation: fadeIn 0.6s ease-out;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.header-text {
  flex: 1;
}

.title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  line-height: 1.1;
}

.title-icon {
  font-size: 0.9em;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.subtitle {
  margin-top: 0.75rem;
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 300;
  max-width: 600px;
}

.header-decoration {
  margin-top: 2rem;
}

.decoration-line {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent),
    transparent
  );
  border-radius: 1px;
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem 0;
  }

  .title {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
