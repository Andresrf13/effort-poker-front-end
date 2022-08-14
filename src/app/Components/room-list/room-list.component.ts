import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent  {

  @ViewChild('modal') modal: any;

  @Input() items: any;

  @Output() itemClickedEvent = new EventEmitter<any>();

  constructor() { }


  itemClicked(room: any) {
    this.itemClickedEvent.emit(room);
  }

}
