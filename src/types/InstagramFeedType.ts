export default interface InstagramFeed {
  data: Data
  status: string
}

interface Data {
  user: User
}

interface User {
  id: string
  profile_pic_url: string
  username: string
  edge_web_feed_timeline: EdgeWebFeedTimeline
}

export interface EdgeWebFeedTimeline {
  page_info: Page_info
  edges: EdgesItem[]
}

interface Page_info {
  has_next_page: boolean
  end_cursor: string | null
}

export interface EdgesItem {
  node: Node
}

export interface Node {
  __typename: string
  id: string
  dimensions: Dimensions
  display_url: string
  display_resources: DisplayResourcesItem[]
  follow_hashtag_info: null
  is_video: boolean
  should_log_client_event: boolean
  tracking_token: string
  edge_media_to_tagged_user: Edge_media_to_tagged_user
  accessibility_caption: null
  attribution: null
  shortcode: string
  edge_media_to_caption: Edge_media_to_caption
  edge_media_to_comment: Edge_media_to_comment
  gating_info: null
  media_preview: string
  comments_disabled: boolean
  taken_at_timestamp: number
  edge_media_preview_like: Edge_media_preview_like
  edge_media_to_sponsor_user: Edge_media_to_sponsor_user
  edge_sidecar_to_children?: Edge_sidecar_to_children
  location: null
  viewer_has_liked: boolean
  viewer_has_saved: boolean
  viewer_has_saved_to_collection: boolean
  viewer_in_photo_of_you: boolean
  viewer_can_reshare: boolean
  owner: Owner
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

interface Edge_media_to_tagged_user {
  edges: any[]
}

interface Edge_media_to_caption {
  edges: any[]
}

interface Edge_media_to_comment {
  count: number
  page_info: Page_info
  edges: any[]
}

interface Edge_media_preview_like {
  count: number
  edges: any[]
}

interface Edge_media_to_sponsor_user {
  edges: any[]
}

interface Edge_sidecar_to_children {
  edges: EdgesItem[]
}

interface Owner {
  id: string
  profile_pic_url: string
  username: string
  followed_by_viewer: boolean
  full_name: string
  is_private: boolean
  requested_by_viewer: boolean
  blocked_by_viewer: boolean
  has_blocked_viewer: boolean
}
