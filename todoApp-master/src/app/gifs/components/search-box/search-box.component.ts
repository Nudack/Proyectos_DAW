import { Component, type ElementRef, ViewChild } from "@angular/core"
import { GifsService } from "src/app/gifs/services/gifs.service"

@Component({
  selector: "gifs-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.css"],
})
export class SearchBoxComponent {
  @ViewChild("searchInput") searchInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) {}

  searchGifs() {
    const query = this.searchInput.nativeElement.value.trim()
    if (query) {
      this.gifsService.searchGifs(query)
      this.searchInput.nativeElement.value = ""
    }
  }
}

