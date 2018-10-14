import CrawlerObject from '../CrawlerObject'
import InstagramFeed from '../../../types/InstagramFeedType'
import { Response, Page, Request } from 'puppeteer'
import InstagramPost from '../../PostObjects/Instagram/InstagramPost'
import Post from '../../PostObjects/Post'
import * as fs from 'fs'

const dataFile = './src/data/instagramPosts.json'

export default class InstagramPostCrawler extends CrawlerObject {
  private LastInstagramPost: InstagramPost = null
  private LastInstagramPostIndex: number = -1
  private EndReached: boolean = false
  private InstagramPosts: InstagramPost[] = []
  private Username: string
  private PendingRequest: string[] = []
  private Processing: boolean = true
  public OnFinishCallback: (posts: Post[]) => any

  constructor (username, onFinishCallback) {
    super(
      'instagramPost',
      'https://www.instagram.com/',
      async (page: Page) => {
        const loadingElement = await page.$('.Id0Rh')
        console.log('loading element', !!loadingElement)
        if (loadingElement) {
          const timer = setInterval(async () => {
            if (!this.EndReached) {
              // Get all posts by scrolling into the page
              const endOfFile = await page.evaluate(() => {
                window.scrollBy(0, 100000)
                return !document.querySelector('.Id0Rh')
              })
              if (endOfFile && !this.EndReached) {
                this.EndReached = true
                clearInterval(timer)
                this.finish()
              }
            }
          }, 0)
        } else {
          this.EndReached = true
          this.finish()
        }
      }
    )
    try {
      this.LastInstagramPost = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))[0]
    } catch (err) {
      this.LastInstagramPost = null
    }
    this.Username = username
    this.OnFinishCallback = onFinishCallback
  }

  // This function is called when the end of the page is reached and when all pending requests has been processed
  private finish() {
    console.log('Finished scroll', this.EndReached, ' ', 'Finished requests', this.PendingRequest.length >= 0)
    if (this.Processing) {
      if (this.LastInstagramPostIndex !== 0) {
        if ((this.EndReached && this.PendingRequest.length >= 0) || this.LastInstagramPostIndex > 0) {
          if (this.LastInstagramPostIndex > 0) {
            console.log('Last instgram post found at', this.LastInstagramPostIndex)
            this.InstagramPosts = this.InstagramPosts.slice(0, this.LastInstagramPostIndex)
          }
          console.log('Process finished')
          console.log('Posts lenght', this.InstagramPosts.length)
          let lastPosts = []
          try {
            lastPosts = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
          } catch (err) {}
          fs.writeFile(dataFile, JSON.stringify([...this.InstagramPosts, ...lastPosts]), (err) => {
            console.log(err, 'File writen')
          })
          this.OnFinishCallback(this.InstagramPosts)
          // Save the last Instagram post to stop the process when the last post is reached, the next time
          this.LastInstagramPost = this.InstagramPosts[this.InstagramPosts.length - 1]
          console.log('--- End with ' + this.LastInstagramPostIndex + ' new posts ---')
          this.Page.close()
        }
      } else {
        console.log('No new instagram posts')
        this.OnFinishCallback([])
        this.Page.close()
      }
    }
  }

  private isPostUrl(url: string) {
    return url.includes('https://www.instagram.com/graphql/query') && !url.includes('only_stories')
  }

  onRequest (req: Request) {
    const url = req.url()
    if (this.isPostUrl(url)) {
      this.PendingRequest.push(url)
    }
  }

  async onResponse(res: Response) {
    const url = res.url()
    if (this.PendingRequest.includes(url)) {
      try {
        this.PendingRequest.splice(this.PendingRequest.findIndex(pr => pr === url), 1)
        const json: InstagramFeed = await res.json()
        const edges = json.data.user.edge_web_feed_timeline.edges
        if (edges) {
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

          this.LastInstagramPostIndex = this.LastInstagramPost ? this.InstagramPosts.findIndex(ip => ip.SocialID === this.LastInstagramPost.SocialID) : -1
          console.log('Last intagram post index', this.LastInstagramPostIndex)
          this.finish()
        }
      } catch (err) {
        console.log('A reponse without posts tried to be processed')
      }
    }
  }
}
