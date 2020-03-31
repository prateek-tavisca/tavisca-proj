import { CardComponent } from "./components/card/card.component";
import { InputComponent } from "./../shared/components/input/input.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputDatetimeComponent } from "./components/input-datetime/input-datetime.component";
import { TabButtonComponent } from "./components/tab-button/tab-button.component";
import { TabGroupComponent } from "./components/tab-bar/tab-bar.component";
import { RadioButtonComponent } from "./components/radio-button/radio-button.component";
import { RadioGroupComponent } from "./components/radio-group/radio-group.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    InputComponent,
    InputDatetimeComponent,
    TabButtonComponent,
    TabGroupComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    CardComponent
  ],
  exports: [
    CardComponent,
    InputComponent,
    InputDatetimeComponent,
    TabButtonComponent,
    TabGroupComponent,
    RadioButtonComponent,
    RadioGroupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
