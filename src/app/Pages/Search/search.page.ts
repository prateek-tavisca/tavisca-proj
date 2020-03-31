import { Flight } from "./interface";
import { filter } from "rxjs/operators";
import { SearchDataStoreService } from "./services/search-data-store.service";
import { SortComponent } from "./components/sort/sort.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";

@Component({
  selector: "app-search",
  templateUrl: "search.page.html",
  styleUrls: ["search.page.scss"]
})
export class SearchPage implements OnInit {
  homeData;
  flights;
  SelectedSortCriteria: string;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public modalController: ModalController,
    public nav: NavController,
    public searchData: SearchDataStoreService
  ) {}

  ngOnInit(): void {
    const { data } = this.activeRoute.snapshot.queryParams;
    this.homeData = JSON.parse(data);
    this.searchData.getFlights(this.homeData);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.searchData.state$.subscribe(data => (this.flights = data.flights));
  }
  openFilterModal() {
    const filtermodal = this.presentModal(
      FiltersComponent,
      this.SelectedSortCriteria
    );
    this.onModalDismiss(filtermodal);
  }

  openSortModal() {
    const sortModal = this.presentModal(SortComponent);
    this.onModalDismiss(sortModal, true);
  }

  async presentModal(compObj, ...props) {
    const modal = await this.modalController.create({
      component: compObj,
      componentProps: {
        ...props
      }
    });
    await modal.present();
    return modal;
  }

  async onModalDismiss(modal: Promise<HTMLIonModalElement>, isSort = false) {
    (await modal).onDidDismiss().then(result => {
      console.log(result);
      if (result && !isSort) {
        this;
      } else if (result && isSort) {
        this.sort(result.data.sort);
      } else {
        return true;
      }
    });
  }

  goBack() {
    this.nav.navigateBack(["/home"]);
  }

  sort(order: string) {
    const typeOrder = order.includes("-") ? order.split("-") : null;
    if (!!typeOrder && typeOrder[0] === "price") {
      this.flights.sort(
        typeOrder[1] === "asc" ? this.ascendingPrice : this.descendingPrice
      );
    } else {
      this.flights.sort(
        typeOrder[1] === "asc"
          ? this.ascendingDuration
          : this.descendingDuration
      );
    }
  }
  ascendingPrice(a: Flight, b: Flight) {
    if (!a || !b) return false;
    if (!a.best_fare || !b.best_fare) return false;
    return a.best_fare.price - b.best_fare.price;
  }
  descendingPrice(a: Flight, b: Flight) {
    if (!a || !b) return false;
    if (!a.best_fare || !b.best_fare) return false;
    return b.best_fare.price - a.best_fare.price;
  }

  ascendingDuration(a: Flight, b: Flight) {
    if (!a || !b) return false;
    let DateA = new Date(a.arrival_time) as any;
    let DateB = new Date(a.departure_time) as any;
    const diffInMilSecA = Math.abs(DateA - DateB) / 1000;
    DateA = new Date(b.arrival_time) as any;
    DateB = new Date(b.departure_time) as any;
    const diffInMilSecB = Math.abs(DateA - DateB) / 1000;
    return diffInMilSecA - diffInMilSecB;
  }
  descendingDuration(a: Flight, b: Flight) {
    if (!a || !b) return false;
    let DateA = new Date(a.arrival_time) as any;
    let DateB = new Date(a.departure_time) as any;
    const diffInMilSecA = Math.abs(DateA - DateB) / 1000;
    DateA = new Date(b.arrival_time) as any;
    DateB = new Date(b.departure_time) as any;
    const diffInMilSecB = Math.abs(DateA - DateB) / 1000;
    return diffInMilSecB - diffInMilSecA;
  }
}
