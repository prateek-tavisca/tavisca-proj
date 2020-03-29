import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "trav-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type: inputType = "text";
  constructor() {}

  ngOnInit() {}
}

type inputType = "text" | "email" | "date";
