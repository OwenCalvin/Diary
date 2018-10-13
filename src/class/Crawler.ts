import * as puppeteer from 'puppeteer'
import CrawlerObject from './CrawlerObjects/CrawlerObject'
import InstagramPost from './PostObjects/Instagram/InstagramStoriePost'

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
    await this.launchBrowser()
    await Promise.all(this.ObjectsToScan.map(async ots => {
      const beforeRes = ots.Before ? await ots.Before(this.Browser) : null
      const page = await this.Browser.newPage()
      page.on('response', (res) => ots.onResponse(res, beforeRes))
      await page.goto(ots.URL)
      if (ots.WaitFor) {
        await page.waitFor(ots.WaitFor)
      }
      if (ots.Process) {
        await ots.execute(page)
      }
    }))
  }
}
