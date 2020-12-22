import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { AuthService } from "src/app/shared/services/auth.service";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  activedLink = false;
  subscribed: Subscription[];

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.OffPreloader(2000);
    
    this.activedLink = this.isRoot();
    this.subscribed = [
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(_ => {
        this.activedLink = this.isRoot()
      })
    ];
  }

  ngOnDestroy() {
    while (this.subscribed.length) {
      this.subscribed.pop().unsubscribe();
    }
  }

  private isRoot(): boolean {
    return this.router.url === "/dashboard";
  }

}
