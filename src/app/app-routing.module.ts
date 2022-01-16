import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { NbOAuth2CallbackComponent } from './nb-oauth2-callback/nb-oauth2-callback.component';
import { NbOAuth2LoginComponent } from './nb-oauth2-login/nb-oauth2-login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: NbOAuth2LoginComponent,
  },
  {
    path: 'oauth2/callback',
    component: NbOAuth2CallbackComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
