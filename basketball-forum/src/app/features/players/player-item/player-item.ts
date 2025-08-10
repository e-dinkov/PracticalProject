import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Player } from '../../../models/player.model';
import { AuthService } from '../../../core/services/auth.service';
import { PlayerService } from '../../../core/services/player.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-player-item',
  imports: [RouterLink],
  templateUrl: './player-item.html',
  styleUrl: './player-item.css',
})
export class PlayerItem implements OnInit {
  @Input() player!: Player;

  private authService = inject(AuthService);
  private playerService = inject(PlayerService);

  currentUserId = signal<string | null>(null);
  likes = signal<string[]>([]);

  ngOnInit() {
    this.currentUserId.set(this.authService.currentUser()?.id ?? null);
    this.likes.set(this.player.likes ?? []);
  }

  hasLiked() {
    const userId = this.currentUserId();
    return userId ? this.likes().includes(userId) : false;
  }

  toggleLike() {
    console.log(this.player);
    
    const userId = this.currentUserId();
    if (!userId) return;

    let updatedLikes = [...this.likes()];
    if (this.hasLiked()) {
      updatedLikes = updatedLikes.filter((id) => id !== userId);
    } else {
      updatedLikes.push(userId);
    }

    this.likes.set(updatedLikes);
     console.log(this.player._id);
     
    this.playerService.likePlayer(this.player._id).subscribe({
      next: (updatedPlayer) => {
        this.player = updatedPlayer;
      },
      error: (err) => {
        console.error('Error liking player', err);
      },
     });
  }
}
