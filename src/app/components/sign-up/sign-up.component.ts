import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { fadeIn, shakeAnimation, slideRightAnimation } from '../../shared/animations/animations';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [ fadeIn, shakeAnimation, slideRightAnimation ]
})

export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  shakeAnimationState = 'inactive';
  slideRightAnimationState = 'inactive';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this._createForm()
  }

  private _createForm() {
    this.signupForm = this.fb.group({
      userEmail: this.fb.control(null, [Validators.required, Validators.email]),
      userPassword: this.fb.control(null, [Validators.required, Validators.minLength(6)])
    });
  }

  get _userEmail() {
    return this.signupForm.get('userEmail');
  }

  get _userPassword() {
    return this.signupForm.get('userPassword');
  }

  ngOnInit() {
    this.authService.OffPreloader(2000);
  }

  onRouterLink(event: Event, link: string[]) {
    event.preventDefault();

    this.authService.goRouterLink(1000, link)
  }

  submit(): void {
    if (this.signupForm.invalid) {
      this.shakeAnimationState = 'active';
    } else {
      this.authService.SignUp(this._userEmail.value, this._userPassword.value)
    }
  }

  googleAuth(): void {
    this.authService.GoogleAuth()
  }

  facebookAuth(): void {
    this.authService.FacebookAuth();
  }

}