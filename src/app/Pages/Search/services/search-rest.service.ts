import { Flight } from "./../interface";
import { Injectable } from "@angular/core";
import { RestApiService } from "src/app/core/rest-api.service";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SearchRestApiService {
  constructor(private rest: RestApiService) {}

  fetchFlights(payload) {
    return this.rest
      .post<Flight[]>("assets/apis-json/flights", payload)
      .pipe(shareReplay());
  }
}
