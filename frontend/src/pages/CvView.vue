<template>
  <section class="section">
    <div class="container">
      <div class="mb-4">
        <p class="text-uppercase text-secondary fw-semibold">Curriculum Vitae</p>
        <h2 class="display-6 fw-bold">Experience</h2>
      </div>

      <div class="row g-4">
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="text-uppercase text-secondary small mb-2">Few words about me</p>
            <p class="text-secondary mb-0">{{ cv.summary }}</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="text-uppercase text-secondary small mb-2">Personal + Languages</p>
            <div class="details-panel details-panel-compact">
              <p class="text-secondary mb-1">{{ cv.personal.name }}</p>
              <p class="text-secondary mb-1">{{ cv.personal.location }}</p>
              <p class="text-secondary mb-1">{{ cv.personal.nationality }}</p>
              <p class="text-secondary mb-1">{{ cv.personal.email }}</p>
              <p class="text-secondary mb-3">{{ cv.personal.phone }}</p>
              <div class="d-flex flex-wrap gap-2">
                <span v-for="lang in cv.personal.languages" :key="lang" class="badge badge-soft">
                  {{ lang }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="text-uppercase text-secondary small mb-2">Skills</p>
            <div class="d-flex flex-wrap gap-2">
              <span v-for="skill in cv.skills" :key="skill" class="badge badge-soft">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-neo p-4 mt-4">
        <p class="text-uppercase text-secondary small mb-3">Work Experience</p>
        <div class="cv-timeline">
          <div class="cv-timeline-line"></div>
          <div class="cv-timeline-years">
            <span v-for="year in timelineYears" :key="year">{{ year }}</span>
          </div>
          <button
            v-for="(item, index) in cv.experience"
            :key="item.company + item.role"
            class="cv-timeline-dot"
            :style="dotStyle(item.start)"
            @click="activeExperience = index"
          >
            <span class="cv-dot"></span>
            <span class="cv-dot-label">{{ item.company }}</span>
            <span class="cv-dot-role">{{ item.role }}</span>
          </button>
        </div>
        <div v-if="activeExperience !== null" class="details-panel mt-4">
          <h4 class="h6 mb-1">{{ cv.experience[activeExperience].role }}</h4>
          <p class="text-secondary mb-1">{{ cv.experience[activeExperience].company }}</p>
          <p class="text-secondary mb-3">
            {{ cv.experience[activeExperience].start }} – {{ cv.experience[activeExperience].end }}
          </p>
          <ul class="text-secondary mb-0">
            <li v-for="detail in cv.experience[activeExperience].details" :key="detail">
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>

      <div class="row g-4 mt-2">
        <div class="col-lg-6">
          <div class="card-neo p-4 h-100">
            <p class="text-uppercase text-secondary small mb-2">Education</p>
            <div v-for="item in cv.education" :key="item.degree" class="details-panel details-panel-compact">
              <p class="text-secondary mb-1">{{ item.degree }}</p>
              <p class="text-secondary mb-1">{{ item.school }}</p>
              <p class="text-secondary mb-0">{{ item.period }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-neo p-4 h-100">
            <p class="text-uppercase text-secondary small mb-2">Hobby</p>
            <div class="details-panel details-panel-compact">
              <ul class="text-secondary mb-0">
                <li v-for="item in cv.hobby" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  cv: {
    type: Object,
    required: true
  }
});

const activeExperience = ref(0);

const timelineStart = 2015;
const timelineEnd = 2026;
const timelineYears = Array.from(
  { length: timelineEnd - timelineStart + 1 },
  (_, index) => timelineStart + index
);

const dotStyle = (year) => {
  const clamped = Math.min(Math.max(year, timelineStart), timelineEnd);
  const percent = ((clamped - timelineStart) / (timelineEnd - timelineStart)) * 100;
  return { left: `${percent}%` };
};
</script>
