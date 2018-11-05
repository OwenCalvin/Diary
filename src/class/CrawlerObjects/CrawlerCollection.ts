import { CrawlerObject } from '.'

export class CrawlerCollection {
  private _objectsToScan: CrawlerObject[]

  constructor (objectsToScan) {
    this._objectsToScan = objectsToScan
  }

  async executeAll (...params: any[]) {
    await Promise.all(this._objectsToScan.map(async (ots) => ots.execute(...params)))
  }
}
