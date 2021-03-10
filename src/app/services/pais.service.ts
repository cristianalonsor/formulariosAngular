import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises() {

    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(map((resp: any[]) => { //este map me permite transformar la data recibida 
        return resp.map(pais => ({ nombre: pais.name, codigo: pais.alpha3Code }) // este es el map de los arreglos
        )
      }));
  }

}
