import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EstadosBr } from '../models/estados-br';
import { Cidade } from '../models/cidades';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): Observable<EstadosBr[]>{
    return this.http.get<EstadosBr[]>('assets/dados/estadosbr.json');
  }
  
  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      // tslint:disable-next-line:triple-equals
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );
  }

  getNews() {
    return [
      {value: 's', label: 'Sim'},
      {value: 'n', label: 'Não'}
    ];
  }

}
