import { Component, OnInit } from '@angular/core';
import { PokerService } from 'src/app/services/poker.service';
import { Room } from 'src/contracts/room';
import { User } from 'src/contracts/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private pokerService: PokerService) {

   }

  ngOnInit(): void {
  }

  get user(): User {
    return this.pokerService.user;
  }

  get room(): Room {
    return this.pokerService.room;
  }

}
