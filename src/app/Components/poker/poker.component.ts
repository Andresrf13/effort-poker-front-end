import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from 'src/app/services/cards.service';
import { PokerService } from 'src/app/services/poker.service';
import { Room } from 'src/contracts/room';
import { StateRoom } from 'src/contracts/stateRoom';
import { User } from 'src/contracts/user';
import { UserNameModalComponent } from '../user-name-modal/user-name-modal.component';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.scss'],
  providers: [CardsService]
})
export class PokerComponent implements OnInit, OnDestroy {

  public room: Room = new Room();
  public user: User = new User();

  public showResults = false;
  navigateSubscription: any;
  updateRoomSubscription: any;
  getResultsSubscription: any;
  userJoinedSubscription: any;
  userJoinedRoomSubscription: any;
  userVotedSubscription: any;
  activeRouteSubscription: any;
  otherUserVoteSubscription: any;

  constructor(public dialog: MatDialog, private pokerService: PokerService,
    private activatedRoute: ActivatedRoute, private cardsService: CardsService) {
    this.registerUserJoined();
    this.registerUserJoinedRoom();
    this.registerUserVoted();
    this.registerOtherUserVoted();
    this.registerGetResults();
    this.updatedRoom();
    this.navigateToResults();
    this.pokerService.join();
  }
  navigateToResults() {
    this.navigateSubscription = this.pokerService.navigateToResults().subscribe(data => {
      this.showResults = this.calculateState(data.stateRoom);
    });
  }

  updatedRoom(): void {
    this.updateRoomSubscription = this.pokerService.updatedRoom().subscribe((data: Room) => {
      this.room = data;
      updateStatus(data);
      this.showResults = this.calculateState(data.stateRoom);
      this.user.vote = this.user.status = '?';
    });
  }

  calculateState(data: StateRoom): boolean {
    return data == StateRoom.vote ? false : true;
  }

  registerGetResults() {
    this.getResultsSubscription = this.pokerService.getResults().subscribe(data => {
      this.room = Object.assign(this.room, data.room);
    });
  }

  private registerOtherUserVoted() {
    this.otherUserVoteSubscription = this.pokerService.otherUserVoted().subscribe(data => {
      data.users.forEach((element: User) => {
        element.status = element.vote;
        markClass(element);
        if (this.user.id === element.id) {
          element.status = this.user.vote;
        }
      });
      this.room = Object.assign(this.room, data);
    });
  }

  private registerUserVoted() {
    this.userVotedSubscription = this.pokerService.userVoted().subscribe(data => {
      updateStatus(data);
      this.room = Object.assign(this.room, data);
    });
  }

  private registerUserJoinedRoom() {
    this.userJoinedRoomSubscription = this.pokerService.userJoinedRoom().subscribe(data => {
      this.processUsersRoom(data);
    });
  }

  private registerUserJoined() {
    this.userJoinedSubscription = this.pokerService.userJoined().subscribe(data => {
      this.room = Object.assign(this.room, data.room);
      this.user = Object.assign(this.user, data.user);
      this.processUsersRoom(data);
      this.showResults = this.calculateState(data.room.stateRoom);
      this.cardsService.registerRoom(this.room);
      this.pokerService.registerUser(this.user);
      this.pokerService.registerRoom(this.room);
    });
  }

  private processUsersRoom(data: any) {
    this.room.users = data.room.users.map((elem: any) => {
      const user = new User();
      user.vote = user.status = elem.vote;
      markClass(user);
      if (this.user.id === elem.id) {
        elem.status = this.user.vote;
      }
      return Object.assign(user, elem);
    });
  }

  ngOnInit(): void {
    this.activeRouteSubscription = this.activatedRoute.params.subscribe(params => {
      const roomId = params['id'];
      if (roomId) {
        this.dialog.open(UserNameModalComponent, {
          width: '250px',
          enterAnimationDuration: '100ms',
          exitAnimationDuration: '100ms',
          data: roomId,
          disableClose: true
        });
      }
    });
  }

  showResultsClicked(): void {
    this.pokerService.showResults(this.room.id);
  }

  showVotesClicked(): void {
    this.pokerService.clearRoom(this.room.id);
  }

  valueClicked(value: string): void {
    this.user.vote = this.user.status = value;
    this.user.class = 'bg-success';
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
    this.pokerService.leaveRoom();
    this.navigateSubscription?.unsubscribe();
    this.updateRoomSubscription?.unsubscribe();
    this.getResultsSubscription?.unsubscribe();
    this.userJoinedSubscription?.unsubscribe();
    this.userJoinedRoomSubscription?.unsubscribe();
    this.userVotedSubscription?.unsubscribe();
    this.activeRouteSubscription?.unsubscribe();
    this.otherUserVoteSubscription?.unsubscribe();
  }
}

function markClass(element: User): void {
  if (element.status !== '?') {
    element.class = 'bg-success';
    return;
  }
  if (element.status == '?') {
    element.class = 'bg-warning';
  }
}

function updateStatus(data: any) {
  data.users.forEach((element: User) => {
    element.status = element.vote;
    markClass(element);
  });
}
