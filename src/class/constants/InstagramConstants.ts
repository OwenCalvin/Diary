export const UserInfosQueryHash = '7c16654f22c819fb63d1183034a5162f'
export const UserPostsQueryHash = '5b0222df65d7f6659c9b82246780caa7'
export const BaseQueryURL = 'https://www.instagram.com/graphql/query/?query_hash='
export const InstagramLoginURL = 'https://www.instagram.com/accounts/login/ajax/'

export const getInstagramQueryURL = (queryHash, variables) => {
  return `${BaseQueryURL}${queryHash}&variables=${JSON.stringify(variables)}`
}

export const getInstagramUserInfosURL = (username) => {
  return `https://www.instagram.com/${username}/?__a=1`
}
