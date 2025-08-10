import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PlayerService } from '../../../core/services/player.service';

@Component({
  selector: 'app-new-player',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-player.html',
  styleUrl: './new-player.css',
})
export class NewPlayer {
  protected authService = inject(AuthService);
  private playerService = inject(PlayerService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  playerForm = this.fb.group({
    playerName: ['', [Validators.required, Validators.minLength(2)]],
    playerTeam: ['', [Validators.required]],
    playerHeight: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
    ],
    playerWeight: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
    ],
    playerDescription: ['', [Validators.required, Validators.minLength(10)]],
    playerPhoto: ['',[Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)]],
  });

  get f() {
    return this.playerForm.controls;
  }

  onCancel(): void {
    this.router.navigate(['/players']);
  }

  onSubmit(): void {
    if (this.playerForm.valid) {
      const {
        playerName,
        playerTeam,
        playerHeight,
        playerWeight,
        playerDescription,
        playerPhoto
      } = this.playerForm.value;
      console.log(this.playerForm.value);
     
      this.playerService
        .createPlayer(
          playerName!,
          playerTeam!,
          playerHeight!,
          playerWeight!,
          playerDescription!,
          playerPhoto!

        )
        .subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Creating player failed', err);
          },
        });
    }
  }
}
