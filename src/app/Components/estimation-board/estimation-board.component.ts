import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { EstimationMethods, fibonacciOptions, numericSequenceOptions } from 'src/contracts/estimationMethods';
import { Room } from 'src/contracts/room';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-estimation-board',
  templateUrl: './estimation-board.component.html',
  styleUrls: ['./estimation-board.component.scss']
})
export class EstimationBoardComponent implements OnInit {

  @Input() room: Room = new Room();

  @Output() valueClickedEvent = new EventEmitter<string>();

  currentEstimation = EstimationMethods.fibonacci;

  constructor(private cardsService: CardsService) { }


  ngOnInit(): void {
    this.numbers = this.getNumbers();
  }

  ngAfterContentChecked(): void {
    if (this.room.estimationMethod !== this.currentEstimation) {
      this.currentEstimation = this.room.estimationMethod;
      this.numbers = this.getNumbers();
    }
  }

  getNumbers(): string[] {
    let result: any[]= [];
    switch (Number(this.currentEstimation)) {
      case EstimationMethods.fibonacci:
        result = fibonacciOptions;
        break;
      case EstimationMethods.numericSequence:
        result = numericSequenceOptions;
        break;
    }

    return ["?", ... result];
  }

  numbers: string[] = [];
  
  cardClicked(value: CardComponent) {
    this.valueClickedEvent.emit(value.displayValue);
    this.cardsService.cardClicked(value);
  }
}
