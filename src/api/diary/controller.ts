import { Server } from 'socket.io'
import Diary from '../../ws/Diary'
import Post from '../../class/Post'
import Crawler from '../../class/Crawler'

export default class DiaryController {
  IOServer: Server
  Diary: Diary
  Crawler: Crawler = new Crawler([{
    name: 'instagramStories',
    url: 'https://www.instagram.com/stories/clairo/',
    query: 'img.y-yJ5._7NpAS',
    actionForEach: ['click', '.ow3u_'],
    properties: [
      ['links', 'src']
    ]
  }])

  constructor (ioServer: Server) {
    this.IOServer = ioServer
    this.Diary = new Diary(ioServer)
    // this.crawl()
  }

  async crawl () {
    await this.Crawler.launchBrowser()
    this.Crawler.scanAll()
  }

  facebook (req, res) {
    console.log('a')
    this.Diary.addPost(new Post(
      'facebook'
    ))
    res.send('hello world')
  }
  twitter (req, res) {
    console.log(req.body)
    this.Diary.addPost(new Post(
      'twitter'
    ))
    res.send('yes')
  }
  instagram (req, res) {
    this.Diary.addPost(new Post(
      'instagram'
    ))
  }
  youtube (req, res) {
    console.log(req.body)
    this.Diary.addPost(new Post(
      'youtube'
    ))
    res.send('yes')
  }
  soundcloud (req, res) {
    console.log(req.body)
    this.Diary.addPost(new Post(
      'soundcloud'
    ))
    res.send('yes')
  }
  spotify (req, res) {
    this.Diary.addPost(new Post(
      'spotify'
    ))
  }
}
