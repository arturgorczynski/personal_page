<template>
  <section class="section">
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
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    required: true
  }
});
</script>
