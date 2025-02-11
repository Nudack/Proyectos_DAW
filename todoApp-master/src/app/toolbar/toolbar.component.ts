import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  currentView: 'calculadora' | 'gifsapp' = 'calculadora';

  setView(view: 'calculadora' | 'gifsapp') {
    this.currentView = view;
  }
}

