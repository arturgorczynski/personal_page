<template>
  <section class="section">
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
</template>

<script setup>
defineProps({
  cv: {
    type: Object,
    required: true
  },
  cvDownloadUrl: {
    type: String,
    required: true
  }
});
</script>
