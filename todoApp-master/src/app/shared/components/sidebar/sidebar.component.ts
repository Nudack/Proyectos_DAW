import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  get categories(): string[] {
    return this.gifsService.searchHistory
  }

  searchCategory(category: string): void {
    this.gifsService.searchGifs(category)
  }
}
