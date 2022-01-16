import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject, takeUntil } from 'rxjs';
import { AuthGuardService } from '../auth/auth-guard.service';

@Component({
  selector: 'app-nb-oauth2-login',
  templateUrl: './nb-oauth2-login.component.html',
  styleUrls: ['./nb-oauth2-login.component.scss']
})
export class NbOAuth2LoginComponent implements OnDestroy {
  token!: NbAuthOAuth2Token;
  private destroy$ = new Subject<void>();

  constructor(
    private _nbauthService: NbAuthService,
    private _authService : AuthGuardService,
    private _router: Router
    ) {
    
  }
  
  ngOnInit(): void {
    const token = this._authService.getToken();
    if(token && token.access_token){
      this._router.navigate(['/profile'])
    }
  }


  login() {
    this._nbauthService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        this._router.navigate(['/profile'])
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
