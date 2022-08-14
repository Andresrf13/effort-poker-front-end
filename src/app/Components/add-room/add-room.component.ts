import { Component, OnInit } from '@angular/core';
import { PokerService } from 'src/app/services/poker.service';
import { EstimationMethods } from 'src/contracts/estimationMethods';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  
  
  constructor(private pokerService: PokerService) {
    this.pokerService.roomCreated().subscribe(data => {
      this.clearFields();
      this.showRoomCreated = true;
      this.createdRoom = data;
    });
  }
  
  createdRoom: string = '';

  showRoomCreated = false;
  
  roomName: string = '';
  
  description: string = '';
  
  estimationMethod: EstimationMethods = EstimationMethods.fibonacci;
  
  ngOnInit(): void {
  }

  clearFields(): void {
    this.roomName = '';
    this.description = '';
    this.estimationMethod = EstimationMethods.fibonacci;
  }

  closeSuccessAlert(): void {
    this.showRoomCreated = false;
  }


  createRoom(event: any): void {
    if(this.roomName.trim().length <= 0) {
      return;
    }
    if (this.estimationMethod == null) {
      return;
    }

    this.pokerService.createRoom(this.roomName, this.description, this.estimationMethod);
  }
}
