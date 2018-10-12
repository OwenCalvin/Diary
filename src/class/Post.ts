export default class Post {
  SocialNetworkName: string
  Text: string
  Images: string[]
  Date: Date

  constructor (socialNetworkName) {
    this.SocialNetworkName = socialNetworkName
  }
}
