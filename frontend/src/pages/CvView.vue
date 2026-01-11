<template>
  <section class="section" @click="handleBackgroundClick">
    <div class="container">
      <div class="mb-4">
        <p class="text-uppercase text-secondary fw-semibold">Curriculum Vitae</p>
        <h2 class="display-6 fw-bold">Experience</h2>
      </div>

      <div class="row g-4">
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="section-header mb-3">Few words about me</p>
            <div class="details-panel details-panel-compact">
              <p class="professional-mission mb-2">My Professional Mission</p>
              <p class="text-secondary mb-0">{{ cv.summary }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="section-header mb-3">Personal Information</p>
            <div class="details-panel details-panel-compact mb-3">
              <p class="personal-name mb-1">{{ cv.personal.name }}</p>
              <p class="text-secondary mb-1">{{ cv.personal.location }}</p>
              <p class="text-secondary mb-1">{{ cv.personal.nationality }}</p>
              <p class="text-secondary mb-1">{{ cv.personal.email }}</p>
              <p class="text-secondary mb-0">{{ cv.personal.phone }}</p>
            </div>
            <div class="language-card">
              <p class="section-header mb-2">Languages</p>
              <div class="language-list">
                <div v-for="lang in cv.personal.languages" :key="lang" class="language-item">
                  {{ formatLanguage(lang) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="section-header mb-3">Skills</p>
            <div class="skills-container">
              <span v-for="skill in cv.skills" :key="skill" class="skill-badge">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-neo p-4 mt-4">
        <!-- Tab Navigation -->
        <ul class="nav nav-tabs cv-tabs mb-3" role="tablist">
          <li class="nav-item" role="presentation">
            <button 
              class="nav-link active" 
              id="experience-tab" 
              data-bs-toggle="tab" 
              data-bs-target="#experience" 
              type="button" 
              role="tab"
            >
              Work Experience
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button 
              class="nav-link" 
              id="technology-tab" 
              data-bs-toggle="tab" 
              data-bs-target="#technology" 
              type="button" 
              role="tab"
            >
              Technology and Skills
            </button>
          </li>
        </ul>
        
        <!-- Tab Content -->
        <div class="tab-content">
          <div class="tab-pane fade show active" id="experience" role="tabpanel">
            <div class="cv-timeline" ref="timelineContainer">
              <!-- SVG Timeline -->
              <svg 
                ref="timelineSvg"
                class="cv-timeline-svg" 
                :viewBox="`0 0 ${timeline.svgWidth} ${timeline.svgHeight}`"
                preserveAspectRatio="none"
              >
                <defs>
                  <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M 0 0 L 5 3 L 0 6 z" fill="rgba(212, 175, 55, 0.4)" stroke="none" />
                  </marker>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <path
                  :d="timeline.pathDataWithArrow.value"
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.4)"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  marker-end="url(#arrowHead)"
                />
                
                <circle r="5" fill="#f7e7b2" filter="url(#glow)" class="pulse-circle">
                  <animateMotion 
                    :path="timeline.pathDataWithArrow.value" 
                    dur="4s" 
                    repeatCount="indefinite"
                    rotate="auto"
                  />
                </circle>
                <circle r="3" fill="#f7e7b2" opacity="0.5" class="pulse-circle-trail">
                  <animateMotion 
                    :path="timeline.pathDataWithArrow.value" 
                    dur="4s" 
                    repeatCount="indefinite"
                    rotate="auto"
                    begin="-0.4s"
                  />
                </circle>
                
                <!-- Year tick marks for bottom line -->
                <g v-for="year in timeline.bottomYears" :key="'btick-'+year">
                  <line
                    :x1="timeline.getYearX(year, 'bottom')"
                    :y1="timeline.bottomY - 5"
                    :x2="timeline.getYearX(year, 'bottom')"
                    :y2="timeline.bottomY + 5"
                    stroke="rgba(212, 175, 55, 0.5)"
                    stroke-width="1.5"
                  />
                  <text
                    :x="timeline.getYearX(year, 'bottom')"
                    :y="timeline.bottomY + 28"
                    text-anchor="middle"
                    fill="rgba(203, 213, 245, 0.85)"
                    font-size="13"
                    font-weight="500"
                  >{{ year }}</text>
                </g>
                
                <!-- Year tick marks for top line -->
                <g v-for="year in timeline.topYears" :key="'ttick-'+year">
                  <line
                    :x1="timeline.getYearX(year, 'top')"
                    :y1="timeline.topY - 5"
                    :x2="timeline.getYearX(year, 'top')"
                    :y2="timeline.topY + 5"
                    stroke="rgba(212, 175, 55, 0.5)"
                    stroke-width="1.5"
                  />
                  <text
                    :x="timeline.getYearX(year, 'top')"
                    :y="timeline.topY - 20"
                    text-anchor="middle"
                    fill="rgba(203, 213, 245, 0.85)"
                    font-size="13"
                    font-weight="500"
                  >{{ year }}</text>
                </g>
                
                <!-- Dots on the path -->
                <g v-for="(item, index) in experiencePositions" :key="'dot-' + item.originalIndex">
                  <circle
                    :cx="item.x"
                    :cy="item.y"
                    r="9"
                    fill="#d4af37"
                    stroke="#1f2937"
                    stroke-width="2"
                    class="cv-path-dot"
                    :class="{ active: selectedExperience === item.originalIndex }"
                    @click.stop="selectExperience(item.originalIndex)"
                  />
                </g>
              </svg>
              
              <!-- Labels positioned outside SVG -->
              <div 
                v-for="(item, index) in experiencePositions" 
                :key="'label-' + item.originalIndex"
                class="cv-timeline-label"
                :class="{ 
                  'row-bottom': item.row === 'bottom',
                  'row-top': item.row === 'top',
                  'label-below': item.labelPosition === 'below',
                  'label-above': item.labelPosition === 'above',
                  'active': selectedExperience === item.originalIndex
                }"
                :style="{ 
                  left: (item.x / timeline.svgWidth * 100) + '%',
                  marginLeft: '0'
                }"
                @click.stop="selectExperience(item.originalIndex)"
              >
                <span class="cv-label-company">{{ item.company }}</span>
                <span class="cv-label-role">{{ item.role }}</span>
              </div>
            </div>
        
            <!-- Details panel -->
            <transition name="fade">
              <div v-if="selectedExperience !== null && cv.experience[selectedExperience]" class="details-panel mt-4">
                <h4 class="h6 mb-1 cv-detail-role">{{ cv.experience[selectedExperience].role }}</h4>
                <p class="cv-detail-company mb-1">{{ cv.experience[selectedExperience].company }}</p>
                <p class="cv-detail-dates mb-3">
                  {{ timeline.formatDateRange(cv.experience[selectedExperience].start, cv.experience[selectedExperience].end) }}
                </p>
                <ul class="cv-detail-list mb-0">
                  <li v-for="detail in cv.experience[selectedExperience].details" :key="detail">
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!-- Technology Tab -->
          <div class="tab-pane fade" id="technology" role="tabpanel">
            <div class="tech-timeline">
              <div class="tech-timeline-stage">
                <svg 
                  class="tech-timeline-svg" 
                  :viewBox="`0 0 ${timeline.svgWidth} ${timeline.svgHeight}`"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <marker id="techArrowHead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M 0 0 L 5 3 L 0 6 z" fill="rgba(34, 197, 94, 0.4)" stroke="none" />
                    </marker>
                    <filter id="techGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <path
                    :d="timeline.pathDataWithArrow.value"
                    fill="none"
                    stroke="rgba(34, 197, 94, 0.4)"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    marker-end="url(#techArrowHead)"
                  />
                  
                  <circle r="5" fill="#86efac" filter="url(#techGlow)" class="pulse-circle">
                    <animateMotion 
                      :path="timeline.pathDataWithArrow.value" 
                      dur="4s" 
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                  <circle r="3" fill="#86efac" opacity="0.5" class="pulse-circle-trail">
                    <animateMotion 
                      :path="timeline.pathDataWithArrow.value" 
                      dur="4s" 
                      repeatCount="indefinite"
                      rotate="auto"
                      begin="-0.4s"
                    />
                  </circle>
                  
                  <g v-for="year in timeline.bottomYears" :key="'tech-btick-'+year">
                    <line
                      :x1="timeline.getYearX(year, 'bottom')"
                      :y1="timeline.bottomY - 5"
                      :x2="timeline.getYearX(year, 'bottom')"
                      :y2="timeline.bottomY + 5"
                      stroke="rgba(34, 197, 94, 0.5)"
                      stroke-width="1.5"
                    />
                    <text
                      :x="timeline.getYearX(year, 'bottom')"
                      :y="timeline.bottomY + 28"
                      text-anchor="middle"
                      fill="rgba(203, 213, 245, 0.85)"
                      font-size="13"
                      font-weight="500"
                    >{{ year }}</text>
                  </g>
                  
                  <g v-for="year in timeline.topYears" :key="'tech-ttick-'+year">
                    <line
                      :x1="timeline.getYearX(year, 'top')"
                      :y1="timeline.topY - 5"
                      :x2="timeline.getYearX(year, 'top')"
                      :y2="timeline.topY + 5"
                      stroke="rgba(34, 197, 94, 0.5)"
                      stroke-width="1.5"
                    />
                    <text
                      :x="timeline.getYearX(year, 'top')"
                      :y="timeline.topY - 20"
                      text-anchor="middle"
                      fill="rgba(203, 213, 245, 0.85)"
                      font-size="13"
                      font-weight="500"
                    >{{ year }}</text>
                  </g>
                  
                  <g v-for="(group, index) in technologyPositions" :key="'tech-dot-'+group.date">
                    <circle
                      :cx="group.x"
                      :cy="group.y"
                      r="9"
                      fill="#22c55e"
                      stroke="#1f2937"
                      stroke-width="2"
                      class="tech-path-dot"
                      :class="{ active: selectedTechnology === group.date }"
                      @click.stop="selectTechnology(group.date)"
                    />
                  </g>
                </svg>
                
                <div 
                  v-for="(group, index) in technologyPositions" 
                  :key="'tech-label-'+group.date"
                  class="tech-timeline-label"
                  :class="{ 
                    'row-bottom': group.row === 'bottom',
                    'row-top': group.row === 'top',
                    'label-below': group.labelPosition === 'below',
                    'label-above': group.labelPosition === 'above',
                    'active': selectedTechnology === group.date
                  }"
                  :style="{ left: (group.x / timeline.svgWidth * 100) + '%' }"
                  @click.stop="selectTechnology(group.date)"
                >
                  <div class="tech-label-group">
                    <div class="tech-group-box">
                      <span 
                        v-for="(tech, idx) in group.technologies" 
                        :key="tech.name" 
                        class="tech-group-item"
                      >
                        {{ tech.name }}<span v-if="idx < group.technologies.length - 1" class="tech-comma">, </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Technology details panel -->
              <transition name="fade">
                <div v-if="selectedTechnology !== null" class="details-panel mt-4">
                  <div v-for="tech in getSelectedTechnologies()" :key="tech.name" class="mb-3">
                    <h4 class="h6 mb-1">{{ tech.name }}</h4>
                    <p class="text-secondary mb-0">{{ tech.description }}</p>
                  </div>
                  <p class="text-secondary small mt-3 mb-0">
                    Started: {{ timeline.formatDate(selectedTechnology) }}
                  </p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4 mt-2">
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="section-header mb-2">Education</p>
            <div v-for="item in cv.education" :key="item.degree" class="details-panel details-panel-compact">
              <p class="education-school mb-1">{{ item.school }}</p>
              <p class="education-degree mb-1">{{ item.degree }}</p>
              <p class="education-period mb-0">{{ item.period }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="section-header mb-2">Certifications and Courses</p>
            <div v-for="item in (cv.certifications || [])" :key="item.degree" class="details-panel details-panel-compact">
              <p class="certification-name mb-1">{{ item.degree }}</p>
              <p class="certification-school mb-1">{{ item.school }}</p>
              <p class="certification-period mb-0">{{ item.period }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-neo p-4 h-100">
            <p class="section-header mb-2">Hobby</p>
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
import { ref, computed } from "vue";
import { useTimeline } from "../composables/useTimeline";

const props = defineProps({
  cv: {
    type: Object,
    required: true
  },
  technologies: {
    type: Array,
    default: () => []
  }
});

// Use timeline composable
const timeline = useTimeline();

// Selection state
const selectedExperience = ref(null);
const selectedTechnology = ref(null);

const selectExperience = (index) => {
  selectedExperience.value = selectedExperience.value === index ? null : index;
};

const selectTechnology = (date) => {
  selectedTechnology.value = selectedTechnology.value === date ? null : date;
};

const handleBackgroundClick = (event) => {
  if (event.target.closest('.cv-path-dot, .cv-timeline-label, .tech-path-dot, .tech-timeline-label, .details-panel')) {
    return;
  }
  selectedExperience.value = null;
  selectedTechnology.value = null;
};

// Calculate experience positions using the composable
const experiencePositions = computed(() => {
  return timeline.calculateExperiencePositions(props.cv.experience);
});

// Fallback technologies if API data not available
const fallbackTechnologies = [
  { name: "Microsoft Suite", start: "2015-01", description: "Proficient in Excel, Word, PowerPoint, and Outlook." },
  { name: "Project Management", start: "2016-07", description: "Experienced in Agile methodologies." },
  { name: "Jira", start: "2016-07", description: "Project management and issue tracking." },
  { name: "Data Visualisation", start: "2016-07", description: "Creating effective data visualizations." },
  { name: "Python", start: "2018-01", description: "Advanced Python programming for data science." },
  { name: "SQL", start: "2018-01", description: "Expert in SQL for data querying." },
  { name: "Knowledge Sharing", start: "2018-01", description: "Sharing knowledge and best practices." },
  { name: "Machine Learning", start: "2019-04", description: "Deep expertise in ML algorithms." },
  { name: "Scikit Learn", start: "2019-04", description: "Machine learning library for Python." },
  { name: "Git", start: "2019-04", description: "Version control and collaboration." },
  { name: "Cloud", start: "2021-01", description: "Cloud infrastructure design and deployment." },
  { name: "AWS", start: "2021-01", description: "AWS Certified Solutions Architect." },
  { name: "forecasting", start: "2021-01", description: "Time series forecasting." },
  { name: "NLP", start: "2021-10", description: "Natural Language Processing." },
  { name: "Deep learning", start: "2021-10", description: "Deep learning models and neural networks." },
  { name: "PyTorch", start: "2022-05", description: "Deep learning framework." },
  { name: "Docker", start: "2022-05", description: "Containerization." },
  { name: "Kubernetes", start: "2022-05", description: "Container orchestration." },
  { name: "Mentoring", start: "2022-05", description: "Mentoring team members." },
  { name: "Linux", start: "2022-05", description: "Linux system administration." },
  { name: "LLM", start: "2024-01", description: "Large Language Models." },
  { name: "Generative AI", start: "2024-01", description: "Generative AI models." },
  { name: "Jenkins", start: "2024-01", description: "CI/CD pipeline automation." },
  { name: "Backend development", start: "2025-06", description: "Backend development and API design." },
  { name: "Rest API", start: "2025-06", description: "RESTful API design." },
  { name: "Databricks", start: "2025-06", description: "Data engineering and analytics." }
];

// Use API technologies if available, otherwise fallback
const displayTechnologies = computed(() => 
  props.technologies.length > 0 ? props.technologies : fallbackTechnologies
);

// Calculate technology positions using the composable
const technologyPositions = computed(() => {
  return timeline.calculateTechnologyPositions(displayTechnologies.value);
});

// Get selected technologies for details panel
const getSelectedTechnologies = () => {
  if (selectedTechnology.value === null) return [];
  const group = technologyPositions.value.find(g => g.date === selectedTechnology.value);
  return group ? group.technologies : [];
};

// Format language string: "Polish (Native)" -> "Polish - Native"
const formatLanguage = (langString) => {
  const match = langString.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) {
    return `${match[1]} - ${match[2]}`;
  }
  return langString;
};
</script>
