import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule, NbOAuth2AuthStrategy, NbOAuth2ResponseType } from '@nebular/auth';
import { NbOAuth2LoginComponent } from './nb-oauth2-login/nb-oauth2-login.component';
import { NbOAuth2CallbackComponent } from './nb-oauth2-callback/nb-oauth2-callback.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NbOAuth2LoginComponent,
    NbOAuth2CallbackComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    HttpClientModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: '528665870525-erfvn5np8171pdjn6h7tkf62n5m1pvfh.apps.googleusercontent.com',
          clientSecret: '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',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',            
            redirectUri: 'http://localhost:4200/oauth2/callback',
          }
        })
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
