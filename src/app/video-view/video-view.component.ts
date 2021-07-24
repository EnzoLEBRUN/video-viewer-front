import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'videoView',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  public embed: any;
  private videoEventSubscription: Subscription;

  constructor(private _sanitizer: DomSanitizer, private shared: SharedService) {
    this.videoEventSubscription = this.shared.receiveVideoEvent().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (this.shared.getVideoURL()) {
      this.embed = this._sanitizer.bypassSecurityTrustResourceUrl(
        this.shared.getVideoURL()['video_url']
      );
    }
  }

}
