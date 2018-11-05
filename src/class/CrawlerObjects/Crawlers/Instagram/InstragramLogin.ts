import { getSessionIdCookie } from '../../../constants/InstagramConstants'
import axios from 'axios'
import * as qs from 'qs'
import { writeLog } from '../../../../utils'
import { CrawlerObject } from '../..'

export class InstagramLogin extends CrawlerObject {
  protected _onFinishCallback: (...params: any[]) => any
  private _username: string
  private _password: string
  private _sessionId: string
  private _csrfToken: string

  private get SessionIdCookie(): string {
    return 'sessionid=' + this._sessionId
  }

  constructor(username: string, password: string, onFinishCallback?) {
    super('instagramLogin')
    this._username = username
    this._password = password
    this._onFinishCallback = onFinishCallback
  }

  async execute(): Promise<string[]> {
    try {
      // Get the instagram page to get the CSRF token into the set-cookie header
      const insta = await axios.get('https://www.instagram.com/')
      this._csrfToken = insta.headers['set-cookie'][0].split(';')[0].split('=')[1]
      // Login to instagram to get the sessionid cookie
      const loginResponse = await axios.post('https://www.instagram.com/accounts/login/ajax/', qs.stringify({
        password: this._password,
        username:	this._username,
        queryParams: {source: 'auth_switcher'}
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': this._csrfToken
        },
      })
      if (loginResponse.data.authenticated) {
        // Get the sessionid cookie to make requests
        this._sessionId = loginResponse.headers['set-cookie'].find(h => h.includes('sessionid')).split(';')[0].split('=')[1]
        return [getSessionIdCookie(this._sessionId), this._csrfToken, loginResponse.data.userId]
      } else {
        this.writeLog('Login or password are incorrect')
      }
    } catch (err) {
      console.log(err)
      this.writeLog(err)
    }
    return []
  }

  private writeLog(data) {
    writeLog('InstagramLoginError', data)
  }
}
