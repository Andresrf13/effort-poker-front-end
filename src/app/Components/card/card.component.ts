import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() displayValue: string = '0';
  @Output() cardClickedEvent = new EventEmitter<CardComponent>();

  @ViewChild('card') card: ElementRef | undefined;

  constructor(private renderer2: Renderer2, private cardService: CardsService) {
    this.cardService.registerCard(this);
  }

  cardClicked(): void {
    this.cardClickedEvent.emit(this);
  }

  cleanClicked(): void {
    if (this.card) {
      this.renderer2.removeClass(this.card.nativeElement, 'doHover');
    }
  }

  selectCard(): void {
    if (this.card) {
      this.renderer2.addClass(this.card.nativeElement, 'doHover');
    }
  }

}
