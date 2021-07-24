import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();
  private subjectBookmark = new Subject<any>();
  videoURL: any;

  constructor() { }

  receiveVideoEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  sendVideoEvent() {
    this.subject.next();
  }

  receiveBookmarkVideoEvent(): Observable<any> {
    return this.subjectBookmark.asObservable();
  }

  sendBookmarkVideoEvent() {
    this.subjectBookmark.next();
  }

  getVideoURL() {
    return this.videoURL;
  }

  setVideoURL(url: any) {
    this.videoURL = url;
  }
}
