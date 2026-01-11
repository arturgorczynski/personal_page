import { createRouter, createWebHistory } from "vue-router";

// Eager load Welcome page for fast initial render
import WelcomeView from "./pages/WelcomeView.vue";

// Lazy load other pages for better performance
const CvView = () => import("./pages/CvView.vue");
const ProjectsView = () => import("./pages/ProjectsView.vue");
const EvangelistView = () => import("./pages/EvangelistView.vue");
const ContactView = () => import("./pages/ContactView.vue");

const routes = [
  { path: "/", name: "welcome", component: WelcomeView },
  { path: "/cv", name: "cv", component: CvView },
  { path: "/projects", name: "projects", component: ProjectsView },
  { path: "/evangelist", name: "evangelist", component: EvangelistView },
  { path: "/contact", name: "contact", component: ContactView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
