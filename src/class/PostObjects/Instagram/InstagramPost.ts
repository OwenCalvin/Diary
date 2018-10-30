import Post from '../Post'
import InstagramFile from './InstagramFile'
import { EdgeWebFeedTimeline, EdgesItem } from '../../../types/InstagramFeedType'

export default class InstagramPost extends Post {
  Files: InstagramFile[] = []
  ShortCode: string

  constructor (e: EdgesItem) {
    super(
      'instagram',
      'post',
      new Date(),
      'Hello',
      `https://www.instagram.com/p/${e.node.shortcode}/?taken-by=${e.node.owner.username}`,
      e.node.id
    )
    if (e.node.edge_sidecar_to_children) {
      this.Files = e.node.edge_sidecar_to_children.edges.map(me => {
        return new InstagramFile(me.node)
      })
    } else {
      this.Files = [new InstagramFile(e.node)]
    }
    this.ShortCode = e.node.shortcode
  }

  static saveFeed (feed: EdgeWebFeedTimeline) {
    feed.edges.map(e => {

    })
  }
}
