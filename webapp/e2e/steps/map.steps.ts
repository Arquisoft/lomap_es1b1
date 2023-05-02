import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/map.feature');

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

  test('The user opens the filters', ({ given, when, then }) => {

    given('An user in the map page', async () => {
      await expect(page).toClick('a', { text: 'Map' })
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Filters')
    });

    when('The user clicks on the filters button', async () => {
      await expect(page).toClick('button', {text:'Filters'})
    });

    then('It opens the filters dialog', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Filter locations')
      await expect(text).toContain('Name')
      await expect(text).toContain('Shops')
    });
  })

  test('The user selects the public locations map', ({ given, when, then }) => {

    given('An user in the map page', async () => {
      await expect(page).toClick('a', { text: 'Map' })
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Select a map')
    });

    when('The user clicks on the combo box and selects public locations', async () => {
      await expect(page).toClick('div', {text:'Select a map'})
      const text = await page.evaluate(() => document.body.textContent);
    });

    then('The public locations are displayed', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('locations')
    });
  })

  afterAll(async () => {
    browser.close()
  })

});