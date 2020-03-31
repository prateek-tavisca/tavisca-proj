import { Flight } from "./../interface";
import { SearchRestApiService } from "./search-rest.service";
import { map, takeUntil } from "rxjs/operators";
import { Observable, Subject, BehaviorSubject, of } from "rxjs";
import { Injectable } from "@angular/core";

class SearchPageState {
  flights: Flight[] = [];
}
@Injectable({
  providedIn: "root"
})
export class SearchDataStoreService {
  public searchStoreData$: Observable<SearchPageState[]>;
  private _unSubscribe$ = new Subject();
  private _state$: BehaviorSubject<SearchPageState>;
  public state$: Observable<SearchPageState>;

  private get state(): SearchPageState {
    return this._state$.getValue();
  }

  private setState(nextState: SearchPageState): void {
    this._state$.next(nextState);
  }

  constructor(public searchRest: SearchRestApiService) {
    this._state$ = new BehaviorSubject(new SearchPageState());
    this.state$ = this._state$.asObservable() as Observable<SearchPageState>;
  }

  getFlights(payload) {
    this.searchRest
      .fetchFlights(payload)
      .pipe(
        map(res => {
          const state = { ...this.state, flights: [...res] };
          return this.setState(state);
        }),
        takeUntil(this._unSubscribe$)
      )
      .subscribe();
  }
}
