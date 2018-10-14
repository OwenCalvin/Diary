import { Page, Response, Browser, Request } from 'puppeteer'
import Post from '../PostObjects/Post'

export default abstract class CrawlerObject {
  readonly Name: string
  public abstract OnFinishCallback: (...params: any) => any

  constructor (name) {
    this.Name = name
  }

  abstract execute()
}
