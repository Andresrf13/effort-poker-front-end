import { Injectable } from '@angular/core';
import { Room } from '../../contracts/room';
import { User } from '../../contracts/user';
import { CardComponent } from '../Components/card/card.component';
import { PokerService } from './poker.service';

@Injectable()
export class CardsService {

  room: Room = new Room();

  cards: CardComponent[] = [];

  constructor(private pokerService: PokerService) { 
  }

  registerRoom(room: Room): void {
    this.room = room;
  }

  registerCard(card: CardComponent): void {
    this.cards.push(card);
  }

  unregisterCard(card: CardComponent): void {
    const index = this.cards.findIndex(c => c === card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }

  cardClicked(card: CardComponent): void {
    this.cards.forEach(c => c.cleanClicked());
    card.selectCard();
    this.pokerService.sendCard(this.room.id, card.displayValue);
  }
}
