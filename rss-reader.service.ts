import { Injectable } from '@angular/core';

import * as encodeurl from 'encodeurl';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SettingsService } from '../services/settings.service';
import { Feed } from './feed';

@Injectable({
  providedIn: 'root'
})
export class RssReaderService {

  constructor(
    private settings: SettingsService,
    private http: HttpClient
  ) { console.log("RssReaderService") }

  public getFeedContent(url?: string): Observable<Feed> {
    if (!url) {
      url = this.settings.feedUrl;
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
          map(this.extractFeeds),
          catchError(this.handleError)
        );
    } else {
      throw new Error("Não implementado ainda");
    }
  }

  private extractFeeds(res: Feed): Feed {
    // como esta função é passada como referência o objeto this não é desta classe;
    //  if (this.settings.debug) {
    console.log("extrctFeeds");
    console.log(res.feed.url);
    console.log(res.feed.title);
    console.log(res.feed.description);
    console.log(res);

    //}
    return res;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
