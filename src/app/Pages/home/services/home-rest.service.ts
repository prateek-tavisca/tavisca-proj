import { Airport, City, Country } from "./../../../shared/interface";
import { Injectable } from "@angular/core";
import { RestApiService } from "src/app/core/rest-api.service";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HomeRestApiService {
  constructor(private rest: RestApiService) {}

  fetchAirports() {
    return this.rest
      .get<Airport[]>("assets/apis-json/airports")
      .pipe(shareReplay());
  }
  fetchCities() {
    return this.rest.get<City[]>("assets/apis-json/cities").pipe(shareReplay());
  }
  fetchCountries() {
    return this.rest
      .get<Country[]>("assets/apis-json/countries")
      .pipe(shareReplay());
  }
}
