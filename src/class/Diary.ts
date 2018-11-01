import Post from './PostObjects/Post'
import { Server } from 'socket.io'

export default class Diary {
  private _Posts: Post[] = []
  private IOServer: Server

  public get Posts (): Post[] {
    return this._Posts
  }

  constructor (ioServer: Server) {
    this.IOServer = ioServer
  }

  add (post: Post)
  add (posts: Post[])
  add (post: Post | Post[]) {
    if (Array.isArray(post)) {
      this._Posts = [
        ...this._Posts,
        ...post
      ]
    } else {
      this.Posts.push(post)
    }
    this.IOServer.emit('post:new', post)
  }
}
