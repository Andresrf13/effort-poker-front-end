import { Component, Input, OnInit } from '@angular/core';
import { PokerService } from 'src/app/services/poker.service';
import { ProgressResult } from 'src/contracts/progressResult';
import { Room } from 'src/contracts/room';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() room: Room | undefined;

  progressData: ProgressResult[] = [];

  total = 0;

  constructor(private pokerService: PokerService) {
  }
    

  ngOnInit(): void {
    this.pokerService.getResults().subscribe(data => {
      this.progressData = data.results.map((x : any) => {
        const result = new ProgressResult();
        result.color = this.generateRandomColor();
        return Object.assign(result, x);
      });
      this.total = data.total;
    });
    if (this.room) {
      this.pokerService.askResults(this.room.id);
    }
  }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
