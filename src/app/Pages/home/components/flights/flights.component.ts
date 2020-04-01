import { map } from "rxjs/operators";
import { HomePageData } from "./../../../../shared/interface";
import { Observable, of } from "rxjs";
import { HomeDataService } from "./../../services/home-data.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonDatetime, ModalController } from "@ionic/angular";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { TravellerComponent } from "../traveller/traveller.component";

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
  departDateVal: string;
  returnDateVal: string;
  departSearch$: Observable<HomePageData[]>;
  travelerData = { adult: 1, child: 0, infant: 0 };
  min = new Date().toISOString();

  constructor(
    private form: FormBuilder,
    private datepipe: DatePipe,
    private router: Router,
    private homeDataServ: HomeDataService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.flightForm = this.form.group({
      departure: ["", Validators.compose([Validators.required])],
      destination: ["", Validators.compose([Validators.required])],
      departDate: ["", Validators.compose([Validators.required])],
      returnDate: ["", Validators.compose([Validators.required])],
      travelers: ["1 Adult", Validators.compose([Validators.required])],
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
    this.departDateVal = datepicker.value;
    const dateString = this.datepipe.transform(datepicker.value, "E, MMM dd");
    this.flightForm.controls.departDate.patchValue(dateString);
  }

  returnDateChange(datepicker: IonDatetime) {
    this.returnDateVal = datepicker.value;
    const dateString = this.datepipe.transform(datepicker.value, "E, MMM dd");
    this.flightForm.controls.returnDate.patchValue(dateString);
  }

  onSubmit(form: FormGroup) {
    const formData = {
      departure: this.departVal.city_code,
      destination: this.destVal.city_code,
      departDate: this.departDateVal,
      returnDate: this.returnDateVal,
      travelers: this.travelerData,
      travelClass: this.flightForm.controls.travelClass.value
    };
    this.router.navigate(["/search"], {
      queryParams: { data: JSON.stringify(formData) }
    });
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
    if (control == "destination") {
      this.destSearch$ = of(null);
      this.destVal = item;
    } else {
      this.departVal = item;
      this.departSearch$ = of(null);
    }
    this.flightForm.get(control).updateValueAndValidity();
  }

  async openModal(event) {
    const modal = await this.modal.create({
      component: TravellerComponent,
      componentProps: {
        ...this.travelerData
      }
    });
    await modal.present();
    this.onModalDismiss(modal);
    return modal;
  }

  onModalDismiss(modal: HTMLIonModalElement, isSort = false) {
    modal.onDidDismiss().then(result => {
      this.travelerData = result.data;
      const { adult, infant, child } = this.travelerData;
      let formString = "";
      if (adult) formString += `${adult} Adult`;
      if (child) formString += `,${child} Child`;
      if (infant) formString += `,${child} Infant`;
      this.flightForm.controls.travelers.patchValue(formString);
    });
  }
}
