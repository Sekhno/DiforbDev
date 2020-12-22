import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { playerReducer } from './store/reducers/player.reducers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/routing/app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
 
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Services
import { AuthService } from "./shared/services/auth.service";
import { AudioService } from "./shared/services/audio.service";

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LibrariesComponent } from './components/dashboard/libraries/libraries.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { LibraryComponent } from './components/dashboard/libraries/library/library.component';
import { LicenseComponent } from './components/dashboard/license/license.component';
import { PrivacyComponent } from './components/dashboard/privacy/privacy.component';
import { SupportComponent } from './components/dashboard/support/support.component';
import { TouchComponent } from './components/dashboard/touch/touch.component';
import { TutorialComponent } from './components/dashboard/tutorial/tutorial.component';
import { FaqComponent } from './components/dashboard/faq/faq.component';
import { DiforbComponent } from './components/diforb/diforb.component';
import { MenuComponent } from './components/diforb/menu/menu.component';
import { InterfaceComponent } from './components/diforb/interface/interface.component';
import { MuteComponent } from './components/diforb/interface/mute/mute.component';
import { PitchComponent } from './components/diforb/interface/pitch/pitch.component';
import { SliderComponent } from './components/diforb/interface/slider/slider.component';
import { SoundListComponent } from './components/diforb/interface/sound-list/sound-list.component';
import { SoundPlayerComponent } from './components/diforb/interface/sound-player/sound-player.component';
import { SoundHeaderComponent } from './components/diforb/sound-header/sound-header.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    LibrariesComponent,
    SettingsComponent,
    LibraryComponent,
    LicenseComponent,
    PrivacyComponent,
    SupportComponent,
    TouchComponent,
    TutorialComponent,
    FaqComponent,
    DiforbComponent,
    MenuComponent,
    InterfaceComponent, MuteComponent, PitchComponent, SliderComponent, SoundListComponent, SoundPlayerComponent, SoundHeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
    AngularFireAuthModule,
    FlexLayoutModule.withConfig({ssrObserveBreakpoints: ['xs', 'sm', 'md', 'lg', 'xl']}),
    
    PerfectScrollbarModule,
    StoreModule.forRoot({ player: playerReducer })
  ],
  providers: [
    AuthService,
    AudioService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

