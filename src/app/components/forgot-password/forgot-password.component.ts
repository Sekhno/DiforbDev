import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { fadeIn, shakeAnimation, slideRightAnimation } from '../../shared/animations/animations';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [ fadeIn, shakeAnimation, slideRightAnimation ]
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  shakeAnimationState = 'inactive';
  slideRightAnimationState = 'inactive';

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) { 
    this._createForm()
  }

  private _createForm() {
    this.resetForm = this.fb.group({
      userEmail: this.fb.control(null, [Validators.required, Validators.email])
    });
  }

  get _userEmail() {
    return this.resetForm.get('userEmail');
  }

  ngOnInit() {
    this.authService.OffPreloader(2000);
  }

  onRouterLink(event: Event, link: string[]) {
    event.preventDefault();

    this.authService.goRouterLink(1000, link)
  }

  submit(): void {
    if (this.resetForm.invalid) {
      this.shakeAnimationState = 'active';
    } else {
      this.authService.ForgotPassword(this._userEmail.value);
    }
  }

}
