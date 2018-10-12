import { Server } from 'socket.io'
import Diary from '../../ws/Diary'
import Post from '../../class/Post'

export default class DiaryController {
  IOServer: Server
  Diary: Diary

  constructor (ioServer: Server) {
    this.IOServer = ioServer
    this.Diary = new Diary(ioServer)
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
