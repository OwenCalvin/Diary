import { Server } from 'socket.io'
import Diary from '../../class/Diary'
import Post from '../../class/PostObjects/Post'
import Crawler from '../../class/Crawler'
import CrawlerObject from '../../class/CrawlerObjects/CrawlerObject'
import InstagramStorieCrawler from '../../class/CrawlerObjects/Instagram/InstagramStorieCrawler'
import { Page } from 'puppeteer'
import InstagramFeed from '../../types/InstagramFeedType'
import InstagramPostCrawler from '../../class/CrawlerObjects/Instagram/InstagramPostCrawler';
import InstagramPost from '../../class/PostObjects/Instagram/InstagramStoriePost'

const username = 'justinbieber'

export default class DiaryController {
  IOServer: Server
  Diary: Diary
  Crawler = new Crawler([
    new InstagramStorieCrawler(username, this.instagramStorie),
    new InstagramPostCrawler(username, this.instagram.bind(this))
  ])

  constructor (ioServer: Server) {
    this.IOServer = ioServer
    this.Diary = new Diary(ioServer)
    this.Crawler.scanAll()
  }

  addToDiary(posts: Post[]) {
    this.Diary.add(posts)
    this.IOServer.emit('new:post', posts)
  }

  //#region NO-WEBHOOKS
  facebook () {
    // this.Diary.addPost(...)
  }

  instagram (posts: InstagramPost[]) {
    this.addToDiary(posts)
    // console.log(this.Diary.Posts)
    // this.Diary.addPost(...)
  }

  instagramStorie (test: any) {
    // console.log(test)
    // this.Diary.addPost(...)
  }

  spotify () {
    // this.Diary.addPost(...)
  }
  //#endregion

  //#region WEBHOOKS
  twitter (req, res) {
    // this.Diary.addPost(...)
  }

  youtube (req, res) {
    // this.Diary.addPost(...)
  }

  soundcloud (req, res) {
    // this.Diary.addPost(...)
  }
  //#endregion
}
