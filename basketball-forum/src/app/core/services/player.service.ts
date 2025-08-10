import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Player } from "../../models/player.model";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/api/themes';
  constructor(private httpClient: HttpClient) {}
  getPlayers(): Observable<Player[]> {
    return this.httpClient.get<Player[]>(this.apiUrl);
  }
  createPlayer(name: string, team: string, height: string, weight: string, description: string,photo: string): Observable<Player> {
    return this.httpClient
      .post<Player>(
        `${this.apiUrl}`,
        { name, team, height, weight, description, photo},
        {
          withCredentials: true,
        }
      )
      .pipe(tap((player) => console.log(player)));
  }
}