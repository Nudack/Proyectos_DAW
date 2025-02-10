import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { HomePageComponent } from "./pages/home/home-page/home-page.component"
import { CardListComponent } from "./components/card-list/card-list.component"
import { SearchBoxComponent } from "./components/search-box/search-box.component"

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [HomePageComponent, CardListComponent, SearchBoxComponent],
  exports: [HomePageComponent],
})
export class GifsModule {}
