import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;
  constructor(private fb: FormBuilder) { 

    this.crearFormulario();
    
  }

  ngOnInit(): void {
  }

  crearFormulario( ){

    this.forma = this.fb.group({
      // 1pos: valor por defecto
      // 2pos: validaciones sincronas
      // 3pos: validaciones asincronas
      nombre: ['Cristian'],
      apellido: ['Reyes'],
      email: ['a@a.cl']
    })

  }

  guardar(){

    console.log(this.forma.value);
    

  }

}
