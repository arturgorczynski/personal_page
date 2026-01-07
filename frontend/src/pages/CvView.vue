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
              Technology
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
            :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
            preserveAspectRatio="none"
          >
            <defs>
              <!-- Small arrow marker as natural extension -->
              <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M 0 0 L 5 3 L 0 6 z" fill="rgba(212, 175, 55, 0.4)" stroke="none" />
              </marker>
              
              <!-- Glow filter for dots -->
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <!-- Main path with arrow as natural extension -->
            <path
              :d="pathDataWithArrow"
              fill="none"
              stroke="rgba(212, 175, 55, 0.4)"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              marker-end="url(#arrowHead)"
            />
            
            <!-- Animated pulse traveling along the path -->
            <circle r="5" fill="#f7e7b2" filter="url(#glow)" class="pulse-circle">
              <animateMotion 
                :path="pathDataWithArrow" 
                dur="4s" 
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
            <circle r="3" fill="#f7e7b2" opacity="0.5" class="pulse-circle-trail">
              <animateMotion 
                :path="pathDataWithArrow" 
                dur="4s" 
                repeatCount="indefinite"
                rotate="auto"
                begin="-0.4s"
              />
            </circle>
            
            <!-- Year tick marks and labels for bottom line -->
            <g v-for="year in bottomYears" :key="'btick-'+year">
              <line
                :x1="getYearX(year, 'bottom')"
                :y1="bottomY - 5"
                :x2="getYearX(year, 'bottom')"
                :y2="bottomY + 5"
                stroke="rgba(212, 175, 55, 0.5)"
                stroke-width="1.5"
              />
              <text
                :x="getYearX(year, 'bottom')"
                :y="bottomY + 28"
                text-anchor="middle"
                fill="rgba(203, 213, 245, 0.85)"
                font-size="13"
                font-weight="500"
              >{{ year }}</text>
            </g>
            
            <!-- Year tick marks and labels for top line -->
            <g v-for="year in topYears" :key="'ttick-'+year">
              <line
                :x1="getYearX(year, 'top')"
                :y1="topY - 5"
                :x2="getYearX(year, 'top')"
                :y2="topY + 5"
                stroke="rgba(212, 175, 55, 0.5)"
                stroke-width="1.5"
              />
              <text
                :x="getYearX(year, 'top')"
                :y="topY - 20"
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
          
          <!-- Labels positioned outside SVG - perfectly centered on dots -->
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
              left: (item.x / svgWidth * 100) + '%',
              marginLeft: '0'
            }"
            @click.stop="selectExperience(item.originalIndex)"
          >
            <span class="cv-label-company">{{ item.company }}</span>
            <span class="cv-label-role">{{ item.role }}</span>
          </div>
        </div>
        
            <!-- Details panel - only show when a position is selected -->
            <transition name="fade">
              <div v-if="selectedExperience !== null && cv.experience[selectedExperience]" class="details-panel mt-4">
                <h4 class="h6 mb-1">{{ cv.experience[selectedExperience].role }}</h4>
                <p class="text-secondary mb-1">{{ cv.experience[selectedExperience].company }}</p>
                <p class="text-secondary mb-3">
                  {{ formatDate(cv.experience[selectedExperience].start) }} – {{ cv.experience[selectedExperience].end }}
                </p>
                <ul class="text-secondary mb-0">
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
                :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
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
                  :d="techPathDataWithArrow"
                  fill="none"
                  stroke="rgba(34, 197, 94, 0.4)"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  marker-end="url(#techArrowHead)"
                />
                
                <circle r="5" fill="#86efac" filter="url(#techGlow)" class="pulse-circle">
                  <animateMotion 
                    :path="techPathDataWithArrow" 
                    dur="4s" 
                    repeatCount="indefinite"
                    rotate="auto"
                  />
                </circle>
                <circle r="3" fill="#86efac" opacity="0.5" class="pulse-circle-trail">
                  <animateMotion 
                    :path="techPathDataWithArrow" 
                    dur="4s" 
                    repeatCount="indefinite"
                    rotate="auto"
                    begin="-0.4s"
                  />
                </circle>
                
                <g v-for="year in bottomYears" :key="'tech-btick-'+year">
                  <line
                    :x1="getYearX(year, 'bottom')"
                    :y1="bottomY - 5"
                    :x2="getYearX(year, 'bottom')"
                    :y2="bottomY + 5"
                    stroke="rgba(34, 197, 94, 0.5)"
                    stroke-width="1.5"
                  />
                  <text
                    :x="getYearX(year, 'bottom')"
                    :y="bottomY + 28"
                    text-anchor="middle"
                    fill="rgba(203, 213, 245, 0.85)"
                    font-size="13"
                    font-weight="500"
                  >{{ year }}</text>
                </g>
                
                <g v-for="year in topYears" :key="'tech-ttick-'+year">
                  <line
                    :x1="getYearX(year, 'top')"
                    :y1="topY - 5"
                    :x2="getYearX(year, 'top')"
                    :y2="topY + 5"
                    stroke="rgba(34, 197, 94, 0.5)"
                    stroke-width="1.5"
                  />
                  <text
                    :x="getYearX(year, 'top')"
                    :y="topY - 20"
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
                :style="{ left: (group.x / svgWidth * 100) + '%' }"
                @click.stop="selectTechnology(group.date)"
              >
                <div class="tech-label-group">
                  <div class="tech-group-box">
                    <div v-for="tech in group.technologies" :key="tech.name" class="tech-group-item">
                      {{ tech.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Technology details panel - only show when a technology is selected -->
            <transition name="fade">
              <div v-if="selectedTechnology !== null" class="details-panel mt-4">
                <div v-for="tech in getSelectedTechnologies()" :key="tech.name" class="mb-3">
                  <h4 class="h6 mb-1">{{ tech.name }}</h4>
                  <p class="text-secondary mb-0">{{ tech.description }}</p>
                </div>
                <p class="text-secondary small mt-3 mb-0">
                  Started: {{ formatDate(selectedTechnology) }}
                </p>
              </div>
            </transition>
          </div>
          </div>
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
import { ref, computed } from "vue";


const props = defineProps({
  cv: {
    type: Object,
    required: true
  }
});

// null means no selection, number is index into cv.experience
const selectedExperience = ref(null);
const selectedTechnology = ref(null);

// Select an experience by its original index
const selectExperience = (index) => {
  selectedExperience.value = selectedExperience.value === index ? null : index;
};

const selectTechnology = (date) => {
  selectedTechnology.value = selectedTechnology.value === date ? null : date;
};

// Click on background hides the details panel
const handleBackgroundClick = (event) => {
  // Hide when clicking anywhere except timeline dots/labels or the opened details panels
  if (event.target.closest('.cv-path-dot, .cv-timeline-label, .tech-path-dot, .tech-timeline-label, .details-panel')) {
    return;
  }
  selectedExperience.value = null;
  selectedTechnology.value = null;
};

// Timeline configuration - reduced margins
const svgWidth = 1000;
const svgHeight = 400;
const padding = 30; // Reduced from 60
const bottomY = 300;
const topY = 100;
const curveRadius = 100;

// Year ranges - starting from 2014
const bottomYears = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
const topYears = [2021, 2022, 2023, 2024, 2025, 2026];

// Parse date string (format: "YYYY-MM" or number for year)
const parseDate = (date) => {
  if (typeof date === "number") {
    return { year: date, month: 1 };
  }
  const [year, month] = date.split("-").map(Number);
  return { year, month: month || 1 };
};

// Convert date to decimal year
const dateToDecimal = (date) => {
  const { year, month } = parseDate(date);
  return year + (month - 1) / 12;
};

// Get X position for year tick marks
const getYearX = (year, row) => {
  const startX = padding;
  const endX = svgWidth - padding - curveRadius;
  const lineWidth = endX - startX;
  
  if (row === 'bottom') {
    // 2014-2020
    const progress = (year - 2014) / (2020 - 2014);
    return startX + progress * lineWidth;
  } else {
    // Top row: 2021 is on right (near curve), 2026 on left
    const progress = (year - 2021) / (2026 - 2021);
    return endX - progress * lineWidth;
  }
};

// SVG Path: bottom line (2014-2020) -> smooth curve -> top line (2021-2026)
const pathData = computed(() => {
  const startX = padding;
  const endX = svgWidth - padding - curveRadius;
  const curveEndX = endX + curveRadius;
  
  // Start at bottom left
  let d = `M ${startX},${bottomY}`;
  
  // Bottom line to right (2014-2020)
  d += ` L ${endX},${bottomY}`;
  
  // Smooth curve with belly pointing RIGHT (outward)
  d += ` C ${curveEndX},${bottomY} ${curveEndX},${topY} ${endX},${topY}`;
  
  // Top line going left (2021-2026)
  d += ` L ${startX},${topY}`;
  
  return d;
});

// Path with arrow extension (natural continuation)
const pathDataWithArrow = computed(() => {
  const startX = padding;
  const arrowLength = 20; // Small extension for arrow
  
  // Get the base path
  let d = pathData.value;
  
  // Extend the line slightly beyond the start for the arrow
  d += ` L ${startX - arrowLength},${topY}`;
  
  return d;
});

// Calculate position on path for each experience with alternating label positions
const experiencePositions = computed(() => {
  if (!props.cv.experience) return [];
  
  // Map items with their original index
  const items = props.cv.experience.map((item, originalIndex) => ({
    ...item,
    originalIndex,
    decimal: dateToDecimal(item.start)
  }));
  
  // Separate by row
  const bottomItems = items.filter(item => item.decimal <= 2020).sort((a, b) => a.decimal - b.decimal);
  const topItems = items.filter(item => item.decimal > 2020).sort((a, b) => a.decimal - b.decimal);
  
  const startX = padding;
  const endX = svgWidth - padding - curveRadius;
  const lineWidth = endX - startX;
  
  const result = [];
  
  // Process bottom items with alternating labels
  bottomItems.forEach((item, idx) => {
    // 2014-2020
    const progress = (item.decimal - 2014) / (2020 - 2014);
    const x = startX + progress * lineWidth;
    result.push({
      ...item,
      x,
      y: bottomY,
      row: 'bottom',
      labelPosition: idx % 2 === 0 ? 'below' : 'above'
    });
  });
  
  // Process top items with alternating labels
  topItems.forEach((item, idx) => {
    const progress = (item.decimal - 2021) / (2026 - 2021);
    const x = endX - progress * lineWidth;
    result.push({
      ...item,
      x,
      y: topY,
      row: 'top',
      labelPosition: idx % 2 === 0 ? 'above' : 'below'
    });
  });
  
  return result;
});

const formatDate = (date) => {
  const { year, month } = parseDate(date);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return `${monthNames[month - 1]} ${year}`;
};

// Technology data with descriptions
const technologies = [
  { 
    name: "Microsoft Suite", 
    start: "2015-01",
    description: "Proficient in Excel, Word, PowerPoint, and Outlook for data analysis, documentation, and communication."
  },
  { 
    name: "Project Management", 
    start: "2016-07",
    description: "Experienced in Agile methodologies, sprint planning, stakeholder management, and cross-functional team coordination."
  },
  { 
    name: "Python", 
    start: "2018-01",
    description: "Advanced Python programming for data science, machine learning, automation, and backend development."
  },
  { 
    name: "SQL", 
    start: "2018-01",
    description: "Expert in SQL for data querying, database design, optimization, and complex analytical queries."
  },
  { 
    name: "Machine Learning", 
    start: "2019-04",
    description: "Deep expertise in ML algorithms, model development, training, evaluation, and deployment in production environments."
  },
  { 
    name: "Cloud", 
    start: "2021-01",
    description: "Cloud infrastructure design, deployment, and management across multiple platforms."
  },
  { 
    name: "AWS", 
    start: "2021-01",
    description: "AWS Certified Solutions Architect with hands-on experience in EC2, S3, SageMaker, Lambda, and cloud architecture."
  }
];

// Group technologies by date
const groupedTechnologies = computed(() => {
  const groups = {};
  technologies.forEach(tech => {
    const key = tech.start;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(tech);
  });
  return groups;
});

// Technology path (same as experience path)
const techPathData = computed(() => pathData.value);
const techPathDataWithArrow = computed(() => pathDataWithArrow.value);

// Calculate positions for technology groups
const technologyPositions = computed(() => {
  const startX = padding;
  const endX = svgWidth - padding - curveRadius;
  const lineWidth = endX - startX;
  const result = [];
  
  Object.entries(groupedTechnologies.value).forEach(([date, techs], groupIdx) => {
    const decimal = dateToDecimal(date);
    let x, y, row;
    
    if (decimal <= 2020) {
      const progress = (decimal - 2014) / (2020 - 2014);
      x = startX + progress * lineWidth;
      y = bottomY;
      row = 'bottom';
    } else {
      const progress = (decimal - 2021) / (2026 - 2021);
      x = endX - progress * lineWidth;
      y = topY;
      row = 'top';
    }
    
    result.push({
      date,
      technologies: techs,
      x,
      y,
      row,
      labelPosition: groupIdx % 2 === 0 ? (row === 'bottom' ? 'below' : 'above') : (row === 'bottom' ? 'above' : 'below')
    });
  });
  
  return result.sort((a, b) => dateToDecimal(a.date) - dateToDecimal(b.date));
});

// Get selected technologies for details panel
const getSelectedTechnologies = () => {
  if (selectedTechnology.value === null) return [];
  const group = technologyPositions.value.find(g => g.date === selectedTechnology.value);
  return group ? group.technologies : [];
};
</script>
