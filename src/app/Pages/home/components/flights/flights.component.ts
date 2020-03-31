import { HomePage } from "./../../home.page";
import { map, tap } from "rxjs/operators";
import { HomePageData } from "./../../../../shared/interface";
import { Observable, of } from "rxjs";
import { HomeDataService } from "./../../services/home-data.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonDatetime } from "@ionic/angular";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "trav-flights",
  templateUrl: "./flights.component.html",
  styleUrls: ["./flights.component.scss"],
  providers: [DatePipe]
})
export class FlightsComponent implements OnInit {
  flightForm: FormGroup;
  destSearch$: Observable<HomePageData[]>;
  timeout;
  departVal: HomePageData;
  destVal: HomePageData;
  departSearch$: Observable<HomePageData[]>;

  constructor(
    private form: FormBuilder,
    private datepipe: DatePipe,
    private router: Router,
    private homeDataServ: HomeDataService
  ) {}

  ngOnInit() {
    this.flightForm = this.form.group({
      departure: ["", Validators.compose([Validators.required])],
      destination: ["", Validators.compose([Validators.required])],
      departDate: ["", Validators.compose([Validators.required])],
      returnDate: ["", Validators.compose([Validators.required])],
      travelers: ["", Validators.compose([Validators.required])],
      travelClass: ["Economy", Validators.compose([Validators.required])]
    });
    this.homeDataServ.homeStoreData$;
  }

  openPicker(event: MouseEvent, datePicker: IonDatetime) {
    event.preventDefault();
    event.stopImmediatePropagation();
    datePicker.open();
  }

  departDateChange(datepicker: IonDatetime) {
    const dateString = this.datepipe.transform(datepicker.value, "E, MMM yy");
    this.flightForm.controls.departDate.patchValue(dateString);
  }

  returnDateChange(datepicker: IonDatetime) {
    const dateString = this.datepipe.transform(datepicker.value, "E, MMM yy");
    this.flightForm.controls.returnDate.patchValue(dateString);
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.router.navigate(["/search"]);
  }

  // searchDeparture(event) {
  //   this.search(event, this.departSearch$);
  // }
  searchDest(event) {
    const val = event.target.value.toLowerCase();
    if (!val) {
      this.destSearch$ = of(null);
      event.preventDefault();
      return false;
    }
    if (val.length < 2) {
      return false;
    }
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.destSearch$ = this.searchResult(val);
    }, 500);
  }

  searchDeparture(event) {
    const val = event.target.value.toLowerCase();
    if (!val) {
      this.departSearch$ = of(null);
      event.preventDefault();
      return false;
    }
    if (val.length < 2) {
      return false;
    }
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.departSearch$ = this.searchResult(val);
    }, 500);
  }

  searchResult(val) {
    return this.homeDataServ.homeStoreData$.pipe(
      filter(res => !!res),
      map(res =>
        res.filter(
          ({ city, name, code }) =>
            (!!code && code.toLowerCase().includes(val)) ||
            (!!city && city.toLowerCase().includes(val)) ||
            (!!name && val.includes(name.toLowerCase()))
        )
      ),
      map(res => res.slice(0, 5))
    );
  }
  itemString(item) {
    return `(${item.code}) ${!!item.name ? item.name : ""} ${
      !!item.country ? item.country : ""
    }`;
  }

  setValue(item, control) {
    this.flightForm.get(control).patchValue(this.itemString(item));
    this.departVal = item;
    if (control == "destination") this.destSearch$ = of(null);
    else this.departSearch$ = of(null);
    this.flightForm.get(control).updateValueAndValidity();
  }
}
