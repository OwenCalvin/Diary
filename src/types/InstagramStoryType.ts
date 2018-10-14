export default interface InstagramStoryType {
  data: Data
  status: string
}

interface Data {
  reels_media: ReelsMediaItem[]
}

export interface ReelsMediaItem {
  __typename: string
  id: string
  latest_reel_media: number
  owner: Owner
  expiring_at: number
  seen: number
  user: User
  items: ItemsItem[]
}

interface Owner {
  __typename?: string
  id: string
  profile_pic_url: string
  username: string
}

interface User {
  id: string
  profile_pic_url: string
  username: string
  followed_by_viewer: boolean
  requested_by_viewer: boolean
}

export interface ItemsItem {
  __typename: string
  id: string
  dimensions: Dimensions
  display_resources: DisplayResourcesItem[]
  display_url: string
  media_preview: string
  taken_at_timestamp: number
  expiring_at_timestamp: number
  story_cta_url: null
  story_view_count: null
  is_video: boolean
  owner: Owner
  should_log_client_event: boolean
  tracking_token: string
  tappable_objects: any[]
  story_app_attribution: null
  overlay_image_resources?: null
  video_duration?: number
  video_resources?: VideoResourcesItem[]
}

interface Dimensions {
  height: number
  width: number
}

interface DisplayResourcesItem {
  src: string
  config_width: number
  config_height: number
}

interface VideoResourcesItem {
  src: string
  config_width: number
  config_height: number
  mime_type: string
  profile: string
}
