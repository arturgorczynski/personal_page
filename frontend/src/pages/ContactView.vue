<template>
  <section class="section">
    <div class="container">
      <p class="text-uppercase text-secondary fw-semibold">Contact</p>
      <h2 class="display-6 fw-bold mb-4">Let’s Connect</h2>
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="card-neo p-4 h-100">
            <h3 class="h5 fw-semibold">Reach Out</h3>
            <p class="text-secondary">
              Feel free to contact me for speaking, collaboration, or AI strategy support. I respond
              quickly and value meaningful partnerships.
            </p>
            <div class="details-panel">
              <p class="text-uppercase text-secondary small">Email</p>
              <p class="mb-0">{{ profile.email }}</p>
            </div>
            <div v-if="profile.phone" class="details-panel">
              <p class="text-uppercase text-secondary small">Phone</p>
              <p class="mb-0">{{ profile.phone }}</p>
            </div>
            <div class="details-panel">
              <p class="text-uppercase text-secondary small">Location</p>
              <p class="mb-0">{{ profile.location }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-neo p-4 h-100">
            <h3 class="h5 fw-semibold">Links</h3>
            <p class="text-secondary">Connect on the platforms below.</p>
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
            <div class="details-panel mt-3">
              <p class="text-uppercase text-secondary small">Availability</p>
              <p class="mb-0">Talks, workshops, advisory, and product discovery.</p>
            </div>
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
</script>
