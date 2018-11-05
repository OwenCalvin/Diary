import { CrawlerCollection } from '../../CrawlerCollection'
import { InstagramLoginCrawler, InstagramUserCrawler, InstagramPostCrawler, InstagramStoryCrawler, CrawlerObject } from '../..'

export class Instagram extends CrawlerObject {
  protected _onFinishCallback: (...params: any[]) => any
  private _targetUsername: string
  private _login: InstagramLogin
  private _user: InstagramUser
  private _crawlerCollection: CrawlerCollection

  constructor(targetUsername, login, user, crawlerCollection) {
    super('instagram')
    this._targetUsername = targetUsername
    this._user = user
    this._login = login
    this._crawlerCollection = crawlerCollection
  }

  async execute(): Promise<void> {
    const tokens = await this._login.execute()
    const userId = await this._user.execute(this._targetUsername, tokens[0])
    await this._crawlerCollection.executeAll(userId, ...tokens)
  }
}
