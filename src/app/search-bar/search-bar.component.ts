import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared.service";

@Component({
  selector: 'searchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
  }

  getVideoID(url: any): void {
    let videoID = url.value['url'].split('=');
    this.shared.setVideoID(videoID[1]);
    this.shared.sendVideoEvent();
  }

}
