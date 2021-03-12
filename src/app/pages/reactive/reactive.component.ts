import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarData();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get emailNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }

  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get comunaNoValido(){
    return this.forma.get('direccion.comuna').invalid && this.forma.get('direccion.comuna').touched;
  }

  get regionNoValido(){
    return this.forma.get('direccion.region').invalid && this.forma.get('direccion.region').touched;
  }

  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido(){

    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;

  }


  crearFormulario( ){

    this.forma = this.fb.group({
      // 1pos: valor por defecto
      // 2pos: validaciones sincronas
      // 3pos: validaciones asincronas
      // se manejan las validaciones desde el componente ts para hacer mas legible el codigo html que esta al frente
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', Validators.required],
      email   : ['', [Validators.required, Validators.minLength(5), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // las validaciones asincronas son las 3er argumento del arreglo
      usuario : ['', , this.validadores.existeUsuario ],
      pass1   : ['', Validators.required],
      pass2   : ['', Validators.required],
      // campos con objetos anidados como direccion con mas campos en el
      direccion: this.fb.group({
        comuna: ['', Validators.required],
        region: ['', Validators.required]
      }),
      // definir arreglos
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(  this.fb.control('')  );
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  cargarData(){
    // carga valores iniciales a los campos
    // deben estar todos los valores iniciales a diferencia del reset
    // que solo necesita ser invocado
    this.forma.reset({
      nombre: 'Cristian',
      apellido: 'Reyes',
      email: 'cristian@gmail.com',
      direccion: {
        comuna: 'San Bernardo',
        region: 'Metropolitana'
      }
    });
  }

  guardar(){

    if ( this.forma.invalid ){
      return Object.values(this.forma.controls).forEach(control => {
        // preguntto si el control es una instancia del formgroup
        // si lo es me marca todo como invalido
        if (control instanceof FormGroup){
          // tslint:disable-next-line:no-shadowed-variable
          return Object.values(control.controls).forEach( control => {control.markAllAsTouched(); });
        } else {
          control.markAllAsTouched();
        }
      });
    }

    // posteo de la informacion (reset informacion)
    // this.forma.reset({
    //   nombre: 'Nombre'
    // });
    console.log(this.forma.value);

  }

}
