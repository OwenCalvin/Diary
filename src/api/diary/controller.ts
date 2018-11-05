import { Server } from 'socket.io'
import Diary from '../../class/Diary'
import Post from '../../class/PostObjects/Post'
import { InstagramLogin, InstagramFeed, InstagramStory, CrawlerCollection, Instagram, InstagramUser } from '../../class/CrawlerObjects'

export class DiaryController {
  private _IoServer: Server
  private _diary: Diary
  private _crawlers = new CrawlerCollection([
    new Instagram(
      'claidotro2',
      new InstagramLogin('claidotro', 'Kyukurama18'),
      new InstagramUser(this.instagramUser),
      new CrawlerCollection([
        // new InstagramFeed(this.instagramPost),
        new InstagramStory(this.instagramStory)
      ])
    )
  ])

  public constructor (ioServer: Server) {
    this._IoServer = ioServer
    this._diary = new Diary(ioServer)
    this._crawlers.executeAll()
  }

  public addToDiary(posts: Post[]) {
    this._diary.add(posts)
    this._IoServer.emit('new:post', posts)
  }

  //#region NO-WEBHOOKS
  public facebook () {
  }

  public instagramUser(a) {
  }

  public instagramPost (a) {
  }

  public instagramLogin (a) {
  }

  public instagramStory (a) {
  }

  public spotify () {
  }
  //#endregion

  //#region WEBHOOKS
  public twitter (req, res) {
  }

  public youtube (req, res) {
  }

  public soundcloud (req, res) {
  }
  //#endregion
}
