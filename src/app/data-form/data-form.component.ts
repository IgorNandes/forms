import { Cidade } from './../share/models/cidades';
import { DropdownService } from './../share/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadosBr } from '../share/models/estados-br';
import { ConsultaCepService } from '../share/services/consulta-cep.service';
import { distinct, distinctUntilChanged, map, Observable, tap, switchMap, EMPTY, of } from 'rxjs';
import { FormValidations } from '../share/services/form-validations.service';
import { VerificaEmailService } from './services/verifica-email-service.service';
import { BaseFormComponent } from '../share/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario: FormGroup = new FormGroup({});
  estados?: EstadosBr[];
  cidade?: Cidade[];
  //estados!: Observable<EstadosBr[]>;
  newsoptions!: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Ember'];

  constructor
  (private formBuilder: FormBuilder, private http: HttpClient, 
    private dropDown: DropdownService, private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService) {
      super();
     }

  ngOnInit() {
    //this.estados = this.dropDown.getEstadosBr();
    this.newsoptions = this.dropDown.getNews();
    //this.verificaEmailService.verificarEmail('').subscribe();

     this.dropDown.getEstadosBr()
     .subscribe((dados:any) => {
       this.estados = dados;
     });

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // endereco: new FormGroup({
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email], this.validarEmail.bind(this)],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      }),
        news: ['s'],
        termos: [null, Validators.pattern('true')],
        frameworks:this.buildFrameworks()

    });

    this.formulario.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(value => console.log('status CEP:', value)),
      switchMap(status => status === 'VALID' ?
        this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
        : EMPTY
      )
    )
    .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados?.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : 9),
        switchMap((estadoId: number) => this.dropDown.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe(cidades => this.cidade = cidades);
  }
  buildFrameworks() {
    const min = 1;
    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values, FormValidations.minSelectedCheckboxes(min));

    
    // this.formBuilder.array( [
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
      
    // ]);
  }

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v:any, i:any) => v ? this.frameworks[i] : null)
      .filter((v:any) => v !== null)
    });

    console.log(valueSubmit);

      this.http
      .post('https://httpbin.org/post', JSON.stringify({}))
      .subscribe(dados => {
          console.log(dados)
          //reseta o formulário
          //this.resetar();
        },
        (error: any) => alert('erro'));
  }

  // verificaValidacoesForm(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(campo => {
  //     const controle = formGroup.get(campo);
  //     controle?.markAsTouched();
  //     if (controle instanceof FormGroup) {
  //       this.verificaValidacoesForm(controle);
  //     }
  //   })
  //}

  // resetar() {
  //   this.formulario.reset();
  // }

  // verificaValidTouched(campo: string): boolean {
  //   const control = this.formulario.get(campo);
  //   return control ? !control.valid && control.touched : false;
  // }

  // aplicaCssErro(campo: string) {
  //   return {
  //     'has-error': this.verificaValidTouched(campo),
  //     'has-feedback': this.verificaValidTouched(campo)
  //   }
  // }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;
    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe((dados: any) => this.populaDadosForm(dados));;
    }
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }


  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

}
