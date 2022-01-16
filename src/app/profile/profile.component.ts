import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject, takeUntil } from 'rxjs';
import { AuthGuardService } from '../auth/auth-guard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo : any;
  constructor(private authService: NbAuthService, private _router: Router, private _auth: AuthGuardService) { }
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    const token = this._auth.getToken();
    if(token?.access_token){
      this._auth.getUserInfo(token?.access_token).subscribe(_res => {
        this.userInfo = _res
      })
    }
  }

  logout() {
    this.authService
      .logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        // console.log('logout successfully', authResult)
        this._router.navigate(['/login'])
        localStorage.clear();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
