import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  forwardRef,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: "trav-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "trav-float-input"
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @ViewChild("inputLable", { static: true }) inputLabel: ElementRef;
  @Input() label: string;
  @Input() type: inputType = "text";
  @Input() value: string;
  @Input() disabled = false;
  @Output() input = new EventEmitter<MouseEvent>();
  @Output() change = new EventEmitter<MouseEvent>();
  @Input() isListBox = false;
  @Input() listId: string;

  // Function to call when the rating changes.
  onChange = (val: string) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(val: string): void {
    if (!!val) {
      this.value = val;
      this.renderer.addClass(
        this.inputLabel.nativeElement,
        "trav-input__focus"
      );
      this.onChange(this.value);
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
    this.disabled = isDisabled;
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}
  onInput(event) {
    // event.preventDefault();
    this.onChangeFn(event);
    this.input.emit(event);
  }
  changeFn(event) {
    this.onChangeFn(event);
    this.change.emit(event);
  }
  onChangeFn(event) {
    this.writeValue(event.target.value);
  }
}

type inputType = "text" | "email" | "date";
