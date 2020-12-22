import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { fadeIn } from '../../shared/animations/animations';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  animations: [ fadeIn ]
})
export class VerifyEmailComponent implements OnInit {
  shakeAnimationState = 'inactive';
  slideRightAnimationState = 'inactive';

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onRouterLink(event: Event, link: string[]) {
    event.preventDefault();

    this.authService.goRouterLink(1000, link)
  }

}
