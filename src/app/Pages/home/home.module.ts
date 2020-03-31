import { TravellerComponent } from "./components/traveller/traveller.component";
import { HomeDataService } from "./services/home-data.service";
import { HomeRestApiService } from "./services/home-rest.service";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { FlightsComponent } from "./components/flights/flights.component";

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
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, FlightsComponent, TravellerComponent],
  entryComponents: [TravellerComponent]
})
export class HomePageModule {}
