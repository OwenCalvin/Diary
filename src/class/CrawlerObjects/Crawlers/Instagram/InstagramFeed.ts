import axios, { AxiosError } from 'axios'
import { UserInfosQueryHash, BaseQueryURL, getInstagramQueryURL, getInstagramUserInfosURL } from '../../../constants'
import * as qs from 'qs'
import { writeLog } from '../../../../utils'
import { CrawlerObject } from '../..'

export class InstagramFeed extends CrawlerObject {
  protected _onFinishCallback: (...params: any[]) => any
  private _lastPost

  constructor (onFinishCallback) {
    super('instagramFeed')
    this._onFinishCallback = onFinishCallback
  }

  async execute(sessionId: string, CsrfToken: string) {
    console.log(sessionId, CsrfToken)
  }

  private writeLog(data) {
    writeLog('InstagramFeed', data)
  }
}