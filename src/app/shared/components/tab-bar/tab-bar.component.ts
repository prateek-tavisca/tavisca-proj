import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  forwardRef,
  AfterContentInit
} from "@angular/core";
import { TabButtonComponent } from "../tab-button/tab-button.component";

@Component({
  selector: "trav-tab-bar",
  templateUrl: "./tab-bar.component.html",
  styleUrls: ["./tab-bar.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabGroupComponent),
      multi: true
    }
  ],
  host: {
    "[class.tab-bar-fixed]": "isFixedTab"
  }
})
export class TabGroupComponent
  implements AfterContentInit, AfterViewInit, ControlValueAccessor {
  @ContentChildren(TabButtonComponent) tabButtons: QueryList<
    TabButtonComponent
  >;

  @Input() isFixedTab = true;
  @Input() disable: boolean;
  @Output() tabChanged = new EventEmitter<string>();
  @Input() value: string;

  // Function to call when the rating changes.
  onChange = (val: string) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(val: string): void {
    if (val && val != this.value) {
      this.value = val;
      this.UpdateButtons();
      this.onChange(this.value);
      this.tabChanged.emit(this.value);
    }
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  private btnSelected(button: TabButtonComponent) {
    button.tabSelected.subscribe(val => {
      const checked = this.tabButtons.find(b => b.value === val);
      // if (checked) {
      //   this.value = checked.value;
      // }
      this.writeValue(checked.value);
    });
  }

  private UpdateButtons() {
    this.tabButtons.forEach(
      button => (button.checked = button.value === this.value)
    );
  }

  constructor() {}

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.value == null) {
      const checked = this.tabButtons.find(b => b.checked);
      if (checked) {
        this.writeValue(checked.value);
      } else {
        this.writeValue(this.tabButtons.first.value);
      }
    }
  }

  ngAfterViewInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

    this.tabButtons.forEach(button => this.btnSelected(button));
  }
}
