import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokerService } from './services/poker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  userNotFound$: Subscription;
  roomNotFound$: Subscription;

  constructor(private router: Router, private pokerService: PokerService) { 
    this.userNotFound$ = this.pokerService.userNotFound().subscribe(() => {
      this.navigateToHome();
    });

    this.roomNotFound$ = this.pokerService.roomNotFound().subscribe(() => {
      this.navigateToHome();
    });
  }

  private navigateToHome(): void {
    this.router.navigate(['']).then((e) => {
      if (!e) {
        console.log('Navigation to home failed', e);
      }
    });
  }

  ngOnDestroy(): void {
    this.userNotFound$?.unsubscribe();
    this.roomNotFound$?.unsubscribe();
  }

}
