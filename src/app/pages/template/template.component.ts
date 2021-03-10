import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Cristian',
    apellido: 'Reyes',
    email: 'a@a.cl',
    pais: 'CHL',
    sexo: 'M'
  }
  paises: any[]=[];

  constructor(private pais: PaisService) { }

  ngOnInit(): void {

    this.pais.getPaises()
    .subscribe( res => {
      this.paises = res;
      this.paises.unshift(
        {
          nombre:' [seleccione un pais] ',
          codigo:''
        }
      )
      console.log(res);
            
    });

  }

  // tslint:disable-next-line:typedef
  guardar(forma: NgForm) {

    if( forma.invalid ){

      Object.values(forma.controls).forEach(control => {
        control.markAllAsTouched();        
      });

      return;
    }

    this.usuario = forma.value;

    console.log('submit =>', this.usuario);
  }

}
