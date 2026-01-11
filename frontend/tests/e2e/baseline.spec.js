import { test, expect } from "@playwright/test";

/**
 * Baseline E2E tests for the personal page.
 * These tests capture the current behavior to ensure refactoring doesn't break functionality.
 */

const PAGES = [
  { path: "/", name: "welcome", title: "Welcome" },
  { path: "/cv", name: "cv", title: "CV" },
  { path: "/projects", name: "projects", title: "Projects" },
  { path: "/evangelist", name: "evangelist", title: "TechDemocracy" },
  { path: "/contact", name: "contact", title: "Contact" },
];

test.describe("Baseline Screenshots", () => {
  for (const page of PAGES) {
    test(`capture ${page.name} page`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      // Wait for content to load
      await browserPage.waitForLoadState("networkidle");
      // Take screenshot
      await browserPage.screenshot({
        path: `tests/e2e/screenshots/baseline-${page.name}.png`,
        fullPage: true,
      });
    });
  }
});

test.describe("Navigation", () => {
  test("all navigation links work", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check navigation exists
    const nav = page.locator(".nav-card");
    await expect(nav).toBeVisible();

    // Check all nav links
    for (const pageInfo of PAGES) {
      const link = page.locator(`.nav-link:has-text("${pageInfo.title}")`);
      await expect(link).toBeVisible();
    }
  });

  test("can navigate to CV page", async ({ page }) => {
    await page.goto("/");
    await page.click('.nav-link:has-text("CV")');
    await expect(page).toHaveURL("/cv");
    await expect(page.locator("text=Curriculum Vitae")).toBeVisible();
  });

  test("can navigate to Projects page", async ({ page }) => {
    await page.goto("/");
    await page.click('.nav-link:has-text("Projects")');
    await expect(page).toHaveURL("/projects");
    await expect(page.locator("h2:has-text('Projects')")).toBeVisible();
  });
});

test.describe("Welcome Page", () => {
  test("displays profile information", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check name is displayed
    await expect(page.locator("text=Artur Gorczyński").first()).toBeVisible();

    // Check business card exists
    await expect(page.locator(".card-neo")).toBeVisible();

    // Check info points exist
    const infoPoints = page.locator(".info-point");
    await expect(infoPoints).toHaveCount(4);
  });

  test("info points are interactive", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Click on the first info dot (the visible dot element)
    const firstDot = page.locator(".info-dot").first();
    await firstDot.click({ force: true });

    // Check that body text appears (info-body class)
    await expect(page.locator(".info-body").first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe("CV Page", () => {
  test("displays CV sections", async ({ page }) => {
    await page.goto("/cv");
    await page.waitForLoadState("networkidle");

    // Check main sections exist
    await expect(page.locator(".section-header:has-text('Few words about me')")).toBeVisible();
    await expect(page.locator(".section-header:has-text('Personal Information')")).toBeVisible();
    await expect(page.locator(".section-header:has-text('Skills')")).toBeVisible();
  });

  test("timeline is interactive", async ({ page }) => {
    await page.goto("/cv");
    await page.waitForLoadState("networkidle");

    // Click on a timeline dot
    const timelineDot = page.locator(".cv-path-dot").first();
    await timelineDot.click();

    // Check details panel appears
    await expect(page.locator(".details-panel").last()).toBeVisible();
  });

  test("tabs switch between experience and technology", async ({ page }) => {
    await page.goto("/cv");
    await page.waitForLoadState("networkidle");

    // Click technology tab
    await page.click('button:has-text("Technology and Skills")');

    // Check technology timeline is visible
    await expect(page.locator(".tech-timeline")).toBeVisible();
  });
});

test.describe("Projects Page", () => {
  test("displays project cards", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    // Check project cards exist
    const projectCards = page.locator(".card-neo");
    await expect(projectCards.first()).toBeVisible();
  });

  test("project modal opens", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    // Click view details button
    await page.click('button:has-text("View details")');

    // Check modal is visible
    await expect(page.locator(".project-modal")).toBeVisible();
  });
});

test.describe("Contact Page", () => {
  test("displays contact information", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    // Check email is displayed
    await expect(page.locator("text=Email").first()).toBeVisible();

    // Check links section exists
    await expect(page.locator("text=Links")).toBeVisible();
  });
});

test.describe("API Integration", () => {
  test("profile API returns data", async ({ request }) => {
    const response = await request.get("http://localhost:8000/api/profile");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.name).toBe("Artur Gorczyński");
  });

  test("CV API returns data", async ({ request }) => {
    const response = await request.get("http://localhost:8000/api/cv");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.experience).toBeDefined();
    expect(data.skills).toBeDefined();
  });

  test("projects API returns data", async ({ request }) => {
    const response = await request.get("http://localhost:8000/api/projects");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });
});

