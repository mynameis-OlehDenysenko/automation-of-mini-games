const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://faculty.washington.edu/chudler/java/reacttime.html')
  for (let i = 0; i < 5; i++) {
    await page.click("[onclick='start()']")

    let status = await page.$eval("[name='text8']", el => el.value)

    while (status === 'wait...' || status === 'PUSH STOP!!!') {
      status = await page.$eval("[name='text8']", el => el.value)

      if (status === 'PUSH STOP!!!') {
        await page.click("[onclick='stop()']")
      }
    }
    console.log(await page.$eval(`[name='text${i + 1}']`, el => el.value))
  }
  console.log(await page.$eval("[name='text6']", el => el.value))
  await browser.close()
})()
