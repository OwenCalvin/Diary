import axios, { AxiosError } from 'axios'
import { getInstagramQueryURL, UserPostsQueryHash, getRequestConfig } from '../../../constants'
import { writeLog } from '../../../../utils'
import { CrawlerObject } from '../..'
import InstagramFeedType from '../../../../types/InstagramFeedType'
import * as fs from 'fs'
import * as path from 'path'

const fileData = path.join(__dirname, '../../../../data/InstagramPosts.json')

export class InstagramPost extends CrawlerObject {
  protected _onFinishCallback: (...params: any[]) => any
  private _lastPost: InstagramPost
  private _byStep: number = 10

  constructor (onFinishCallback) {
    super('instagramFeed')
    this._onFinishCallback = onFinishCallback
  }

  async execute(userId: string, sessionId: string) {
    try {
      if (!this._lastPost) {
        await this.refreshLastPost()
      }
      console.log(`Last post ID is ${this._lastPost.SocialId}`)
      let finished = false
      let newPosts = []
      const getPosts = async (after = '') => {
        if (!finished) {
          const postsRespose: InstagramFeedType = (await axios.get(
            getInstagramQueryURL(UserPostsQueryHash, { id: userId, first: this._byStep, after: after }),
            getRequestConfig(sessionId)
          )).data
          const posts = postsRespose.data.user.edge_owner_to_timeline_media.edges.map((edge) => {
            const post = new InstagramPost(edge)
            if (!finished) {
              if (!this._lastPost || edge.node.id !== this._lastPost.SocialId) {
                return post
              } else if (edge.node.id === this._lastPost.SocialId) {
                this._lastPost === post
                finished = true
              }
            }
          }).filter(edge => edge)
          if (posts.length !== this._byStep) {
            finished = true
          }
          newPosts = [
            ...newPosts,
            ...posts
          ]
          const pageInfo = postsRespose.data.user.edge_owner_to_timeline_media.page_info
          console.log(`Retrieving ${this._byStep} posts after: ${after}`)
          await getPosts(pageInfo.end_cursor)
        }
      }
      await getPosts()
      console.log(`${newPosts.length} new posts`)
      if (newPosts.length > 0) {
        this._lastPost = newPosts[0]
      }
      this.writeNewPosts(newPosts)
    } catch (err) {
      console.log(err)
    }
  }

  public async refreshLastPost() {
    try {
      this._lastPost = (await this.getPosts())[0]
    } catch (err) {
    }
  }

  public async getPosts() {
    try {
      const stringPosts: string = await new Promise<string>((resolve, reject) => {
        fs.readFile(fileData, 'utf-8', (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
      return JSON.parse(stringPosts)
    } catch (err) {
      return []
    }
  }

  public async writeNewPosts(posts) {
    if (posts.length > 0) {
      const loadedPosts = await this.getPosts()
      const newPosts = [
        ...posts,
        ...loadedPosts
      ]
      fs.writeFile(fileData, JSON.stringify(newPosts), () => {
        console.log('New posts saved')
      })
    }
  }

  private writeLog(data) {
    writeLog('InstagramFeed', data)
  }
}