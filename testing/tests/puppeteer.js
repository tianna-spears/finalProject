const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("Student Study Manager Puppeteer Tests", function () {
  this.timeout(60000); // extended timeout for all tests

  let browser;
  let page;

  // Utility function to retry navigation
  async function gotoWithRetry(page, url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
        return;
      } catch (err) {
        console.warn(`Attempt ${attempt} failed to load ${url}`);
        if (attempt === retries) throw err;
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }

  before(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });

    // Warm up deployed site (avoid cold start issues)
    const warmupPage = await browser.newPage();
    await gotoWithRetry(warmupPage, "https://client-finalproject-ew1x.onrender.com");
    await warmupPage.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.setDefaultTimeout(20000); // generous default timeout
  });

  afterEach(async () => {
    if (page && !page.isClosed()) {
      try {
        await page.close();
      } catch (err) {
        console.warn("Error closing page:", err.message);
      }
    }
    page = null;
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
  });

  describe("Home Page", () => {
    it("should load the home page", async () => {
      await gotoWithRetry(page, "https://client-finalproject-ew1x.onrender.com");
      const title = await page.title();
      expect(title).to.be.a("string");
    });

    it("should navigate to login from home page", async () => {
      try {
        await gotoWithRetry(page, "https://client-finalproject-ew1x.onrender.com");

        console.log("Waiting for login button...");
        await page.waitForSelector('[data-testid="goto-login"]', { visible: true });

        await Promise.all([
          page.click('[data-testid="goto-login"]'),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        await page.waitForSelector('[data-testid="login-email"]');
        const url = page.url();
        expect(url).to.include("/login");

      } catch (err) {
        console.error("Failed to navigate to login:", err);
        console.error("Page content:\n", await page.content());
        throw err;
      }
    });
  });

  describe("Login Page", () => {
    it("should fill out the login form and submit", async () => {
      try {
        await gotoWithRetry(page, "https://client-finalproject-ew1x.onrender.com");

        await page.waitForSelector('[data-testid="goto-login"]', { visible: true });

        await Promise.all([
          page.click('[data-testid="goto-login"]'),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        await page.waitForSelector('[data-testid="login-email"]');
        await page.type('[data-testid="login-email"]', "Tiara.Kirlin@hotmail.com");

        await page.type('[data-testid="login-password"]', "ZVYINqh0O6YsuSW");

        await Promise.all([
          page.click('[data-testid="login-button"]'),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        await page.waitForSelector('[data-testid="dashboard-header"]');

        const currentUrl = page.url();
        expect(currentUrl).to.include("/dashboard");
      } catch (err) {
        console.error("Login test failed:", err);
        console.error("Page HTML:\n", await page.content());
        throw err;
      }
    });
  });
});
