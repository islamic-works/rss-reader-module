import { Component, OnInit } from '@angular/core';

import { RssReaderService } from './rss-reader.service';
import { FeedEntry } from './feed-entry';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-rss-reader',
  templateUrl: './rss-reader.component.html',
  styleUrls: ['./rss-reader.component.scss'],
  moduleId: module.id,
})
export class RssReaderComponent implements OnInit {
  active: string;
  feedItems: Array<FeedEntry> = [];

  constructor(
    private page: Page,
    private rssReaderService: RssReaderService
  ) { console.log("RssReaderComponent") }

  ngOnInit() {
    this.active = "news"; // @todo news é o nome usado nas rotas, rever isso.
    this.page.actionBarHidden = true;

    this.refreshFeed();
  }

  refreshFeed() {
    this.feedItems.length = 0; 

    if (this.rssReaderService.debug) console.log("RefreshFeed")
    this.rssReaderService.getFeedContent()
      .subscribe(
        feedContent => {
          let items = feedContent.items
            .map(entry => {
              // este mapamento é importante para fazer o relacionamento entre a entrada do feed, e sua fonte;
              entry.feedInfo = feedContent.feed;
              return entry;
            });
          this.feedItems = this.feedItems.concat(items);
        },
        error => console.error(error)
      );
  }


}
