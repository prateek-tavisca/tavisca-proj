import { HomePageData } from "src/app/shared/interface";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeDataService } from "./services/home-data.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  segment;
  data: HomePageData;
  constructor(public router: Router, public activeRoute: ActivatedRoute) {}

  navigate() {}

  onTabChange(val) {
    this.segment = val;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.homeDataServ.homeStoreData$
  }
}
