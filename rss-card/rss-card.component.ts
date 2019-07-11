import { Component, OnInit, Input } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
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
    window.open(this.feed.link);
  }

}
