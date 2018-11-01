import axios from 'axios'
import { getInstagramUserInfosURL } from '../../../constants'
import * as qs from 'qs'
import { writeLog } from '../../../../utils'
import { CrawlerObject } from '../..'

export class InstagramLogin extends CrawlerObject {
  protected _onFinishCallback: (...params: any[]) => any
  private _username: string
  private _password: string
  private _sessionId: string
  private _CsrfToken: string

  private get SessionIdCookie(): string {
    return 'sessionid=' + this._sessionId
  }

  constructor (username: string, password: string, onFinishCallback?) {
    super('instagramLogin')
    this._username = username
    this._password = password
    this._onFinishCallback = onFinishCallback
  }

  async execute() {
    try {
      // Get the instagram page to get the CSRF token into the set-cookie header
      const insta = await axios.get('https://www.instagram.com/')
      this._CsrfToken = insta.headers['set-cookie'][0].split(';')[0].split('=')[1]
      // Login to instagram to get the sessionid cookie
      const loginResponse = await axios.post('https://www.instagram.com/accounts/login/ajax/', qs.stringify({
        password: this._password,
        username:	this._username,
        queryParams: {source: 'auth_switcher'}
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': this._CsrfToken
        },
      })
      if (loginResponse.data.authenticated) {
        // Get the sessionid cookie to make requests
        this._sessionId = loginResponse.headers['set-cookie'].find(h => h.includes('sessionid')).split(';')[0].split('=')[1]
        const userInfos = await axios.get(getInstagramUserInfosURL('claidotro2'), {
          headers: {
            Cookie: this.SessionIdCookie
          }
        })
        this._onFinishCallback(userInfos.data)
        return [this._sessionId, this._CsrfToken]
      } else {
        this.writeLog('Login or password are incorrect')
      }
    } catch (err) {
      this.writeLog(err)
    }
  }

  private writeLog(data) {
    writeLog('InstagramPostsError', data)
  }
}
