import * as puppeteer from 'puppeteer'

export default class Crawler {
  private ObjectsToScan: {
    name: string,
    url: string,
    query: string,
    properties: string[],
    actionForEach: string
  }[]
  private Browser: puppeteer.Browser

  constructor (objectsToScan) {
    this.ObjectsToScan = objectsToScan
  }

  async launchBrowser () {
    if (!this.Browser) {
      this.Browser = await puppeteer.launch({
        headless: false,
        userDataDir: '/Users/owen/Library/Application Support/Chromium/Default'
      })
    } 
  }

  async scanAll () {
    const scanResult = {}
    await Promise.all(this.ObjectsToScan.map(async ots => {
      const page = await this.Browser.newPage()
      await page.goto(ots.url)
      await page.waitFor(ots.query)
      scanResult[ots.name] = {}
      while(page.url() === ots.url) {
        const imgElement = await page.$(ots.query)
        await Promise.all(ots.properties.map(async p => {
          if (!scanResult[ots.name][p[0]]) {
            scanResult[ots.name][p[0]] = []
          }
          scanResult[ots.name][p[0]].push(await (await imgElement.getProperty(p[1])).jsonValue())
        }))
        await page[ots.actionForEach[0]](ots.actionForEach[1])
      }
    }))
    console.log(await scanResult)
  }
}
