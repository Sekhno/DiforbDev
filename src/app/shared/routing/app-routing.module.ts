import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../guard/auth.guard";

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { LibrariesComponent } from 'src/app/components/dashboard/libraries/libraries.component';
import { SettingsComponent } from 'src/app/components/dashboard/settings/settings.component';
import { LibraryComponent } from 'src/app/components/dashboard/libraries/library/library.component';
import { LicenseComponent } from 'src/app/components/dashboard/license/license.component';
import { PrivacyComponent } from 'src/app/components/dashboard/privacy/privacy.component';
import { SupportComponent } from 'src/app/components/dashboard/support/support.component';
import { TouchComponent } from 'src/app/components/dashboard/touch/touch.component';
import { TutorialComponent } from 'src/app/components/dashboard/tutorial/tutorial.component';
import { FaqComponent } from 'src/app/components/dashboard/faq/faq.component';
import { DiforbComponent } from 'src/app/components/diforb/diforb.component';

const dashboard: Routes = [
	{ path: 'settings', component: SettingsComponent },
	{ path: 'tutorial', component: TutorialComponent },
	{ path: 'faq', component: FaqComponent },
	{ path: 'license', component: LicenseComponent },
	{ path: 'privacy', component: PrivacyComponent },
	{ path: 'support', component: SupportComponent },
	{ path: 'touch', component: TouchComponent },
	{ path: '', component: LibrariesComponent , children: [{ path: ':id', component: LibraryComponent }] }, 
];
const routes: Routes = [
  	{ path: 'sign-in', component: SignInComponent },
  	{ path: 'register-user', component: SignUpComponent },
  	{ path: 'dashboard', component: DashboardComponent, children: dashboard },
  	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'verify-email-address', component: VerifyEmailComponent },
	{ path: 'app', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'app/:id', component: DiforbComponent, canActivate: [AuthGuard] },
	{ path: '', redirectTo: '/sign-in', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
