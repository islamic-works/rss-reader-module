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
  feeds: Array<FeedEntry> = [];

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
    this.feeds.length = 0;

    // let feedUrl: string = 'https%3A%2F%2Fwww.becompany.ch%2Fen%2Fblog%2Ffeed.xml';

    console.log("RefreshFeed")
    this.rssReaderService.getFeedContent()
      .subscribe(
        res => this.feeds = res.items,
        error => console.log(error)
        );
  }


}
