import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public nbBookmarks: any;
  private videoEventSubscription: Subscription;

  constructor(private http: HttpClient, private shared: SharedService) {
    this.videoEventSubscription = this.shared.receiveBookmarkVideoEvent().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getNbBookmarks();
  }

  getNbBookmarks() {
    this.http.get(environment.apiURL + 'bookmarks').toPromise().then(data => {
      // @ts-ignore
      this.nbBookmarks = data['hydra:member'].length;
    });
  }

}
