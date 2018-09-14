import puppeteer from 'puppeteer';

export default async function register() {
  let browser = await puppeteer.launch({
    headless: false,
    // devtools: true,
    slowMo: 50
  });
  let page = await browser.newPage();
  page.emulate({
    viewport: {
      width: 1920,
      height: 1080
    },
    userAgent: ''
  });
  
  await page.goto('https://www.google.com.au/imghp?hl=en&tab=wi');
  await page.waitForSelector('#qbi');
  await page.click("#qbi");

  browser.close();
}