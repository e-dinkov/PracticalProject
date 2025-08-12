import { Component, inject, OnInit } from '@angular/core';
import { PlayerService } from '../../../core/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-player-delete',
  imports: [],
  templateUrl: './player-delete.html',
  styleUrl: './player-delete.css'
})
export class PlayerDelete implements OnInit{
  private playerService = inject(PlayerService)
  private authService = inject(AuthService)
  private route = inject(ActivatedRoute)
  protected router = inject(Router)
  protected playerId = this.route.snapshot.paramMap.get('id')
  private userId = this.authService.currentUser()?.id ?? null
  loading = true
  ngOnInit(): void {
    this.playerService.deletePlayer(this.playerId!).subscribe({
      next: (data) => {
        console.log(data)
        this.loading = false
        this.router.navigate(['/players'])
        
      },
      error: (err) => console.log(err),
    });
  }

}
