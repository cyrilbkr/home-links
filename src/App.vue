<script setup>
import { onMounted, provide } from 'vue'
import DynamicBackground from './components/DynamicBackground.vue'
import Header from './components/Header.vue'
import LinkSection from './components/LinkSection.vue'
import { useConfig } from './composables/useConfig'
import { useColor } from './composables/useColor'

const { config, loadConfig, isLoading } = useConfig()
const { currentColor } = useColor()

// Provide color state to all components
provide('currentColor', currentColor)

onMounted(async () => {
  await loadConfig()
})
</script>

<template>
  <div class="app-container">
    <DynamicBackground :color="currentColor" />
    
    <main class="main-content">
      <Header 
        :title="config?.title || 'Home Links'" 
        :subtitle="config?.subtitle"
      />

      <div
        v-if="isLoading"
        class="loading"
      >
        <div class="loading-spinner" />
        <p>Loading...</p>
      </div>

      <div
        v-else
        class="sections-container"
      >
        <LinkSection
          v-for="(section, index) in config?.sections || []"
          :key="section.id || index"
          :section="section"
          :style="{ animationDelay: `${index * 0.1}s` }"
        />
      </div>
    </main>

    <footer class="app-footer">
      <p>{{ config?.footer || '© 2026 Home Links' }}</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.sections-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.app-footer {
  text-align: center;
  padding: 1.5rem;
  color: var(--text-muted);
  font-size: 0.875rem;
  font-family: var(--font-mono);
}

/* Mobile */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .sections-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
