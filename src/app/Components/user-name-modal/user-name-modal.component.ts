import { AfterContentInit, Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PokerService } from 'src/app/services/poker.service';

@Component({
  selector: 'app-user-name-modal',
  templateUrl: './user-name-modal.component.html',
  styleUrls: ['./user-name-modal.component.scss']
})
export class UserNameModalComponent implements OnDestroy, AfterContentInit {
  roomCreated$: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<UserNameModalComponent>,
    private pokerService: PokerService,
    private router: Router) {
    this.roomCreated$ = this.pokerService.userJoined().subscribe(args => {
      this.dialogRef.close();
    });
  }

  ngOnDestroy(): void {
      this.roomCreated$.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.userName = sessionStorage.getItem('userName') ?? '';
  }

  userName: string = '';

  openRoom(): void {
    sessionStorage.setItem('userName', this.userName);
    this.pokerService.openRoom(this.userName, this.data);
  }


}
