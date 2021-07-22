import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared.service";
import { Subscription } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'videoView',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  public embed: any;
  private videoEventSubscription: Subscription;

  constructor(private shared: SharedService, private _sanitizer: DomSanitizer) {
    this.videoEventSubscription = this.shared.receiveVideoEvent().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.embed = this._sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.shared.getVideoID()
    );
  }

}
