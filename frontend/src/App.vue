<template>
  <div class="app-shell">
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
          :evangelist-panels="evangelistPanels"
          :cv-download-url="cvDownloadUrl"
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
import { onMounted, reactive } from "vue";
import { RouterLink, RouterView } from "vue-router";

const profile = reactive({
  name: "",
  role: "",
  tagline: "",
  location: "",
  email: "",
  phone: "",
  links: [],
  highlights: []
});

const cv = reactive({ sections: {} });
const projects = reactive([]);

const evangelistPanels = [
  {
    title: "Current Topics",
    body: "LLM safety, prompt engineering, AI product strategy, data governance."
  },
  {
    title: "Next Steps",
    body: "Reach out via email to align on format, audience, and outcomes."
  }
];

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const cvDownloadUrl = `${apiBase}/api/cv/download`;

const loadData = async () => {
  const [profileRes, cvRes, projectsRes] = await Promise.all([
    fetch(`${apiBase}/api/profile`),
    fetch(`${apiBase}/api/cv`),
    fetch(`${apiBase}/api/projects`)
  ]);

  Object.assign(profile, await profileRes.json());
  Object.assign(cv, await cvRes.json());

  const projectsData = await projectsRes.json();
  projects.splice(0, projects.length, ...projectsData);
};

onMounted(() => {
  loadData();
});
</script>
