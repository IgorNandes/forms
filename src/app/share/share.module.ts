import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControleErroComponent } from './campo-controle-erro/campo-controle-erro.component';
import { DropdownService } from './services/dropdown.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControleErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,
    CampoControleErroComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  providers: [DropdownService],
})
export class ShareModule { }
