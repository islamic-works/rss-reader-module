import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { Routes } from '@angular/router';

import { MenuModule } from '../menu/menu.module';

import { RssReaderComponent } from './rss-reader.component';
import { RssCardComponent } from './rss-card/rss-card.component';
import { StripHtmlTagsPipe } from './pipe/strip-html-tags.pipe';
import { SettingsService } from '../services/settings.service';
import { RssReaderService } from './rss-reader.service';

const routes: Routes = [
  { path: "", component: RssReaderComponent },
  { path: "entry/:id", },
];

@NgModule({
  imports: [
    NativeScriptHttpClientModule,
    MenuModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule, RssReaderComponent, RssCardComponent],
  declarations: [RssReaderComponent, RssCardComponent, StripHtmlTagsPipe],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [RssReaderComponent, RssCardComponent]
})
export class RssReaderModule {
  constructor(
    private rssReaderService: RssReaderService
    ) {
    if (this.rssReaderService.debug) console.log("RssReaderModule")
  }
} 
