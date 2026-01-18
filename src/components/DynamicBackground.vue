<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: Object,
    required: true
  }
})

const gradientStyle = computed(() => ({
  '--color-primary': props.color.primary,
  '--color-secondary': props.color.secondary
}))
</script>

<template>
  <div
    class="dynamic-background"
    :style="gradientStyle"
  >
    <!-- Main gradient layer -->
    <div class="gradient-layer" />
    
    <!-- Animated mesh gradient -->
    <div class="mesh-layer">
      <div class="mesh-blob blob-1" />
      <div class="mesh-blob blob-2" />
      <div class="mesh-blob blob-3" />
      <div class="mesh-blob blob-4" />
    </div>
    
    <!-- Floating particles -->
    <div class="particles-layer">
      <div
        v-for="n in 20"
        :key="n"
        class="particle"
        :style="{
          '--delay': `${Math.random() * 15}s`,
          '--duration': `${15 + Math.random() * 20}s`,
          '--x-start': `${Math.random() * 100}%`,
          '--y-start': `${Math.random() * 100}%`,
          '--size': `${2 + Math.random() * 4}px`
        }"
      />
    </div>
    
    <!-- Overlay for depth -->
    <div class="noise-overlay" />
  </div>
</template>

<style scoped>
.dynamic-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
}

.gradient-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 50%,
    var(--color-primary) 100%
  );
  opacity: 0.15;
}

.mesh-layer {
  position: absolute;
  inset: 0;
  filter: blur(80px);
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
}

.blob-1 {
  width: 60vmax;
  height: 60vmax;
  top: -20%;
  left: -10%;
  background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
  animation: float-1 25s ease-in-out infinite;
  opacity: 0.5;
}

.blob-2 {
  width: 50vmax;
  height: 50vmax;
  bottom: -20%;
  right: -10%;
  background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
  animation: float-2 30s ease-in-out infinite;
  opacity: 0.4;
}

.blob-3 {
  width: 40vmax;
  height: 40vmax;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--color-primary) 0%, transparent 60%);
  animation: float-3 20s ease-in-out infinite;
  opacity: 0.3;
}

.blob-4 {
  width: 35vmax;
  height: 35vmax;
  top: 10%;
  right: 20%;
  background: radial-gradient(circle, var(--color-secondary) 0%, transparent 60%);
  animation: float-4 22s ease-in-out infinite;
  opacity: 0.35;
}

@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10%, 10%) rotate(90deg);
  }
  50% {
    transform: translate(5%, 20%) rotate(180deg);
  }
  75% {
    transform: translate(15%, 5%) rotate(270deg);
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-15%, -10%) scale(1.1);
  }
  66% {
    transform: translate(-5%, -20%) scale(0.9);
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
  }
}

@keyframes float-4 {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-20%, 15%) rotate(180deg);
  }
}

.particles-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  left: var(--x-start);
  top: var(--y-start);
  animation: drift var(--duration) var(--delay) ease-in-out infinite;
  opacity: 0;
}

@keyframes drift {
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translate(calc(50vw - 100%), calc(-100vh));
  }
}

.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .mesh-blob,
  .particle {
    animation: none;
  }
  
  .blob-1, .blob-2, .blob-3, .blob-4 {
    animation: none;
  }
  
  .particle {
    opacity: 0.5;
  }
}
</style>
