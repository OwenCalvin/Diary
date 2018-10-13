import Post from '../../PostObjects/Post'
import CrawlerObject from '../CrawlerObject'
import { Page, Response } from 'puppeteer'
import InstagramStory from '../../../types/InstagramStorieType'

export default class InstagramStorieCrawler extends CrawlerObject {
  public OnResponseCallback: (posts: any[]) => any

  constructor (username, onResponseCallback) {
    super('instagramStories', `https://www.instagram.com/stories/${username}`)
    this.OnResponseCallback = onResponseCallback
  }

  async onResponse(res: Response) {
    const url = res.url()
    if (url.includes('https://www.instagram.com/graphql/query/') && url.includes('reel_ids')) {
      const json: InstagramStory = await res.json()
      this.OnResponseCallback(json.data.reels_media[0].items)
    }
  }
}
