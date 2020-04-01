import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormControl } from "@angular/forms";

const price_filter = {
  min: 2285.54,
  max: 4085.215,
  min_usd: 2285.54,
  max_usd: 4085.215
};
const booking_class = [
  { type: "economy", val: 2285.54, isChecked: false },
  { type: "bussiness", val: 3025.54, isChecked: false },
  { type: "Premium Business", val: 4485.54, isChecked: false }
];
@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  price: FormControl;
  flightClass: FormControl;
  @Input() checks;
  @Input() min;
  @Input() max;
  priceFilter;
  updatedPrice;
  constructor(public modal: ModalController) {}

  ngOnInit() {
    this.flightClass = new FormControl([""]);
    this.priceFilter = { ...price_filter };
    this.min = this.min ? this.min : this.priceFilter.min;
    this.max = this.max ? this.max : this.priceFilter.max;
    this.checks = [...booking_class];
  }

  goBack() {
    this.modal.dismiss();
  }
  change(event) {
    if (event && event.detail.value) {
      this.min = event.detail.value.lower;
      this.max = event.detail.value.upper;
    }
  }

  reset() {
    this.min = price_filter.min;
    this.max = price_filter.max;
    this.priceFilter = { ...price_filter };
    this.checks = this.checks.map(check => ({
      ...check,
      isChecked: false
    }));
  }

  onSubmit() {
    const classCheck = this.checks.filter(check => check.isChecked);
    this.updatedPrice = {
      min: this.min > this.priceFilter.min ? this.min : null,
      max: this.max < this.priceFilter.max ? this.max : null
    };
    classCheck.length > 0;
    const val = {
      price: {
        ...this.updatedPrice
      },
      travelClass: classCheck.length > 0 ? classCheck : null
    };

    this.modal.dismiss(val);
  }
}
