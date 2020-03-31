import { Country, Airport, City } from "./../../../shared/interface";
import { HomeRestApiService } from "./home-rest.service";
import { map, takeUntil } from "rxjs/operators";
import { Observable, Subject, BehaviorSubject, of } from "rxjs";
import { Injectable } from "@angular/core";
import { HomePageData } from "src/app/shared/interface";

class HomePageState {
  cities: City[] = [];
  airports: Airport[] = [];
  countries: Country[] = [];
}
@Injectable({
  providedIn: "root"
})
export class HomeDataService {
  public homeStoreData$: Observable<HomePageData[]>;
  private _unSubscribe$ = new Subject();
  private _state$: BehaviorSubject<HomePageState>;
  public state$: Observable<HomePageState>;

  private get state(): HomePageState {
    return this._state$.getValue();
  }

  private setState(nextState: HomePageState): void {
    this._state$.next(nextState);
  }

  constructor(public homeRest: HomeRestApiService) {
    this._state$ = new BehaviorSubject(new HomePageState());
    this.state$ = this._state$.asObservable() as Observable<HomePageState>;
    this.getAirports();
    this.getCountries();
    this.getCities();
    this.homeStoreData$ = this.state$.pipe(
      map(({ airports, cities, countries }) =>
        this.getHomeData(airports, cities, countries)
      )
    );
  }

  getAirports() {
    this.homeRest
      .fetchAirports()
      .pipe(
        map(res => {
          const state = { ...this.state, airports: [...res] };
          return this.setState(state);
        }),
        takeUntil(this._unSubscribe$)
      )
      .subscribe();
  }
  getCities() {
    this.homeRest
      .fetchCities()
      .pipe(
        map(res => {
          const state = { ...this.state, cities: [...res] };
          return this.setState(state);
        }),
        takeUntil(this._unSubscribe$)
      )
      .subscribe();
  }
  getCountries() {
    this.homeRest.fetchCountries().pipe(
      map(res => {
        const state = { ...this.state, countries: [...res] };
        return this.setState(state);
      }),
      takeUntil(this._unSubscribe$)
    );
  }

  getHomeData(airports: Airport[], cities: City[], countries: Country[]) {
    return airports.map(airport => {
      let city: City | string = cities.find(c => c.code === airport.city_code);
      let country: Country | string = countries.find(
        c => c.code === airport.country_code
      );
      city = !!city ? city.name_translations.en : null;
      country = !!country ? country.name_translations.en : null;
      return { ...airport, city, country } as HomePageData;
    });
  }
}
