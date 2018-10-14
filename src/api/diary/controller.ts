import { Server } from 'socket.io'
import Diary from '../../class/Diary'
import Post from '../../class/PostObjects/Post'
import Crawler from '../../class/Crawler'
import CrawlerObject from '../../class/CrawlerObjects/CrawlerObject'
import InstagramStoryCrawler from '../../class/CrawlerObjects/Instagram/InstagramStoryCrawler'
import { Page } from 'puppeteer'
import InstagramFeed from '../../types/InstagramFeedType'
import InstagramPostCrawler from '../../class/CrawlerObjects/Instagram/InstagramPostCrawler';
import InstagramPost from '../../class/PostObjects/Instagram/InstagramStory'
import InstagramStory from '../../class/PostObjects/Instagram/InstagramStory';

const username = 'claidotro2'

export default class DiaryController {
  IOServer: Server
  Diary: Diary
  Crawler = new Crawler([
    // new InstagramStoryCrawler(username, this.instagramStory),
    new InstagramPostCrawler('8703518995', this.instagram.bind(this))
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

  instagramStory (InstagramStory: InstagramStory) {
    console.log(InstagramStory.Files)
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
