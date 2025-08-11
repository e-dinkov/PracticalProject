import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlayerService } from '../../../core/services/player.service';
import { Player } from '../../../models/player.model';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe,RouterLink],
  templateUrl: './player-details.html',
  styleUrls: ['./player-details.css'],
})
export class PlayerDetails implements OnInit {
 
  private route = inject(ActivatedRoute);
  private playerService = inject(PlayerService);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);


 readonly isLoggedIn = this.authService.isLoggedIn;
  player?: Player;
  loading = true;
  error = '';
  liked = false; // Track if current user liked this player
  isOwner = false


  private currentUserId = this.authService.currentUser()?.id ?? null;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.playerService.getPlayer(id).subscribe({
        next: (data) => {
          this.player = data;
          this.loading = false;
          this.checkIfLiked();
          
          
          this.isOwner = this.player.userId._id === this.currentUserId
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Player not found';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    }
  }
  checkIfLiked(): boolean {
    if (this.player && this.currentUserId) {
      return (this.liked =
        this.player.likes?.includes(this.currentUserId) ?? false);
    }
    return false;
  }

  onLike() {
    if (!this.player || this.liked) return;

    this.playerService.likePlayer(this.player._id).subscribe({
      next: (updatedPlayer) => {
        this.playerService.getPlayer(this.player!._id).subscribe({
          next: (data) => {
            this.player = data;
            this.loading = false;
            this.checkIfLiked();
            this.cdr.detectChanges();
          },
          error: () => {
            this.error = 'Player not found';
            this.loading = false;
            this.cdr.detectChanges();
          },
        });
        this.liked = true; // update UI reactively
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to like player', err);
      },
    });
  }
  isOwnerFn(): boolean {
    if (this.player && this.currentUserId) {
      return this.player._id === this.currentUserId;
    }
    return false;
  }
}
