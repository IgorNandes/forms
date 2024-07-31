import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campo-controle-erro',
  templateUrl: './campo-controle-erro.component.html',
  styleUrl: './campo-controle-erro.component.css'
})
export class CampoControleErroComponent implements OnInit {

@Input() mostrarErro: any;
@Input() msgErro: any;

  constructor() { } 

  ngOnInit() {

}
}
