import { Instagram } from './Crawlers/Instagram/Instagram'
import { InstagramPost } from './Crawlers/Instagram/InstagramPost';
export { InstagramUser } from './Crawlers/Instagram/InstagramUser'
export { InstagramPost } from './Crawlers/Instagram/InstagramPost'
export { InstagramLogin } from './Crawlers/Instagram/InstragramLogin'
export { InstagramStory } from './Crawlers/Instagram/InstagramStory'

export * from './CrawlerObject'
export * from './CrawlerCollection'
export namespace InstagramCrawler {
  Instagram
  InstagramUser
  InstagramPost
  InstagramLogin
  InstagramStory
}
