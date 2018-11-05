import { Post } from './PostObjects'
import { Server } from 'socket.io'

export default class Diary {
  private _posts: Post[] = []
  private _IoServer: Server

  public get Posts (): Post[] {
    return this._posts
  }

  constructor (ioServer: Server) {
    this._IoServer = ioServer
  }

  add (post: Post)
  add (posts: Post[])
  add (post: Post | Post[]) {
    if (Array.isArray(post)) {
      this._posts = [
        ...this._posts,
        ...post
      ]
    } else {
      this.Posts.push(post)
    }
    this._IoServer.emit('post:new', post)
  }
}
