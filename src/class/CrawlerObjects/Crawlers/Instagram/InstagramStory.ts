import { getInstagramQueryURL, UserStoryQueryHash, getRequestConfig } from '../../../constants'
import { CrawlerObject } from '../..'
import axios from 'axios'
import InstagramStoryType from '../../../../types/InstagramStoryType'
import InstagramPost from '../../../PostObjects/Instagram/InstagramPostObject'
import { InstagramStory as InstagramStoryPost } from '../../../PostObjects'

export class InstagramStory extends CrawlerObject {
  protected _onFinishCallback: (...params: any[]) => void
  private _lastPost: InstagramPost
  
  public constructor (onFinishCallback) {
    super('instagramStory')
    this._onFinishCallback = onFinishCallback
  }

  public async execute(userId: string, sessionId: string) {
    const storys: InstagramStoryType = (await axios.get(
      getInstagramQueryURL(UserStoryQueryHash, {
        reel_ids: [userId],
        precomposed_overlay: false,
        show_story_header_follow_button: false
      }),
      getRequestConfig(sessionId)
    )).data
    const storyPosts = new InstagramStoryPost(storys.data.reels_media[0])
    console.log(storyPosts)
  }
}
