import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokerService } from 'src/app/services/poker.service';

@Component({
  selector: 'app-ask-question-dialog',
  templateUrl: './ask-question-dialog.component.html',
  styleUrls: ['./ask-question-dialog.component.scss']
})
export class AskQuestionDialogComponent  {

  constructor(public dialogRef: MatDialogRef<AskQuestionDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private pokerService: PokerService) { }

  handleYes(): void {
    this.pokerService.showResults(this.data);
    this.dialogRef.close();
  }

}
