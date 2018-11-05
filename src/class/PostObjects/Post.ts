type PostOrStoryType = 'post' | 'story'

export class Post {
  private _socialNetworkName: string
  private _text: string
  private _date: Date
  private _type: PostOrStoryType
  private _url: string
  private _socialId: string

  public get SocialNetworkName() {
    return this._socialNetworkName
  }

  public get Text() {
    return this._text
  }

  public get Date() {
    return this._date
  }

  public get Type() {
    return this._type
  }

  public get SocialId() {
    return this._socialId
  }

  public get Url() {
    return this._url
  }

  public constructor (
    socialNetworkName: string,
    type: PostOrStoryType,
    date: Date | string,
    text: string,
    url: string,
    socialId: string
  ) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    this._socialNetworkName = socialNetworkName
    this._type = type
    this._date = date
    this._text = text
    this._url = url
    this._socialId = socialId
  }
}
