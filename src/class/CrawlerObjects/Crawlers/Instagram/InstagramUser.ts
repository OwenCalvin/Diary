import { writeLog } from '../../../../utils/log'
import { ILogs } from '../../../../interface'
import { CrawlerObject } from '../..'
import { getInstagramUserInfosURL, getSessionIdCookie } from '../../../constants'
import axios from 'axios'

export class InstagramUser extends CrawlerObject {
  protected _onFinishCallback: (...params: any[]) => any

  constructor(onFinishCallback) {
    super('instagramUser')
    this._onFinishCallback = onFinishCallback
  }

  public async execute(targetUsername: string, sessionId: string) {
    try {
      const userInfos = (await axios.get(getInstagramUserInfosURL(targetUsername), {
        headers: {
          Cookie: sessionId
        }
      })).data
      this._onFinishCallback(userInfos)
      return userInfos.graphql.user.id
    } catch (err) {
      console.log(err)
    } 
  }
}
