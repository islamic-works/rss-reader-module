import { Component, OnInit, Input } from '@angular/core';
import * as utils from "tns-core-modules/utils/utils";

import { registerElement } from 'nativescript-angular/element-registry';
import { FeedEntry } from '../feed-entry';

registerElement(
  'CardView', 
  () => require('@nstudio/nativescript-cardview').CardView
);

@Component({
  selector: 'ns-rss-card',
  templateUrl: './rss-card.component.html',
  styleUrls: ['./rss-card.component.scss'],
  moduleId: module.id,
})
export class RssCardComponent implements OnInit {

  @Input() feed: FeedEntry;

  constructor() { }

  ngOnInit() {
  }

  openLinkInBrowser() {
    console.log("Open Link In Browser: ", this.feed.link);
    utils.openUrl(this.feed.link);
  }

}
