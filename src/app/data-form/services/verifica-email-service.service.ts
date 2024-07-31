import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string) {
    return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        delay(3000),
        map((dados: any) => dados.emails),
        // tap(console.log),
        map((dados: any) => dados.filter((v:any) => v.email === email)),
        // tap(console.log),
        map((dados: any) => dados.length > 0 )
        // tap(console.log)
      );
  }
}
