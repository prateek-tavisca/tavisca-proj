import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "trav-tab-button",
  templateUrl: "./tab-button.component.html",
  styleUrls: ["./tab-button.component.scss"],
  host: {
    class: "tab-button",
    "[class.tab-button-disabled]": "disabled",
    "[class.tab-button-checked]": "checked"
  }
})
export class TabButtonComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() checked: boolean;
  @Input() value: string;
  @Output() tabSelected = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onTabSelected(event) {
    this.checked = true;
    this.tabSelected.emit(this.value);
  }
}
