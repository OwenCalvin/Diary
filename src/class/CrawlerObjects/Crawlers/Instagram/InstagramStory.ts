import { CrawlerObject } from '../..'

export class InstagramStory extends CrawlerObject {
  protected _onFinishCallback: (...params: any[]) => void
  
  constructor (onFinishCallback) {
    super('instagramStory')
    this._onFinishCallback = onFinishCallback
  }

  async execute(sessionId: string, CsrfToken: string) {
    console.log(sessionId, CsrfToken)
  }

  /*
  public async onResponse(res: Response) {
    const url = res.url()
    if (url.includes('https://www.instagram.com/graphql/query/') && url.includes('reel_ids')) {
      try {
        const json: InstagramStoryType = await res.json()
        // this._onFinishCallback(new InstagramStory(json.data.reels_media[0]))
        // this.Page.close()
      } catch (err) {
        console.log('Tried to process a non-story response')
      }
    }
  }
  */
}
