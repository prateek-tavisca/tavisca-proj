import { ModalController } from "@ionic/angular";
import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"]
})
export class SortComponent implements OnInit {
  sort: FormControl;
  constructor(public modal: ModalController) {}

  ngOnInit() {
    this.sort = new FormControl(["", Validators.required]);
  }

  goBack() {
    this.modal.dismiss();
  }

  onSubmit() {
    const sort = this.sort.valid ? this.sort.value : null;
    this.modal.dismiss({ sort });
  }
}
