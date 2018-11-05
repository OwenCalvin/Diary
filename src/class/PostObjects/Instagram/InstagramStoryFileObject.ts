import { Node } from '../../../types/InstagramFeedType'
import { ItemsItem } from '../../../types/InstagramStoryType'

export default class InstagramStoryFile {
  URL: string
  IsVideo: boolean
  Width: number
  Height: number
  SocialID: string

  constructor (item: ItemsItem) {
    this.IsVideo = item.is_video,
    this.SocialID = item.id
    this.URL = this.IsVideo ? item.video_resources[1].src : item.display_url,
    this.Width = this.IsVideo ? item.video_resources[1].config_width : item.dimensions.width,
    this.Height = this.IsVideo ? item.video_resources[1].config_height : item.dimensions.height
  }
}
