import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor(){}

  existeUsuario( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {

    //  si no existe un valor retorna altiro el null, solo evalua el valor del campo
    if ( !control.value ){
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {

      setTimeout( () => {
        if ( control.value === 'cristian' ){
          resolve({ existe: true});
        } else {
          resolve(null);
        }
      }, 3000);

    });

  }

  noValido( control: FormControl ): ErrorValidate {
    if ( control.value?.toLowerCase() === 'Cristian'){
      return {
        noValido: true
      };
    }

    return null;
  }

  passwordsIguales( pass1Name: string, pass2Name: string ){

    // retorna una funcion que recibe como parametro el formulario en el cual se ejecuta
    return ( control: AbstractControl ): ValidationErrors | null => {

      const pass1Control = control.get(pass1Name)?.value;
      const pass2Control = control.get(pass2Name)?.value;

      if ( pass1Name !== pass2Name ){

        control.get(pass2Name)?.setErrors({ noIguales: true });
        return {NoIguales: true};
      }
      return null;
    };

  }

}
