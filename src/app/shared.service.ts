import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();
  videoID: any;

  constructor() { }

  receiveVideoEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  sendVideoEvent() {
    this.subject.next();
  }

  getVideoID() {
    return this.videoID;
  }

  setVideoID(id: any) {
    this.videoID = id;
  }

}
