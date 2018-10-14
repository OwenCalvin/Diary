import CrawlerObject from '../CrawlerObject'
import axios, { AxiosError } from 'axios'
import { UserInfosQueryHash, BaseQueryURL, getInstagramQueryURL, getInstagramUserInfosURL } from '../../constants/InstagramConstants'
import * as qs from 'qs'
import { writeLog } from '../../../utils/log'

export default class InstagramPostCrawler extends CrawlerObject {
  public OnFinishCallback: (...params: any) => any
  public UserID: string
  private SessionID: string
  private CSRFToken: string

  private get SessionIDCookie(): string {
    return 'sessionid=' + this.SessionID
  }

  constructor (userID: string, onFinishCallback) {
    super('instagramPosts')
    this.UserID = userID
    this.OnFinishCallback = onFinishCallback
  }

  async getUserInfos () {
    try {
      // Get the instagram page to get the CSRF token into the set-cookie header
      const insta = await axios.get('https://www.instagram.com/')
      this.CSRFToken = insta.headers['set-cookie'][0].split(';')[0].split('=')[1]
      // Login to instagram to get the sessionid cookie
      const loginResponse = await axios.post('https://www.instagram.com/accounts/login/ajax/', qs.stringify({
        password: 'x',
        username:	'claidotro',
        queryParams: {source: 'auth_switcher'}
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': this.CSRFToken
        },
      })
      if (loginResponse.data.authenticated) {
        // Get the sessionid cookie to make requests
        this.SessionID = loginResponse.headers['set-cookie'].find(h => h.includes('sessionid')).split(';')[0].split('=')[1]
        const userInfos = await axios.get(getInstagramUserInfosURL('claidotro2'), {
          headers: {
            Cookie: this.SessionIDCookie
          }
        })
        return userInfos.data
      } else {
        this.writeLog('Login or password are incorrect')
      }
    } catch (err) {
      this.writeLog(err)
    }
  }

  async execute() {
    const userInfos = await this.getUserInfos()
    if (userInfos) {
      console.log(userInfos)
    }
  }

  private writeLog(data) {
    writeLog('InstagramPostsError', data)
  }
}