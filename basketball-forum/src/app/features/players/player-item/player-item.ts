import { Component, Input } from '@angular/core';
import { Player } from '../../../models/player.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-player-item',
  imports: [CommonModule,RouterLink],
  templateUrl: './player-item.html',
  styleUrl: './player-item.css'
})
export class PlayerItem {
@Input() player!: Player
}
