import { Component, OnInit, Input } from '@angular/core';
import * as utils from "tns-core-modules/utils/utils";

import { CardView } from 'nativescript-cardview';

import { registerElement } from 'nativescript-angular/element-registry';
registerElement('CardView', () => CardView);

@Component({
  selector: 'ns-rss-card',
  templateUrl: './rss-card.component.html',
  styleUrls: ['./rss-card.component.scss'],
  moduleId: module.id,
})
export class RssCardComponent implements OnInit {

  @Input() feed: any;

  constructor() { }

  ngOnInit() {
  }

  openLinkInBrowser() {
    console.log("Open Link In Browser: ", this.feed.link);
    utils.openUrl(this.feed.link);
  }

}
