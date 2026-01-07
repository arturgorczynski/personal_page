import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "./pages/WelcomeView.vue";
import CvView from "./pages/CvView.vue";
import ProjectsView from "./pages/ProjectsView.vue";
import EvangelistView from "./pages/EvangelistView.vue";
import ContactView from "./pages/ContactView.vue";

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
