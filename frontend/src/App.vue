<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark navbar-glow fixed-top">
      <div class="container">
        <a class="navbar-brand fw-semibold" href="#top">AG</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <div class="navbar-nav ms-auto">
            <a class="anchor-link" href="#welcome">Welcome</a>
            <a class="anchor-link" href="#cv">CV</a>
            <a class="anchor-link" href="#projects">Projects</a>
            <a class="anchor-link" href="#evangelist">TechDemocracy</a>
          </div>
        </div>
      </div>
    </nav>

    <main id="top" class="pt-5">
      <section id="welcome" class="section">
        <div class="container">
          <div class="row align-items-center g-4">
            <div class="col-lg-6">
              <p class="text-uppercase text-secondary fw-semibold">Welcome</p>
              <h1 class="display-4 fw-bold">
                {{ profile.name || "Your Name" }}
              </h1>
              <h2 class="h4 text-secondary mb-3">
                {{ profile.role || "AI/LLM & Data Science Evangelist" }}
              </h2>
              <p class="lead text-secondary">
                {{ profile.tagline || defaultTagline }}
              </p>
              <div class="d-flex flex-wrap gap-2 mb-4">
                <span class="profile-chip">📍 {{ profile.location || "Global" }}</span>
                <span class="profile-chip">✉️ {{ profile.email || "hello@example.com" }}</span>
                <span v-if="profile.phone" class="profile-chip">📞 {{ profile.phone }}</span>
              </div>
              <div class="d-flex flex-wrap gap-2">
                <a
                  v-for="link in profile.links"
                  :key="link.label"
                  class="btn btn-outline-light btn-sm"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card-neo p-4">
                <h3 class="h5 fw-semibold mb-3">Business Card</h3>
                <div class="row g-3">
                  <div v-for="card in businessCards" :key="card.title" class="col-sm-6">
                    <div class="details-panel h-100">
                      <p class="text-uppercase text-secondary small">{{ card.title }}</p>
                      <p class="mb-0">{{ card.body }}</p>
                    </div>
                  </div>
                  <div v-if="profile.highlights && profile.highlights.length" class="col-sm-12">
                    <div class="details-panel">
                      <p class="text-uppercase text-secondary small">Highlights</p>
                      <ul class="mb-0 text-secondary">
                        <li v-for="item in profile.highlights" :key="item">{{ item }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cv" class="section">
        <div class="container">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div>
              <p class="text-uppercase text-secondary fw-semibold">Curriculum Vitae</p>
              <h2 class="display-6 fw-bold">Experience & Credentials</h2>
              <p class="text-secondary">The CV section renders from a CSV file so you can update it anytime.</p>
            </div>
            <a class="btn button-accent mt-3 mt-md-0" :href="cvDownloadUrl" target="_blank" rel="noopener">
              Download PDF
            </a>
          </div>

          <div class="row g-4">
            <div class="col-lg-4">
              <div class="card-neo p-4 h-100">
                <h3 class="h5 fw-semibold">Highlights</h3>
                <p class="text-secondary">Structured summary of your background with expandable categories.</p>
                <div class="mt-4">
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <span class="badge badge-soft">CSV-driven</span>
                    <span class="badge badge-soft">Easy updates</span>
                  </div>
                  <p class="text-secondary mb-0">
                    Update <code>backend/data/cv.csv</code> and upload a fresh PDF to
                    <code>backend/data/uploads/CV.pdf</code>.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div v-for="(items, section) in cv.sections" :key="section" class="details-panel">
                <details open>
                  <summary class="h5 fw-semibold mb-3">{{ section }}</summary>
                  <div v-for="item in items" :key="item.title" class="timeline-item">
                    <div class="d-flex flex-column flex-md-row justify-content-between">
                      <div>
                        <h4 class="h6 mb-1">{{ item.title }}</h4>
                        <p class="text-secondary mb-1">{{ item.subtitle }}</p>
                      </div>
                      <p class="text-secondary">{{ item.period }}</p>
                    </div>
                    <p class="text-secondary mb-0">{{ item.details }}</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="section">
        <div class="container">
          <p class="text-uppercase text-secondary fw-semibold">Projects</p>
          <h2 class="display-6 fw-bold mb-4">Applied AI & Data Science Work</h2>
          <div class="row g-4">
            <div v-for="project in projects" :key="project.name" class="col-md-4">
              <div class="card-neo p-4 h-100">
                <h3 class="h5 fw-semibold">{{ project.name }}</h3>
                <p class="text-secondary">{{ project.summary }}</p>
                <div class="mb-3">
                  <span v-for="tag in project.stack" :key="tag" class="badge badge-soft me-1">{{ tag }}</span>
                </div>
                <p class="text-secondary mb-0">{{ project.impact }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evangelist" class="section">
        <div class="container">
          <p class="text-uppercase text-secondary fw-semibold">TechDemocracy</p>
          <h2 class="display-6 fw-bold">AI/LLM Education & Community</h2>
          <div class="row g-4">
            <div class="col-lg-7">
              <div class="card-neo p-4 h-100">
                <h3 class="h5 fw-semibold">Mission</h3>
                <p class="text-secondary">
                  TechDemocracy is the initiative dedicated to making AI and data science approachable,
                  ethical, and inclusive. I host talks, publish playbooks, and mentor teams to elevate
                  digital literacy.
                </p>
                <ul class="text-secondary">
                  <li>Community workshops on LLM fundamentals and responsible AI.</li>
                  <li>Open-source templates for rapid experimentation and governance.</li>
                  <li>Mentorship for product teams adopting AI safely.</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="card-neo p-4">
                <h3 class="h5 fw-semibold">Get Involved</h3>
                <p class="text-secondary">
                  Looking to partner on AI education or host a session? I am happy to collaborate on
                  community events, corporate trainings, or public speaking.
                </p>
                <div v-for="item in evangelistPanels" :key="item.title" class="details-panel">
                  <p class="text-uppercase text-secondary small">{{ item.title }}</p>
                  <p class="mb-0">{{ item.body }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="section">
      <div class="container text-center">
        <p class="footer-note">© 2024 Artur Gorczyński · Crafted for AI-forward storytelling.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";

const defaultTagline =
  "I design intelligent systems that feel intuitive, trustworthy, and ready for enterprise reality.";

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

const businessCards = [
  {
    title: "Focus",
    body: "Generative AI, NLP, ML strategy, and AI governance."
  },
  {
    title: "Availability",
    body: "Talks, workshops, advisory, and product discovery."
  }
];

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
