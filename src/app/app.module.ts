import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Project Components
import { AppComponent } from './app.component';
import { RoomListComponent } from './Components/room-list/room-list.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AddRoomComponent } from './Components/add-room/add-room.component';
import { PokerComponent } from './Components/poker/poker.component';


//Angular Material components
import { MatDialogModule } from '@angular/material/dialog';
import { UserNameModalComponent } from './Components/user-name-modal/user-name-modal.component';
import { HomeComponent } from './Components/home/home.component';
import { EstimationBoardComponent } from './Components/estimation-board/estimation-board.component';
import { CardComponent } from './Components/card/card.component';
import { ResultsComponent } from './Components/results/results.component';
import { LoadingComponent } from './Components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    NavbarComponent,
    AddRoomComponent,
    UserNameModalComponent,
    PokerComponent,
    HomeComponent,
    EstimationBoardComponent,
    CardComponent,
    ResultsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
