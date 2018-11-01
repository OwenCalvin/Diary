import { CrawlerObject } from '.'

export class CrawlerCollection {
  private _objectsToScan: CrawlerObject[]

  constructor (objectsToScan) {
    this._objectsToScan = objectsToScan
  }

  async executeAll () {
    let lastResults: any[] = []
    for (let ots of this._objectsToScan) {
      const res = await ots.execute(...lastResults)
      if (Array.isArray(res)) {
        lastResults = res
      }
    }
  }
}
