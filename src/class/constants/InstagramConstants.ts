export const UserInfosQueryHash = '7c16654f22c819fb63d1183034a5162f'
export const UserPostsQueryHash = '5b0222df65d7f6659c9b82246780caa7'
export const UserStoryQueryHash = '61e453c4b7d667c6294e71c57afa6e63'
export const BaseQueryURL = 'https://www.instagram.com/graphql/query/?query_hash='
export const InstagramLoginURL = 'https://www.instagram.com/accounts/login/ajax/'

export const getInstagramQueryURL = (queryHash: string, variables?: any) => {
  return `${BaseQueryURL}${queryHash}${variables ? `&variables=${JSON.stringify(variables)}` : ''}`
}

export const getInstagramUserInfosURL = (username: string) => {
  return `https://www.instagram.com/${username}/?__a=1`
}

export const getSessionIdCookie = (sessionId: string) => {
  return `sessionid=${sessionId}`
}

export const getRequestConfig = (sessionId: string) => {
  return {
    headers: {
      Cookie: sessionId
    }
  }
}
