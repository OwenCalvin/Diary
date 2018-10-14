import * as puppeteer from 'puppeteer'
import CrawlerObject from './CrawlerObjects/CrawlerObject'

export default class Crawler {
  private ObjectsToScan: CrawlerObject[]
  private Browser: puppeteer.Browser

  constructor (objectsToScan) {
    this.ObjectsToScan = objectsToScan
  }

  async launchBrowser () {
    if (!this.Browser) {
      this.Browser = await puppeteer.launch({
        headless: false,
        userDataDir: 'C:\\Users\\oweng\\AppData\\Local\\Chromium\\User Data',
        devtools: true
      })
    } 
  }

  async scanAll () {
    // await this.launchBrowser()
    await Promise.all(this.ObjectsToScan.map(async ots => {
      ots.execute()
      /*
      const beforeRes = ots.beforePageNavigation ? await ots.beforePageNavigation(this.Browser) : null
      const page = await this.Browser.newPage()
      ots.Page = page
      page.on('close', async () => {
        if ((await this.Browser.pages()).length <= 1) {
          try {
            await this.Browser.close()
          } catch (err) {

          }
        }
      })
      if (ots.onRequest) {
        page.on('request', (req) => ots.onRequest(req))
      }
      page.on('response', (res) => ots.onResponse(res, beforeRes))
      await page.goto(ots.URL, {waitUntil: 'networkidle2'})
      if (ots.WaitFor) {
        await page.waitFor(ots.WaitFor)
      }
      if (ots.executeOnPage) {
        await ots.executeOnPage(page)
      }
      */
    }))
  }
}
