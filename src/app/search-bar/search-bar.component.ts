import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'searchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private http: HttpClient, private shared: SharedService) { }

  ngOnInit(): void {
  }

  play(url: any): void {
    if (url.value['url']) {
      let videoURL = {
        url: url.value['url']
      };
      this.addHistory(videoURL);
    }
  }

  addHistory(url: any): any {
    this.http.post(environment.apiURL + 'histories', url).toPromise().then(data => {
      this.shared.setVideoURL(data);
      this.shared.sendVideoEvent();

      return data;
    });
  }

}
