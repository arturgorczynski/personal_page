<template>
  <div class="app-shell">
    <!-- Global particles background for all pages -->
    <div class="global-particles">
      <span
        v-for="n in particleCount"
        :key="'global-particle-' + n"
        class="particle"
        :style="getParticleStyle(n)"
      ></span>
    </div>
    <header class="top-nav">
      <div class="nav-card">
        <div class="brand">
          <span class="brand-mark">AG</span>
          <div class="brand-text">
            <h1 class="h6 mb-1">Artur Gorczyński</h1>
            <p class="text-secondary small mb-0">AI/LLM & ML Leader</p>
          </div>
        </div>
        <nav class="nav nav-pills gap-2">
          <RouterLink class="nav-link" to="/">Welcome</RouterLink>
          <RouterLink class="nav-link" to="/cv">CV</RouterLink>
          <RouterLink class="nav-link" to="/projects">Projects</RouterLink>
          <RouterLink class="nav-link" to="/evangelist">TechDemocracy</RouterLink>
          <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
        </nav>
        <a class="btn button-accent" :href="cvDownloadUrl" target="_blank" rel="noopener">
          Download CV
        </a>
      </div>
    </header>

    <main class="content">
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          :profile="profile"
          :cv="cv"
          :projects="projects"
          :technologies="technologies"
          :info-points="infoPoints"
          :evangelist-panels="evangelistPanels"
          :cv-download-url="cvDownloadUrl"
          :photo-url="photoUrl"
        />
      </RouterView>
      <footer class="section">
        <div class="container text-center">
          <p class="footer-note">© 2024 Artur Gorczyński · Crafted for AI-forward storytelling.</p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useParticles } from "./composables/useParticles";
import { useApiData } from "./composables/useApi";

// Particle system for global background
const { getParticleStyle, particleCount } = useParticles(56);

// API data loading
const {
  profile,
  cv,
  projects,
  technologies,
  infoPoints,
  evangelistPanels,
  cvDownloadUrl,
  photoUrl,
} = useApiData();
</script>
