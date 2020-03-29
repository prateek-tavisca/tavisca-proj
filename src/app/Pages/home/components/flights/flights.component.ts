import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "trav-flights",
  templateUrl: "./flights.component.html",
  styleUrls: ["./flights.component.scss"]
})
export class FlightsComponent implements OnInit {
  flightForm: FormGroup;
  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.flightForm = this.form.group({
      departure: ["", Validators.compose([Validators.required])],
      destination: ["", Validators.compose([Validators.required])],
      departDate: ["", Validators.compose([Validators.required])],
      returnDate: ["", Validators.compose([Validators.required])],
      travelers: ["", Validators.compose([Validators.required])],
      travelClass: ["", Validators.compose([Validators.required])]
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
