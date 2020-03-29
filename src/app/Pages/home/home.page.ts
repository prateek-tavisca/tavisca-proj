import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  segment = "hotel";
  constructor(public router: Router, public activeRoute: ActivatedRoute) {}

  navigate() {}
  onTabChange(val) {
    this.segment = val;
  }
}
