import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlayerService } from '../../../core/services/player.service';
import { Player } from '../../../models/player.model';

@Component({
  selector: 'app-player-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-edit.html',
  styleUrl: './player-edit.css',
})
export class PlayerEdit implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private playerService = inject(PlayerService);

  form!: FormGroup;
  playerId = signal<string>('');
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      team: ['', Validators.required],
      height: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      weight: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      photo: ['', [Validators.required,]],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.loading.set(false);
        this.errorMessage.set('Invalid player ID.');
        return;
      }
      this.playerId.set(id);

      this.playerService.getPlayer(id).subscribe({
        next: (player) => {
          if (player) {
            this.form.patchValue(player);
          }
          this.loading.set(false);
        },
        error: () => {
          this.errorMessage.set(
            'Failed to load player data. Please try again later.'
          );
          this.loading.set(false);
        },
      });
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, team, height, weight, description, photo } = this.form.value;
    this.playerService
      .editPlayer(
        this.playerId(),
        name,
        team,
        height,
        weight,
        description,
        photo
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/players', this.playerId()]);
        },
        error: () => {
          this.errorMessage.set('Failed to save changes. Please try again.');
        },
      });
  }
}

