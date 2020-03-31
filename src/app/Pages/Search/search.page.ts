import { FiltersComponent } from "./components/filters/filters.component";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";

@Component({
  selector: "app-search",
  templateUrl: "search.page.html",
  styleUrls: ["search.page.scss"]
})
export class SearchPage {
  sortBy = {};
  filterBy = {};

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public modalController: ModalController,
    public nav: NavController
  ) {}
  openFilterModal() {
    const filterNodal = this.presentModal(FiltersComponent);
  }

  async presentModal(compObj, ...props) {
    const modal = await this.modalController.create({
      component: compObj,
      componentProps: {
        ...props
      }
    });
    await modal.present();
    this.onModalDismiss(modal);
    return modal;
  }

  onModalDismiss(modal: HTMLIonModalElement, isSort = false) {
    modal.onDidDismiss().then(result => {
      if (result && !isSort) {
        this.filterBy = {
          ...result
        };
      } else if (result && isSort) {
        this.sortBy = {
          ...result
        };
      } else {
        return true;
      }
    });
  }

  goBack() {
    this.nav.navigateBack(["/home"]);
  }
}
