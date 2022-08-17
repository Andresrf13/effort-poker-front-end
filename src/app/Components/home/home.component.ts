import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokerService } from 'src/app/services/poker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private pokerService: PokerService) { }

  rooms: any[] = [];


  ngOnInit() {
    this.pokerService.getRooms().subscribe(data => {
      this.processRooms(data);
      this.rooms = data;
    });
    this.pokerService.join();
  }

  processRooms(data: any) {
    data.forEach((room: any) => {
      room.status = room.users.length;
    } );
  }

  roomClicked(room: any) {
    const id = room.id;
    this.router.navigate(['poker', id]).then((e) => {
      if (!e) {
        console.log('Navigation failed', e);
      }
    });
  }

}
