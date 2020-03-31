import { NavController, ModalController } from "@ionic/angular";
import { FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-traveller",
  templateUrl: "./traveller.component.html",
  styleUrls: ["./traveller.component.scss"]
})
export class TravellerComponent implements OnInit {
  public formData: FormGroup;
  @Input() adult: number;
  @Input() child: number;
  @Input() infant: number;
  constructor(
    private fb: FormBuilder,
    private nav: NavController,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.formData = this.fb.group({
      adult: [this.adult, Validators.required],
      child: [this.child],
      infant: [this.infant]
    });
  }

  goBack() {
    this.modal.dismiss();
  }

  onSubmit() {
    this.modal.dismiss({
      ...this.formData.value
    });
  }

  plusButton(isAdult, isChild, isInfant) {
    if (isAdult) this.formData.controls.adult.patchValue(++this.adult);
    else if (isChild) this.formData.controls.child.patchValue(++this.child);
    else if (isInfant) this.formData.controls.infant.patchValue(++this.infant);
    else return false;
  }
  minusButton(isAdult, isChild, isInfant) {
    if (isAdult) this.formData.controls.adult.patchValue(--this.adult);
    else if (isChild) this.formData.controls.child.patchValue(--this.child);
    else if (isInfant) this.formData.controls.infant.patchValue(--this.infant);
    else return false;
  }
}
