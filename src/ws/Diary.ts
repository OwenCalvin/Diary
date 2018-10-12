import Post from '../class/Post'
import { Server } from 'socket.io'

export default class Diary {
  private Posts: Post[] = []
  private IOServer: Server

  constructor (ioServer: Server) {
    this.IOServer = ioServer
  }

  getAllPosts () : Post[] {
    return this.Posts
  }
  addPost (post: Post) {
    this.Posts.push(post)
    this.IOServer.emit('post:new', post)
  }
}
