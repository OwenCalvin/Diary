import Post from '../Post'
import InstagramFile from './InstagramFile'

export default class InstagramPost extends Post {
  Files: InstagramFile[] = []

  constructor (files) {
    super(
      'instagram',
      'story',
      new Date(),
      'Hello',
      'https://instagram.com/stories/_USERNAME_',
      '')
    this.Files = files
  }
}
