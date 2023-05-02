import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/login.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto(process.env.REACT_APP_APP_URI || "http://localhost:3000/", {
        waitUntil: "networkidle0",
      })
      .catch(() => { });
  });

  test('The user logs in', ({ given, when, then }) => {

    given('An user in the home page', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Welcome')
    });

    when('The user clicks on the login button', async () => {
      await expect(page).toClick('button', { text: 'Log in' })
    });

    then('It opens the login dialog', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Please select a provider.')
    });
  })

  afterAll(async () => {
    browser.close()
  })

});