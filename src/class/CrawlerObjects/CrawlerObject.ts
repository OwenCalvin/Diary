import { Page, Response, Browser } from 'puppeteer'
import Post from '../PostObjects/Post'

export default abstract class CrawlerObject {
  readonly Name: string
  readonly URL: string
  readonly OnResponse: (res: any) => any
  readonly WaitFor?: string
  readonly Process?: (page: Page) => any
  readonly Before?: (browser: Browser) => any
  public abstract OnResponseCallback: (posts: Post[]) => any

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

  abstract onResponse (res: Response, beforeValues: any)
}
