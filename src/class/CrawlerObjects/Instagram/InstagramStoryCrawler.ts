import Post from '../../PostObjects/Post'
import CrawlerObject from '../CrawlerObject'
import { Page, Response, Request } from 'puppeteer'
import InstagramStoryType from '../../../types/InstagramStoryType'
import InstagramStory from '../../PostObjects/Instagram/InstagramStory'

export default class InstagramStoryCrawler extends CrawlerObject {
  public OnFinishCallback: (params: InstagramStory) => void
  
  constructor (username, onFinishCallback) {
    super('instagramStory', `https://www.instagram.com/stories/${username}`)
    this.OnFinishCallback = onFinishCallback
  }

  async onResponse(res: Response) {
    const url = res.url()
    if (url.includes('https://www.instagram.com/graphql/query/') && url.includes('reel_ids')) {
      try {
        const json: InstagramStoryType = await res.json()
        this.OnFinishCallback(new InstagramStory(json.data.reels_media[0]))
        // this.Page.close()
      } catch (err) {
        console.log('Tried to process a non-story response')
      }
    }
  }
}
