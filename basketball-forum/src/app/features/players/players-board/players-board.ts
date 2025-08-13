import { Component, inject } from '@angular/core';
import { Player } from '../../../models/player.model';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { PlayerService } from '../../../core/services/player.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerItem } from '../player-item/player-item';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-players-board',
  imports: [CommonModule, PlayerItem],
  templateUrl: './players-board.html',
  styleUrl: './players-board.css',
})
export class PlayersBoard {
  players: Player[] = [];
  paginatedPlayers: Player[] = [];
  currentPage = 1;
  itemsPerPage = 6;

  protected authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  players$: Observable<Player[]>;

  constructor(
    private playerService: PlayerService,
    private cdr: ChangeDetectorRef
  ) {
    this.players$ = this.playerService.getPlayers();

    this.players$.subscribe((data) => {
      this.players = data || [];
      this.updatePaginatedPlayers();
      this.cdr.detectChanges(); //* Forcing Angular to update the view immediately 
    });
  }

  updatePaginatedPlayers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPlayers = this.players.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.players.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePaginatedPlayers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPlayers();
    }
  }
  mathCeil(a: number, b: number) {
    return Math.ceil(a / b);
  }
}



