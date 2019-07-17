import { FeedEntry } from "./feed-entry";

export interface FeedInfo {
  title: string,
  url: string,
  link: string,
  author: string,
  description: string,
  image: string
  items: FeedEntry[];
}
