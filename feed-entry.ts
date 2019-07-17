import { FeedInfo } from "./feed-info";

export interface FeedEntry {
  feedInfo: FeedInfo,
  title: string,
  link: string,
  guid: string,
  pubDate: Date,
  categories: Array<string>,
  author: string,
  thumbnail: string,
  description: string,
  content: string
}
