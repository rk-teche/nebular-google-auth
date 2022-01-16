import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';

interface IUserState {
  isLoggedIn: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  userState: IUserState = {
    isLoggedIn: false
  }
  constructor(
    private authService: NbAuthService,
    private _router: Router,
    private _http: HttpClient
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.getToken();
    if(token && token.access_token){
      return true
    }
    this._router.navigate(['/'])
    return  false;
  }

  getToken(){
    const token = localStorage.getItem('auth_app_token')
    if(token){
      const info = JSON.parse(token)
      if(info){
        return JSON.parse(info.value);
      }
    }
  }

  getUserInfo(token: any) : Observable<any> {
    return this._http.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`)
  }
}


