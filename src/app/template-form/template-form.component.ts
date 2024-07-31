import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConsultaCepService } from '../share/services/consulta-cep.service';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent implements OnInit {

  

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form:  NgForm) {
    console.log(form);

    //console.log(this.usuario);

    //this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    //.pipe(
    //  map((res: any) => res))
    //.subscribe(res => {
    //  console.log(res);
    //});
  }

  constructor(private http: HttpClient, private cepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo:any){
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo:any){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: any, form:any)
  {
    cep = cep.replace(/\D/g, '');
    if(cep != null && cep !== '')
    {
      this.cepService.consultaCEP(cep)!.subscribe((dados: any) => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados:any, form:any)
  {
    // form.setValue({
    //   nome: form.value.nome,
    //   email: form.value.email
    // })

    form.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }})
  }

  resetaDadosForm(form:any)
  {
    form.form.patchValue({
      endereco: {
        rua: null,  
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

}
