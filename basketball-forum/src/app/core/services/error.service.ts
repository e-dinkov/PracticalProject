import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _error = signal<string | null>(null);
  private _success = signal<string | null>(null);
  public error = this._error.asReadonly();
  public success = this._success.asReadonly();

  setError(error: string) {
    this._error.set(error);
    setTimeout(() => this._error.set(null), 3000);
  }
  constructor() {}
}
