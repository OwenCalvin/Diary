import CrawlerObject from '../CrawlerObject'
import { Page } from 'puppeteer'

export default class FacebookPostCrawler extends CrawlerObject {
  public OnResponseCallback: (posts: import("/Users/owen/Documents/dev/diary/src/class/PostObjects/Post").default[]) => any;
  onResponse(res: import("/Users/owen/Documents/dev/diary/node_modules/@types/puppeteer/index").Response) {
    throw new Error("Method not implemented.");
  }
  constructor (cb) {
    super('facebookPost', 'https://www.instagram.com/', 'article', process)
  }
}
