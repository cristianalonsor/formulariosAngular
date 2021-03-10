import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  esValido: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  guardar( forma: NgForm){

    if (forma.value.nombre || forma.value.apellido || forma.value.email){
      this.esValido = false;
    } else { this.esValido = true; }

    console.log('submit =>', forma.value);
  }

}
