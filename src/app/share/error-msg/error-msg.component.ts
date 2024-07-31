import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../services/form-validations.service';


@Component({
  selector: 'app-error-msg',
  standalone: false,
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent {

  @Input() mostrarErro: any;
  @Input() msgErro: any;

  // @Input() msgErro: string;
  // @Input() mostrarErro: boolean;

  @Input() control: any;
  @Input() label: any;

  constructor() {
   }

  ngOnInit() {
  }

  get errorMessage() {

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
          return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
        }
    }

    return null;
  }

}
