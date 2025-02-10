import { Component } from '@angular/core';

import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor( 
    private gifsService: GifsService,
  ) {}

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
  }
  
}
