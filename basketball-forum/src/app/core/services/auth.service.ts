import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ApiUser } from '../../models/api-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private _isLoggedIn = signal<boolean>(false);
  private _currentUser = signal<User | null>(null);

  public isLoggedIn = this._isLoggedIn.asReadonly();
  public currentUser = this._currentUser.asReadonly();
  constructor(private httpClient: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this._currentUser.set(JSON.parse(savedUser));
      this._isLoggedIn.set(true);
    }
  }
  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<ApiUser>(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((apiUser) => this.mapApiUserToUser(apiUser)),
        tap((user) => {
          this._currentUser.set(user);
          this._isLoggedIn.set(true);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }
  logout(): Observable<void> {
    return this.httpClient
      .post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this._currentUser.set(null);
          this._isLoggedIn.set(false);
          localStorage.removeItem('currentUser');
        })
      );
  }
  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
    phone: string
  ): Observable<User> {
    return this.httpClient
      .post<ApiUser>(
        `${this.apiUrl}/register`,
        { username, email, password, rePassword, tel: phone },
        { withCredentials: true }
      )
      .pipe(
        map((apiUser) => this.mapApiUserToUser(apiUser)),
        tap((user) => {
          this._currentUser.set(user);
          this._isLoggedIn.set(true);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }
  getCurrentUser(): string | null {
    return this._currentUser()?.id || null;
  }
  updateUser(user: User): Observable<User> | any {
    const apiUser = <ApiUser>{
      _id: user.id,
      username: user.username,
      email: user.email,
      tel: user.phone,
    };
    console.log(apiUser);
    
    
       return this.httpClient
      .put<ApiUser>(`${this.apiUrl}/users/profile`, apiUser, { withCredentials: true })
      .pipe(
        map((apiUser) => this.mapApiUserToUser(apiUser)),
        tap((user) => {
          console.log(user);
          this._currentUser.set(user);
          this._isLoggedIn.set(true);
          localStorage.setItem('currentUser', JSON.stringify(user));
        },
        (error) => {
          console.error('Error updating user:', error);
        })
      );
    
   
  }
  private mapApiUserToUser(apiUser: ApiUser): User {
    return <User>{
      id: apiUser._id,
      username: apiUser.username,
      email: apiUser.email,
      phone: apiUser.tel,
    };
  }
}
