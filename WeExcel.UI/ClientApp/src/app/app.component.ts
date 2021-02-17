import { Component } from '@angular/core';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-app';
  version = '';

  constructor(private environmentService: EnvironmentService) {
    this.version = this.environmentService.version;
  }
}
