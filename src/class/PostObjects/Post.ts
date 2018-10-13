export default class Post {
  SocialNetworkName: string
  Text: string
  Date: Date
  Type: 'post' | 'story'
  URL: string
  SocialID: string

  constructor (
    socialNetworkName: string,
    type: 'post' | 'story',
    date: Date | string,
    text: string,
    url: string,
    socialID: string
  ) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    this.SocialNetworkName = socialNetworkName
    this.Type = type
    this.Date = date
    this.Text = text
    this.URL = url
    this.SocialID = socialID
  }
}
