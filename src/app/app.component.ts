import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'SecretlyAngular';


  constructor(updates: SwUpdate) {
    updates.available.subscribe(data => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }


  defferedPrompt;

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', evt => {
      evt.preventDefault();
      this.defferedPrompt = evt;
      this.defferedPrompt.prompt();
    });
  }

  ngAfterViewChecked(): void {
  }
}
