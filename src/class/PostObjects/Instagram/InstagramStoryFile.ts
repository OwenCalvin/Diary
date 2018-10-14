import { Node } from '../../../types/InstagramFeedType'
import { ItemsItem } from '../../../types/InstagramStoryType'

export default class InstagramStoryFile {
  URL: string
  IsVideo: boolean
  Width: number
  Height: number

  constructor (item: ItemsItem) {
    this.URL = item.display_url,
    this.IsVideo = item.is_video,
    this.Width = item.dimensions.width,
    this.Height = item.dimensions.height
  }
}
