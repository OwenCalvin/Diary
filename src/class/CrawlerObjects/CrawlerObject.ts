import { Page, Response, Browser, Request } from 'puppeteer'
import Post from '../PostObjects/Post'

export default abstract class CrawlerObject {
  readonly Name: string
  readonly URL: string
  readonly OnResponse: (res: any) => any
  readonly WaitFor?: string
  readonly Process?: (page: Page) => any
  readonly Before?: (browser: Browser) => any
  public abstract OnFinishCallback: (...params: any) => any
  public Page: Page

  constructor (name, url, process = null, before = null, waitFor = null) {
    this.Name = name,
    this.URL = url
    this.Before = before
    this.Process = process
    this.WaitFor = waitFor
  }

  execute (page) {
    this.Process(page)
  }

  onRequest? (request: Request)

  abstract onResponse (res: Response, beforeValues: any)
}
