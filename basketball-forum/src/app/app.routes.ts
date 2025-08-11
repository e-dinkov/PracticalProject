import { NOT_FOUND } from '@angular/core/primitives/di';
import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((c) => c.Register),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile').then((c) => c.Profile),
  },
  {
    path: 'create-player',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/new-player/new-player').then(
        (c) => c.NewPlayer
      ),
  },
  {
    path: 'players',

    loadComponent: () =>
      import('./features/players/players-board/players-board').then(
        (c) => c.PlayersBoard
      ),
  },
  {
    path: '**',
    component: NotFound,
  },
];
