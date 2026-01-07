<template>
  <div class="app-shell">
    <header class="top-nav">
      <div class="nav-card">
        <div class="brand">
          <span class="brand-mark">AG</span>
          <div class="brand-text">
            <h1 class="h6 mb-1">Artur Gorczyński</h1>
            <p class="text-secondary small mb-0">AI/LLM & ML Leader</p>
          </div>
        </div>
        <nav class="nav nav-pills gap-2">
          <RouterLink class="nav-link" to="/">Welcome</RouterLink>
          <RouterLink class="nav-link" to="/cv">CV</RouterLink>
          <RouterLink class="nav-link" to="/projects">Projects</RouterLink>
          <RouterLink class="nav-link" to="/evangelist">TechDemocracy</RouterLink>
          <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
        </nav>
        <a class="btn button-accent" :href="cvDownloadUrl" target="_blank" rel="noopener">
          Download CV
        </a>
      </div>
    </header>

    <main class="content">
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          :profile="profile"
          :cv="cv"
          :projects="projects"
          :evangelist-panels="evangelistPanels"
          :cv-download-url="cvDownloadUrl"
        />
      </RouterView>
      <footer class="section">
        <div class="container text-center">
          <p class="footer-note">© 2024 Artur Gorczyński · Crafted for AI-forward storytelling.</p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { RouterLink, RouterView } from "vue-router";

const profile = reactive({
  name: "",
  role: "",
  tagline: "",
  location: "",
  email: "",
  phone: "",
  links: [],
  highlights: []
});

const cv = reactive({ sections: {} });
const projects = reactive([]);

