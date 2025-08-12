import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';
import { AuthService } from '../services/auth.service';

export const authOwner: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const playerService = inject(PlayerService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const playerId = route.paramMap.get('id'); // or 'playerId' depending on your route param name
  const currentUser = authService.currentUser();

  // console.log('current user', currentUser);
  // console.log('playerId', playerId);
  
  

  if (!currentUser) {
    // Not logged in, redirect to login
    router.navigate(['/login']);
    return of(false);
  }

  if (!playerId) {
    // No playerId in route params, block access
    router.navigate(['/players']);
    return of(false);
  }

  return playerService.getPlayer(playerId).pipe(
    map((player) => {
    //  console.log(player.userId);
      
      if (player.userId._id === currentUser.id) {
        return true; // Allow if current user is the owner
      } else {
        router.navigate(['/players']); // Redirect if not owner
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/players']); // On error, block access
      return of(false);
    })
  );
};
