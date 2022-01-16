import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nb-oauth2-callback',
  templateUrl: './nb-oauth2-callback.component.html',
  styleUrls: ['./nb-oauth2-callback.component.scss']
})
export class NbOAuth2CallbackComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess()) {
          this.router.navigateByUrl('');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
