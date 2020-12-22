import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { fadeIn, shakeAnimation, slideRightAnimation } from '../../shared/animations/animations';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [ fadeIn, shakeAnimation, slideRightAnimation ]
})

export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  shakeAnimationState = 'inactive';
  slideRightAnimationState = 'inactive';


  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this._createForm()
  }

  private _createForm() {
    this.signinForm = this.fb.group({
      userEmail: this.fb.control(null, [Validators.required, Validators.email]),
      userPassword: this.fb.control(null, [Validators.required, Validators.minLength(6)])
    });
  }

  get _userEmail() {
    return this.signinForm.get('userEmail');
  }

  get _userPassword() {
    return this.signinForm.get('userPassword');
  }

  ngOnInit() {
    this.authService.OffPreloader(2000);
  }

  onRouterLink(event: Event, link: string[]) {
    event.preventDefault();

    this.authService.goRouterLink(1000, link)
  }

  submit(): void {
    if (this.signinForm.invalid) {
      this.shakeAnimationState = 'active';
    } else {
      this.authService.SignIn(this._userEmail.value, this._userPassword.value)
    }
  }

}