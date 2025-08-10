import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ErrorNotification } from './shared/components/error-notification/error-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'basketball-forum';
}
