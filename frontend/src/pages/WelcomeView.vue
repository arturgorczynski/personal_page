<template>
  <section class="section">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <div class="welcome-intro">
            <div class="profile-photo-wrapper">
              <img 
                :src="photoUrl" 
                alt="Artur Gorczyński" 
                class="profile-photo"
                @error="photoError = true"
                v-if="!photoError"
              />
              <div v-else class="profile-photo-placeholder">AG</div>
            </div>
            <div class="welcome-text">
              <h1 class="display-4 fw-bold">
                {{ profile.name || "Artur Gorczyński" }}
              </h1>
              <h2 class="h4 text-secondary mb-3">
                {{ profile.role || "AI/LLM & Data Science Evangelist" }}
              </h2>
              <p class="lead text-secondary">
                {{ profile.tagline || greeting }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-neo card-neo-compact p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <p class="text-uppercase business-card-label small mb-1">Business Card</p>
                <h3 class="h5 mb-0 business-card-title">{{ profile.name || "Artur Gorczyński" }}</h3>
              </div>
              <span class="profile-chip">{{ profile.location || "Cracow" }} · AI/LLM</span>
            </div>
            <div class="row g-3">
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase business-card-subtitle small">Name</p>
                  <p class="mb-0 business-card-info">{{ profile.name || "Artur Gorczyński" }}</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase business-card-subtitle small">Location</p>
                  <p class="mb-0 business-card-info">{{ profile.location || "Cracow, Poland" }}</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase business-card-subtitle small">Phone</p>
                  <p class="mb-0 business-card-info">{{ profile.phone || "+48 510 674 741" }}</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase business-card-subtitle small">Email</p>
                  <p class="mb-0 business-card-info">{{ profile.email || "arturgorczynski@gmail.com" }}</p>
                </div>
              </div>
              <div class="col-sm-12" v-for="link in displayLinks" :key="link.label">
                <div class="details-panel details-panel-compact h-100">
                  <p class="text-uppercase business-card-subtitle small">{{ link.label }}</p>
                  <a
                    class="text-decoration-none business-card-info"
                    :href="link.url"
                    target="_blank"
                    rel="noopener"
                  >
                    {{ formatLinkDisplay(link.url) }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- INFO POINTS - Anchored from center line -->
      <div class="info-points-section mt-5" @click="collapseAll">
        <!-- Center anchor line -->
        <div class="center-line"></div>
        
        <!-- Points positioned from center -->
        <div 
          v-for="item in displayInfoPoints" 
          :key="item.id"
          class="info-point"
          :style="{ left: `calc(50% + ${item.offset}px)`, top: item.top }"
          @click.stop="toggleInfo(item.id)"
        >
          <span class="info-dot"></span>
          <div class="info-label">
            <h3 class="info-title">{{ item.title }}</h3>
            <transition name="info-expand">
              <p v-if="expandedInfo[item.id]" class="info-body">{{ item.body }}</p>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  infoPoints: {
    type: Array,
    default: () => []
  },
  photoUrl: {
    type: String,
    default: ""
  }
});

const photoError = ref(false);
const expandedInfo = ref({});

const toggleInfo = (id) => {
  const wasExpanded = expandedInfo.value[id];
  expandedInfo.value = {};
  if (!wasExpanded) {
    expandedInfo.value[id] = true;
  }
};

const collapseAll = () => {
  expandedInfo.value = {};
};

const greeting = "AI/LLM leader focused on building elegant, human-centered systems with measurable impact.";

// Fallback info points if API data not available
const fallbackInfoPoints = [
  { id: 'focus', title: "Focus", body: "Generative AI, NLP, and production-grade machine learning solutions.", offset: -280, top: '60px' },
  { id: 'availability', title: "Availability", body: "Talks, workshops, advisory, and product discovery sessions.", offset: 460, top: '140px' },
  { id: 'technology', title: "Technology", body: "Python, FastAPI, PyTorch, LLM tooling, and cloud-native MLOps.", offset: -460, top: '220px' },
  { id: 'expertise', title: "Area of expertise", body: "AI strategy, NLP, generative AI systems, and data-driven product leadership.", offset: 220, top: '300px' }
];

// Use API data if available, otherwise fallback
const displayInfoPoints = computed(() => 
  props.infoPoints.length > 0 ? props.infoPoints : fallbackInfoPoints
);

// Fallback links
const fallbackLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/arturgorczynski/" },
  { label: "GitHub", url: "https://github.com/arturgorczynski" }
];

const displayLinks = computed(() => 
  props.profile.links && props.profile.links.length > 0 ? props.profile.links : fallbackLinks
);

// Format URL for display (remove protocol and trailing slash)
const formatLinkDisplay = (url) => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
};
</script>
