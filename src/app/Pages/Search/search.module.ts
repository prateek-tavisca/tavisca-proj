import { SortComponent } from "./components/sort/sort.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { SearchPage } from "./search.page";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlightListComponent } from "./components/flight-list/flight-list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        component: SearchPage
      }
    ])
  ],
  declarations: [
    SearchPage,
    FiltersComponent,
    SortComponent,
    FlightListComponent
  ],
  entryComponents: [FiltersComponent, SortComponent]
})
export class SearchPageModule {}
