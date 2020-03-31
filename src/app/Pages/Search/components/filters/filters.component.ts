import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  price: FormControl;
  duration: FormControl;
  constructor(public modal: ModalController) {}

  ngOnInit() {
    this.price = new FormControl(["", null]);
    this.duration = new FormControl(["", null]);
  }

  goBack() {
    this.modal.dismiss();
  }

  onSubmit() {
    this.modal.dismiss({
      price: this.price.value,
      duration: this.duration.value
    });
  }
}
