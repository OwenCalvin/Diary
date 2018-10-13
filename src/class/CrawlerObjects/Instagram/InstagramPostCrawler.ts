import CrawlerObject from '../CrawlerObject'
import InstagramFeed from '../../../types/InstagramFeedType'
import { Response, Page, Browser } from 'puppeteer'
import InstagramPost from '../../PostObjects/Instagram/InstagramPost'
import InstagramFile from '../../PostObjects/Instagram/InstagramFile'
import Post from '../../PostObjects/Post'

export default class InstagramPostCrawler extends CrawlerObject {
  private LastInstagramPost: InstagramPost = null
  private IsProcessing: boolean = false
  private EndReached: boolean = false
  private Finished: boolean = false
  private InstagramPosts: InstagramPost[] = []
  public OnResponseCallback: (posts: Post[]) => any
  private IsProcessingUsersPostsCount: boolean = true
  private UserPostsCount: number = -1
  private Username: string

  constructor (username, onResponseCallback) {
    super(
      'instagramPost',
      'https://www.instagram.com/',
      async (page: Page) => {
        await page.waitFor('.Id0Rh')
        const timer = setInterval(async () => {
          if (!this.IsProcessing && !this.Finished) {
            // Get all posts by scrolling into the page
            const endOfFile = await page.evaluate(() => {
              window.scrollBy(0, 100000)
              console.log(!document.querySelector('.Id0Rh'))
              return !document.querySelector('.Id0Rh')
            })
            if (endOfFile && !this.Finished) {
              this.Finished = true
              clearInterval(timer)
            }
          }
          /*
          if (this.Finished) {
            clearInterval(timer)
          }
          */
        }, 0)
      }
    )
    this.Username = username
    this.OnResponseCallback = onResponseCallback
  }

  async onResponse(res: Response) {
    const url = res.url()
    if (url.includes('https://www.instagram.com/graphql/query') && !url.includes('only_stories')) {  
      this.IsProcessing = true
      try {
        const json: InstagramFeed = await res.json()
        const edges = json.data.user.edge_web_feed_timeline.edges
        if (edges && !this.EndReached) {
          // Save all new Instagram Posts => Last instagram post (saved into memory)
          // Todo: only => Last instagram post
          this.InstagramPosts = [
            ...this.InstagramPosts,
            ...edges.map(e => {
              // Get only instagram posts that contains images / videos
              if (e.node.__typename !== 'GraphSuggestedUserFeedUnit' && e.node.owner.username === this.Username) {
                return new InstagramPost(e)
              }
            }).filter(ip => ip !== undefined)
          ]

          const foundLastInstagramPost = this.LastInstagramPost ? this.InstagramPosts.findIndex(ip => ip.SocialID === this.LastInstagramPost.SocialID) : null

          if (foundLastInstagramPost) {
            // ...
            // this.Finished = true
          }

          // TODO: find a way to detect the end of the feed
          if ('...') {
            // Save the last Instagram post
            // this.LastInstagramPost = this.InstagramPosts[this.InstagramPosts.length - 1]
            // this.OnResponseCallback(this.InstagramPosts)
          }
        }
        this.IsProcessing = false
      } catch (err) {
        console.log(url, 'Does not contains posts')
      }
    }
  }
}
