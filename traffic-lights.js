const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://faculty.washington.edu/chudler/java/stopl.html')

  const waitURL = 'https://faculty.washington.edu/chudler/java/rttest_wait.gif'
  const trafficLightsGreenURL = 'https://faculty.washington.edu/chudler/java/rttest_stoplight_green.gif'
  const playingURL = 'https://faculty.washington.edu/chudler/java/rttest_go.gif'

  for (let i = 0; i < 5; i++) {
    let statusURL = await page.getAttribute('[name="jensen"]', 'src')

    while (statusURL === waitURL) {
      statusURL = await page.getAttribute('[name="jensen"]', 'src')
    }
    await page.click("[name='jensen']")

    statusURL = await page.getAttribute('[name="jensen"]', 'src')

    while (statusURL === playingURL) {
      statusURL = await page.getAttribute('[name="jensen"]', 'src')
      const trafficLightStatus = await page.getAttribute('[name="stoplight"]', 'src')

      if (trafficLightStatus === trafficLightsGreenURL) {
        await page.click("[name='jensen']")
      }
    }
    console.log(await page.$eval(`[name='test${i + 1}']`, el => el.value))
  }
  await browser.close()
})()
