import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { EstimationMethods } from 'src/contracts/estimationMethods';
import { Room } from 'src/contracts/room';
import { User } from 'src/contracts/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokerService {

  private socket: Socket;
  private url = environment.url;

  public user: User;
  public room: Room;

  constructor() { 
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });
    this.user = new User();
    this.room = new Room();
  }

  join(): void {
    this.socket.emit('join', {data:'hiSocket'});
  }
  
  getRooms(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('rooms-list', (data) => {
        observer.next(data);
      });
    });
  }

  roomCreated(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('room-created', (data) => {
        observer.next(data);
      });
    });
  }

  userJoined(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('user-joined', (data) => {
        observer.next(data);
      });
    });
  }

  userJoinedRoom(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('user-joined-room', (data) => {
        observer.next(data);
      });
    });
  }

  createRoom(roomName: string, description: string, estimationMethod: EstimationMethods): void {
    this.socket.emit('create-room', {name: roomName, description, estimationMethod});
  }

  openRoom(userName: string, roomId: string): void {
    this.socket.emit('join-room', userName, roomId);
  }

  sendCard(roomId: string, displayValue: string): void {
    this.socket.emit('voted', roomId, displayValue);
  }

  askResults(roomId: string): void {
    this.socket.emit('ask-results', roomId);
  }

  getResults(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('get-results', (data) => {
        data.room.users.forEach((element: User) => {
          element.status = element.vote;
        });
        observer.next(data);
      });
    });
  }

  userVoted(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('user-voted', (data) => {
        observer.next(data);
      });
    });
  }

  otherUserVoted(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('other-user-voted', (data) => {
        observer.next(data);
      });
    });
  }

  clearRoom(roomId: string): void {
    this.socket.emit('clear-room',  roomId);
  }

  showResults(roomId: string): void {
    this.socket.emit('show-results', roomId);
  }

  updatedRoom(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('updated-room', (data) => {
        observer.next(data);
      });
    });
  }

  navigateToResults(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('navigate-results', (data) => {
        observer.next(data);
      });
    });
  }

  registerUser(user: User): void {
    this.user = user;
  }

  registerRoom(room: Room): void {
    this.room = room;
  }

  leaveRoom(): void {
    this.socket.emit('leave-room', this.room.id);
    this.user = new User();
    this.room = new Room();
  }

}