const fallbackCv = {
  summary: "I use machine learning to address complex challenges and drive transformative change across industries.",
  personal: {
    name: "Artur Gorczyński",
    location: "Cracow, Poland",
    nationality: "Polish",
    email: "arturgorczynski@gmail.com",
    phone: "+48 510 674 741",
    languages: ["Polish (Native)", "English (Fluent)"]
  },
  skills: [
    "Generative AI",
    "LLM",
    "Deep learning",
    "Machine Learning",
    "Python",
    "PyTorch",
    "SQL / MySQL",
    "AWS / SageMaker",
    "Hugging Face",
    "Data visualization",
    "Project management",
    "Team management",
    "Mentoring",
    "Jira",
    "Agile",
    "Knowledge sharing",
    "Forecasting",
    "Effective communication"
  ],
  experience: [
    {
      start: "2025-06",
      end: 2026,
      company: "Self Employed",
      role: "AI Engineer",
      details: [
        "Developing AI solutions and consulting services.",
        "Working on cutting-edge AI projects and applications."
      ]
    },
    {
      start: "2024-01",
      end: 2026,
      company: "Zooplus",
      role: "Technical Leader — Machine Learning Engineer",
      details: [
        "Contribute to the identification and planning of the company's long-term AI roadmap.",
        "Research and integrate emerging AI technologies into projects to maintain a competitive edge.",
        "Manage resources to ensure the team is well-equipped to meet deadlines and objectives.",
        "Recruit and onboard new team members, fostering a collaborative and innovative culture.",
        "Collaborate with stakeholders to translate business needs into technical requirements.",
        "Lead and mentor a cross-functional team in developing and deploying ML and generative AI solutions.",
        "Architect and oversee the implementation of advanced generative AI models to solve complex business problems."
      ]
    },
    {
      start: "2022-05",
      end: 2024,
      company: "Zooplus",
      role: "[R&D] Data Scientist",
      details: [
        "Provided data analysis that led to key insights and actionable recommendations for project success.",
        "Developed and validated hypotheses, improving data-driven decision-making.",
        "Enhanced existing ML models and created new ones, boosting predictive analytics accuracy.",
        "Investigated and resolved complex data issues, improving system reliability.",
        "Shared ML and data science best practices, contributing to team growth."
      ]
    },
    {
      start: "2022-03",
      end: 2024,
      company: "CodersLab",
      role: "Tutor / Mentor",
      details: [
        "Conducted classes in data analysis, Python, and SQL.",
        "Improved educational materials for enhanced learning.",
        "Assisted new students in preparing for classes.",
        "Collaborated with lecturers and mentors to optimize knowledge delivery.",
        "Contributed to the preparation of ML career path course materials.",
        "Mentored new tutors to ensure effective teaching."
      ]
    },
    {
      start: "2021-10",
      end: 2022,
      company: "Avenga",
      role: "Machine Learning Data Scientist",
      details: [
        "Led a team of 3 specialists to deliver an NLP-focused project.",
        "Designed and implemented innovative NLP solutions.",
        "Facilitated stakeholder communication and presented results.",
        "Enforced data management best practices.",
        "Conducted EDA to guide project decisions."
      ]
    },
    {
      start: "2021-01",
      end: 2021,
      company: "Pegasystems",
      role: "Cloud Business Analyst",
      details: [
        "Created data pipelines in cloud environments for efficient data processing.",
        "Analyzed cloud usage data to identify optimization opportunities.",
        "Shared knowledge with junior team members.",
        "Assisted other teams with implementing cloud best practices.",
        "Developed and assessed the usability of time series models."
      ]
    },
    {
      start: "2019-04",
      end: 2020,
      company: "Bidroom",
      role: "Data Analyst",
      details: [
        "Created and maintained ETL pipelines for efficient data flow.",
        "Developed new solutions and tools to address data challenges.",
        "Supported teams with data-driven management practices.",
        "Generated actionable insights through data analysis.",
        "Managed projects related to data and documentation."
      ]
    },
    {
      start: "2018-01",
      end: 2019,
      company: "Brainly",
      role: "Content Performance Analyst",
      details: [
        "Created automated and unified content processes for new markets.",
        "Developed ML algorithms for high-end analysis.",
        "Formulated hypotheses and conducted experiments on content growth.",
        "Analyzed educational trends and popularity metrics.",
        "Managed budget and prepared forecasts."
      ]
    },
    {
      start: "2016-07",
      end: 2018,
      company: "IBM (Services to Google)",
      role: "Payroll Administrator — Tax Equalization / M&A",
      details: ["Supported payroll, tax equalization, and M&A initiatives."]
    },
    {
      start: "2016-01",
      end: 2016,
      company: "Brown Brothers Harriman",
      role: "Investor Services Specialist",
      details: ["Provided investor services support and reporting."]
    },
    {
      start: "2014-03",
      end: 2015,
      company: "AON",
      role: "Flexible Benefit Administrator",
      details: ["Administered benefits operations and client support."]
    }
  ],
  education: [
    {
      school: "Jagiellonian University",
      degree: "Criminal Rehabilitation — Master’s degree",
      period: "Sep 2010 – Jul 2015"
    },
    {
      school: "Pedagogical University",
      degree: "Philosophy — Bachelor’s Degree",
      period: "Sep 2008 – Jul 2011"
    },
    {
      school: "MoreSteam",
      degree: "Six Sigma — Yellow Belt",
      period: "Jun 2016 – Present"
    },
    {
      school: "AWS",
      degree: "AWS Certified Solutions Architect – Associate",
      period: "Mar 2021 – Mar 2024"
    }
  ],
  hobby: ["Add your hobbies here"]
};
const fallbackProjects = [
  {
    name: "Product Image → Product Characteristics",
    summary: "Mapped visual product data into structured attributes for richer catalog intelligence.",
    stack: ["Computer Vision", "ML", "Data Pipelines"],
    impact: "Enabled scalable catalog enrichment for e-commerce decisioning.",
    icon: "project-vision.svg",
    business_description:
      "Automated enrichment of large product catalogs to improve discovery, merchandising, and analytics for decision makers.",
    technical_description:
      "Computer vision and ML pipelines for attribute extraction, image classification, and data validation across millions of SKUs.",
    scope: "Technical leadership across model development, pipeline design, and stakeholder alignment."
  },
  {
    name: "Internal Knowledge Chatbot",
    summary: "Built a secure chatbot to surface institutional knowledge and streamline internal support.",
    stack: ["LLMs", "NLP", "Retrieval"],
    impact: "Improved knowledge access and reduced time-to-answer across teams.",
    icon: "project-chat.svg",
    business_description:
      "Unified knowledge access for internal teams, reducing support load and improving response consistency.",
    technical_description:
      "Retrieval-augmented generation with security filters, source grounding, and conversational UX.",
    scope: "Co-authored solution design and guided implementation with stakeholders and engineering partners."
  },
  {
    name: "Company Text2SQL Bot",
    summary: "Delivered natural-language access to analytics data through text-to-SQL workflows.",
    stack: ["LLMs", "SQL", "Analytics"],
    impact: "Expanded data access for non-technical stakeholders.",
    icon: "project-sql.svg",
    business_description:
      "Enabled decision makers to query analytics data without SQL expertise, accelerating insight generation.",
    technical_description:
      "Schema-aware Text2SQL with validation, guardrails, and structured output evaluation.",
    scope: "Product owner and technical lead for model selection, evaluation, and rollout."
  },
  {
    name: "Fraudential Purchase Detection",
    summary: "Developed purchase fraud detection tooling with actionable alerts.",
    stack: ["ML", "Anomaly Detection"],
    impact: "Supported fraud prevention and risk mitigation.",
    icon: "project-shield.svg",
    business_description:
      "Reduced fraud exposure by flagging suspicious transactions and supporting trust & safety teams.",
    technical_description: "Anomaly detection pipelines with feature engineering, thresholding, and monitoring.",
    scope: "Project ownership covering model experimentation, dashboards, and stakeholder reporting."
  },
  {
    name: "Hotel Database Duplicates Finder",
    summary: "Built deduplication pipelines for hospitality content databases.",
    stack: ["Entity Resolution", "Data Quality"],
    impact: "Improved content integrity and search relevance.",
    icon: "project-dedup.svg",
    business_description:
      "Improved customer experience by eliminating duplicate hotel entries and consolidating metadata.",
    technical_description:
      "Entity resolution pipeline combining fuzzy matching, rule-based scoring, and manual review workflows.",
    scope: "Co-authored matching strategy and delivered data quality improvements."
  }
];

const evangelistPanels = [
  {
    title: "Current Topics",
    body: "LLM safety, prompt engineering, AI product strategy, data governance."
  },
  {
    title: "Next Steps",
    body: "Reach out via email to align on format, audience, and outcomes."
  }
];

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const cvDownloadUrl = `${apiBase}/api/cv/download`;

const fetchJson = async (url, fallback) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return fallback;
    }
    return await response.json();
  } catch (error) {
    return fallback;
  }
};

const loadData = async () => {
  const [profileData, cvData, projectsData] = await Promise.all([
    fetchJson(`${apiBase}/api/profile`, {}),
    fetchJson(`${apiBase}/api/cv`, fallbackCv),
    fetchJson(`${apiBase}/api/projects`, fallbackProjects)
  ]);

  Object.assign(profile, profileData);
  Object.assign(cv, cvData);
  projects.splice(0, projects.length, ...projectsData);
};

onMounted(() => {
  loadData();
});
</script>
