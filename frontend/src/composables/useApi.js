/**
 * Composable for API fetching with fallback support
 */
import { reactive, onMounted } from "vue";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

if (!isValidHttpUrl(apiBase)) {
  console.warn(
    `Invalid VITE_API_BASE_URL (${apiBase}). Expected http(s) URL. Falling back to http://localhost:8000.`,
  );
}

/**
 * Fetch JSON from API with fallback
 * @param {string} url - API endpoint URL
 * @param {*} fallback - Fallback value if request fails
 * @returns {Promise<*>} - Response data or fallback
 */
export async function fetchJson(url, fallback = null) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`API request failed: ${url} - ${response.status}`);
      return fallback;
    }
    return await response.json();
  } catch (error) {
    console.warn(`API request error: ${url}`, error);
    return fallback;
  }
}

/**
 * Composable for loading all main data from API
 * @returns {Object} - Reactive data objects and loading state
 */
export function useApiData() {
  const profile = reactive({
    name: "",
    role: "",
    tagline: "",
    location: "",
    email: "",
    phone: "",
    links: [],
    highlights: [],
  });

  const cv = reactive({
    summary: "",
    personal: {
      name: "",
      location: "",
      nationality: "",
      email: "",
      phone: "",
      languages: [],
    },
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    hobby: [],
  });

  const projects = reactive([]);
  const technologies = reactive([]);
  const infoPoints = reactive([]);
  const evangelistPanels = reactive([]);

  const effectiveBase = isValidHttpUrl(apiBase) ? apiBase : "http://localhost:8000";
  const cvDownloadUrl = `${effectiveBase}/api/cv/download`;
  const photoUrl = `${effectiveBase}/api/photo`;

  const loadData = async () => {
    const [
      profileData,
      cvData,
      projectsData,
      technologiesData,
      infoPointsData,
      evangelistData,
    ] = await Promise.all([
      fetchJson(`${effectiveBase}/api/profile`, {}),
      fetchJson(`${effectiveBase}/api/cv`, {}),
      fetchJson(`${effectiveBase}/api/projects`, []),
      fetchJson(`${effectiveBase}/api/technologies`, []),
      fetchJson(`${effectiveBase}/api/info-points`, []),
      fetchJson(`${effectiveBase}/api/evangelist`, []),
    ]);

    Object.assign(profile, profileData);
    Object.assign(cv, cvData);
    projects.splice(0, projects.length, ...projectsData);
    technologies.splice(0, technologies.length, ...technologiesData);
    infoPoints.splice(0, infoPoints.length, ...infoPointsData);
    evangelistPanels.splice(0, evangelistPanels.length, ...evangelistData);
  };

  onMounted(() => {
    loadData();
  });

  return {
    profile,
    cv,
    projects,
    technologies,
    infoPoints,
    evangelistPanels,
    cvDownloadUrl,
    photoUrl,
    loadData,
  };
}

export { apiBase };


