const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://faculty.washington.edu/chudler/java/dottime.html')
  await page.click("[type='button']")
  while (true) {
    await page.$$eval("input[type='radio']", checks => checks.forEach(c => { if (c.checked === true) { c.click() } }))
  }
})()
