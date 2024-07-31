import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: 'templateForm', component: TemplateFormComponent },
  { path: 'dataForm', component: DataFormComponent },
  { path: '', pathMatch: 'full', redirectTo: '/dataForm' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
