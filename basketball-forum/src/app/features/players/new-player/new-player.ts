import { Component, inject, signal } from '@angular/core';
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

  loading = signal(false);
  errorMessage = signal<string | null>(null);

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
    playerPhoto: [
      '',
      [Validators.required, Validators.pattern(/^https?:\/\//)],
    ],
  });

  get f() {
    return this.playerForm.controls;
  }

  onCancel(): void {
    this.router.navigate(['/players']);
  }

  onSubmit(): void {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return;
    }

    const {
      playerName,
      playerTeam,
      playerHeight,
      playerWeight,
      playerDescription,
      playerPhoto,
    } = this.playerForm.value;

    this.loading.set(true);
    this.errorMessage.set(null);

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
          this.loading.set(false);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set('Failed to create player. Please try again.');
          console.error('Creating player failed', err);
        },
      });
  }
}

