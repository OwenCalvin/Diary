import { Node } from '../../../types/InstagramFeedType'

export default class InstagramFile {
  URL: string
  IsVideo: boolean
  Width: number
  Height: number

  constructor (node: Node) {
    this.URL = node.display_url,
    this.IsVideo = node.is_video,
    this.Width = node.dimensions.width,
    this.Height = node.dimensions.height
  }
}


