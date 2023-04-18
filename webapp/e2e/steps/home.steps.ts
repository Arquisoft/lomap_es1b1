import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/home.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user views the map page of the app', ({given,when,then}) => {

    given('An user in the home page', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Bienvenido')
    });

    when('The user clicks on the map link in the navbar', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Mapa')
      await expect(page).toClick('a', { text: 'Mapa' })
    });

    then('The map page should be shown', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('Filtros')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});