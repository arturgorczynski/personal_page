<template>
  <section class="section">
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
</template>

<script setup>
defineProps({
  evangelistPanels: {
    type: Array,
    required: true
  }
});
</script>
