import { DatePipe } from "@angular/common";
import { Flight } from "./../../interface";
import { Component, OnInit, Input } from "@angular/core";
import timeDiffCalc from "src/app/shared/utils";

@Component({
  selector: "app-flight-list",
  templateUrl: "./flight-list.component.html",
  styleUrls: ["./flight-list.component.scss"],
  providers: [DatePipe]
})
export class FlightListComponent implements OnInit {
  @Input() flight: Flight;
  src: string;
  updatedFlight;
  timeString;
  constructor() {}

  ngOnInit() {
    this.src = `./assets/airline/${this.flight.airline_logo}.svg`;
    this.updatedFlight = {
      ...this.flight,
      stops: new Array(this.flight.stops)
    };
    this.timeString = timeDiffCalc(
      new Date(this.flight.departure_time),
      new Date(this.flight.arrival_time)
    );
  }

  calculatedStyles(i) {
    return { left: 100 / i + 2 + "%" };
  }
}
