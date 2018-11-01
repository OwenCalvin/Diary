import Post from '../Post'
import InstagramFile from './InstagramFile'
import { ReelsMediaItem } from '../../../types/InstagramStoryType'
import InstagramStoryFile from './InstagramStoryFile';

export default class InstagramStory extends Post {
  Files: InstagramFile[] = []

  constructor (media: ReelsMediaItem) {
    super(
      'instagram',
      'story',
      new Date(),
      '',
      `https://instagram.com/stories/${media.owner.username}`,
      ''
    )
    this.Files = media.items.map(mi => {
      return new InstagramStoryFile(mi)
    })
  }
}
