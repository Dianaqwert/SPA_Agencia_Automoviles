import { CommonModule } from '@angular/common';
import { Component ,NgModule} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-servicios',
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  
  //lista despegable
  paises=['Estados Unidos','México','Brasil'];
  estados=['Aguascalientes','Nuevo León','Sinaloa','CDMX'];

  public form: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      this.nombreValidator()
    ]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(5)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10),
      this.direccionValidator() // <- validación personalizada aplicada correctamente
    ]),
    pais: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    cp: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    fechaCita: new FormControl('', [Validators.required]),
    metodoPago: new FormControl('credit', [Validators.required]),
    nombreTarjeta: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
    numeroTarjeta: new FormControl('', [Validators.required, Validators.maxLength(16)]),
    expiracion: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
    cvv: new FormControl('', [Validators.required, Validators.maxLength(3)])
  });


  public direccionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const direc: string = control.value;

      if (!direc) return null;

      // Solo permite letras, espacios, acentos, #, ., ,, - y números
      const regexValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s#.,\-]+$/;

      if (!regexValido.test(direc)) {
        const caracteresInvalidos = direc
          .split('')
          .filter(char => !char.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s#.,\-]/));

        const unicos = [...new Set(caracteresInvalidos)];
        return { direccion: unicos.join(', ') };
      }

      return null;
    };
  }

  public nombreValidator():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const valor: string = control.value;

      if (!valor) return null;

      // Permitimos: letras con acento, mayúsculas, minúsculas y espacios
      const regexValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

      if (!regexValido.test(valor)) {
        // Extraemos los caracteres inválidos (que no están en la expresión permitida)
        const caracteresInvalidos = valor
          .split('')
          .filter(char => !char.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/));

        // Quitamos duplicados para que no repita el mismo caracter varias veces
        const unicos = [...new Set(caracteresInvalidos)];

        return { caracteresInvalidos: unicos.join(', ') };
      }

      return null;
    };
  }

  

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
    }else{
      this.form.markAllAsTouched();
    }
  }





}
