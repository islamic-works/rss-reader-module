import { Injectable } from '@angular/core';

import * as encodeurl from 'encodeurl';

import { HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { SettingsService } from '../services/settings.service';
import { Feed } from './feed';

@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  constructor(
    private settings: SettingsService,
    private http: HttpClient
  ) { if (this.settings.debug) console.log("RssReaderService") }

  get debug(): boolean {
    return this.settings.debug;
  }

  public getFeedContent(url?: string): Observable<Feed> {
    if (this.settings.debug) console.log("getFeedContent", url);
    if (!url) {
      let urls = this.settings.feedUrls;
      if (this.settings.debug) console.log("URL não informado, usando settings:", urls);
      return from(urls)
        .pipe(
          mergeMap((url) => {
            if (this.settings.debug) console.log("getFeedContent.mergeMap:", url);
            if (url)
              return this.getFeedContent(url);
          })
        );
    }

    if (this.settings.debug) {
      console.log("encodeURL: ", url);
    }
    console.log(encodeurl(url));
    url = encodeurl(url);
    if (this.settings.debug) {
      console.log("Url Encoded: ", url);
    }
    if (this.settings.rssToJsonConverterType == "rss2json") {
      return this.http.get<Feed>(this.settings.rssToJsonConverterBaseUrl + url)
        .pipe(
          map((res) => {
            if (this.settings.debug) {
              console.log("extractFeeds");
              console.log(res.feed.url);
              console.log(res.feed.title);
              console.log(res.feed.description);
              console.log(res);
            }
            return res;
          }),
          catchError((error: any) => {
            // In a real world app, we might use a remote logging infrastructure
            // We'd also dig deeper into the error to get a better message
            if (this.settings.debug) console.error(error);
            let errMsg = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return throwError(errMsg);
          })
        );
    } else {
      throw new Error("Não implementado ainda");
    }
  }
}
