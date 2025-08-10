import { Component, inject } from '@angular/core';
import { Player } from '../../../models/player.model';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { PlayerService } from '../../../core/services/player.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerItem } from '../player-item/player-item';

@Component({
  selector: 'app-players-board',
  imports: [RouterLink,CommonModule,PlayerItem],
  templateUrl: './players-board.html',
  styleUrl: './players-board.css',
})
export class PlayersBoard {
  players: Player[] = [];
  protected authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  players$: Observable<Player[]>;
  
  constructor(
    private playerService:PlayerService) {
    this.players$ = this.playerService.getPlayers();
    console.log(this.players$);
  }
}
