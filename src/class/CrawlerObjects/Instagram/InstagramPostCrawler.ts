import CrawlerObject from '../CrawlerObject'
import InstagramFeed from '../../../types/InstagramFeedType'
import { Response, Page } from 'puppeteer'
import InstagramPost from '../../PostObjects/Instagram/InstagramPost'
import InstagramFile from '../../PostObjects/Instagram/InstagramFile'
import Post from '../../PostObjects/Post'

export default class InstagramPostCrawler extends CrawlerObject {
  private LastInstagramPost: InstagramPost
  private IsProcessing: boolean = false
  private EndReached: boolean = false
  private Finished: boolean = false
  private InstagramPosts: InstagramPost[] = []
  public OnResponseCallback: (posts: Post[]) => any

  constructor (onResponseCallback) {
    super('instagramPost', 'https://www.instagram.com/', (page: Page) => {
      setInterval(async () => {
        if (!this.IsProcessing && !this.EndReached) {
          // The end is reached when the loading element disappear
          const loadingElementExists = await page.evaluate(() => {
            window.scrollBy(0, 100000)
            return !!document.querySelector('.Id0Rh')
          })
          this.EndReached = !loadingElementExists
        }
      }, 0)
    })
    this.OnResponseCallback = onResponseCallback
  }

  async onResponse(res: Response) {
    const url = res.url()
    if (url.includes('https://www.instagram.com/graphql/query') && !url.includes('only_stories')) {  
      this.IsProcessing = true
      const json: InstagramFeed = await res.json()
      const edges = json.data.user.edge_web_feed_timeline.edges
      if (edges && !this.EndReached) {
        this.InstagramPosts = [
          ...this.InstagramPosts,
          ...edges.map(e => {
            if (e.node.__typename !== 'GraphSuggestedUserFeedUnit') {
              return new InstagramPost(e)
            }
          })
        ]
        this.LastInstagramPost = this.InstagramPosts[this.InstagramPosts.length - 1]
        this.OnResponseCallback(this.InstagramPosts.filter(ip => ip !== undefined))
      }
      this.IsProcessing = false
    }
  }
}
