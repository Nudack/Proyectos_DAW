
import { Component, Input } from "@angular/core"
import type { Gif } from "../../interfaces/gifs.interfaces"

@Component({
  selector: "gifs-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css"],
})
export class CardListComponent {
  @Input() gifs: Gif[] = []

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
  }
}
