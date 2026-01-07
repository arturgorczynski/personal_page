<template>
  <section class="section">
    <div class="container">
      <p class="text-uppercase text-secondary fw-semibold">Projects authored or co-authored</p>
      <h2 class="display-6 fw-bold mb-4">Projects</h2>
      <div class="row g-4">
        <div v-for="project in projects" :key="project.name" class="col-md-4">
          <div class="card-neo p-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <img class="project-icon" :src="iconFor(project.icon)" :alt="project.name" />
              <div>
                <h3 class="h5 fw-semibold mb-1">{{ project.name }}</h3>
                <p class="text-secondary mb-0">{{ project.summary }}</p>
              </div>
            </div>
            <div class="mb-3">
              <span v-for="tag in project.stack" :key="tag" class="badge badge-soft me-1">{{ tag }}</span>
            </div>
            <button class="btn btn-outline-light btn-sm" @click="openProject(project)">
              View details
            </button>
          </div>
        </div>
      </div>

      <div v-if="activeProject" class="project-modal">
        <div class="project-modal-backdrop" @click="closeProject"></div>
        <div class="project-modal-card card-neo">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center gap-3">
              <img class="project-icon" :src="iconFor(activeProject.icon)" :alt="activeProject.name" />
              <div>
                <p class="text-uppercase text-secondary small mb-1">Project</p>
                <h3 class="h4 fw-semibold mb-0">{{ activeProject.name }}</h3>
              </div>
            </div>
            <button class="btn btn-outline-light btn-sm" @click="closeProject">Close</button>
          </div>
          <p class="text-secondary mb-4">{{ activeProject.summary }}</p>
          <div class="row g-3">
            <div class="col-md-4">
              <div class="details-panel details-panel-compact h-100">
                <p class="text-uppercase text-secondary small">Project Business Description</p>
                <p class="mb-0 text-secondary">{{ activeProject.business_description }}</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="details-panel details-panel-compact h-100">
                <p class="text-uppercase text-secondary small">Project Technical Description</p>
                <p class="mb-0 text-secondary">{{ activeProject.technical_description }}</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="details-panel details-panel-compact h-100">
                <p class="text-uppercase text-secondary small">Involvements Scope</p>
                <p class="mb-0 text-secondary">{{ activeProject.scope }}</p>
              </div>
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
  projects: {
    type: Array,
    required: true
  }
});

const icons = import.meta.glob("../assets/*.svg", { eager: true, import: "default" });

const iconFor = (name) => icons[`../assets/${name}`] || "";

const activeProject = ref(null);

const openProject = (project) => {
  activeProject.value = project;
};

const closeProject = () => {
  activeProject.value = null;
};
</script>
