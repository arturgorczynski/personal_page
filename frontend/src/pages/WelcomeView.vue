<template>
  <section class="section">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <h1 class="display-4 fw-bold">
            {{ profile.name || "Artur Gorczyński" }}
          </h1>
          <h2 class="h4 text-secondary mb-3">
            {{ profile.role || "AI/LLM & Data Science Evangelist" }}
          </h2>
          <p class="lead text-secondary">
            {{ greeting }}
          </p>
        </div>
        <div class="col-lg-6">
          <div class="card-neo card-neo-compact p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <p class="text-uppercase text-secondary small mb-1">Business Card</p>
                <h3 class="h5 fw-semibold mb-0">Artur Gorczyński</h3>
              </div>
              <span class="profile-chip">Poland · AI/LLM</span>
            </div>
            <div class="row g-3">
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase text-secondary small">Name</p>
                  <p class="mb-0">Artur</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase text-secondary small">Last name</p>
                  <p class="mb-0">Gorczyński</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase text-secondary small">Country</p>
                  <p class="mb-0">Poland</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase text-secondary small">Languages</p>
                  <p class="mb-0">Polish, English</p>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase text-secondary small">Email</p>
                  <p class="mb-0">{{ profile.email || "arturgorczynski@gmail.com" }}</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase text-secondary small">LinkedIn</p>
                  <a
                    class="text-decoration-none text-secondary"
                    href="https://www.linkedin.com/in/arturgorczynski/"
                    target="_blank"
                    rel="noopener"
                  >
                    linkedin.com/in/arturgorczynski
                  </a>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase text-secondary small">GitHub</p>
                  <a
                    class="text-decoration-none text-secondary"
                    href="https://github.com/arturgorczynski"
                    target="_blank"
                    rel="noopener"
                  >
                    github.com/arturgorczynski
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline mt-5">
        <div class="timeline-line"></div>
        <div
          v-for="(item, index) in timelineItems"
          :key="item.title"
          class="timeline-row"
          :class="index % 2 === 0 ? 'align-left' : 'align-right'"
        >
          <div class="timeline-point">
            <span class="point-dot"></span>
            <details class="timeline-details">
              <summary class="timeline-title">{{ item.title }}</summary>
              <div class="card-neo p-3 mt-3">
                <p class="text-secondary mb-0">{{ item.body }}</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true
  }
});

const greeting =
  "AI/LLM leader focused on building elegant, human-centered systems with measurable impact.";

const timelineItems = [
  {
    title: "Focus",
    body: "Generative AI, NLP, and production-grade machine learning solutions."
  },
  {
    title: "Availability",
    body: "Talks, workshops, advisory, and product discovery sessions."
  },
  {
    title: "Technology",
    body: "Python, FastAPI, PyTorch, LLM tooling, and cloud-native MLOps."
  },
  {
    title: "Area of expertise",
    body: "AI strategy, NLP, generative AI systems, and data-driven product leadership."
  }
];
</script>
