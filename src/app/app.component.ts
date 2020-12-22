import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subscription, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean>  = new ReplaySubject(1); 

  isAuth = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    // this.router.events
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((event) => {
    //     console.log(event);
    //     if (event instanceof NavigationEnd) {
    //       console.log(event);
    //       const urls = ['/', '/sign-in', '/register-user', '/forgot-password', '/verify-email-address'];
    //       this.isAuth = urls.some(v => v == event.url);
    //     }
    //   });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
