import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  
  //lista despegable
  servicios=['Mantenimiento preventivo',
    'Reparaciones mecánica',
    'Cambio de aceite y filtros',
    'Revisión y cambio de batería',
    'Balanceo y alineación',
    'Diagnóstico computarizado'];
  
  estados=['Aguascalientes','Nuevo León','Sinaloa','CDMX'];

  //fecha
  fechaMin:string;
  fechaMax:string;
  //local
  ultimoRegistro: any = null;

  constructor(){
    //fecha minima que es la actual
    const hoy=new Date();
    this.fechaMin=hoy.toISOString().split('T')[0];

    //fecha maxima de 60 dias
    const fechaMax = new Date();
    fechaMax.setDate(hoy.getDate()+60);
    this.fechaMax = fechaMax.toISOString().split('T')[0];

  }

  public form: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      this.nombreValidator()
    ]),

    apellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      this.apellidosValidator()
    ]),

    username: new FormControl('', [
      Validators.required, 
      Validators.minLength(5),
      this.userValidator()
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),

    direccion: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10),
      this.direccionValidator() // <- validación personalizada aplicada correctamente
    ]),


    cp: new FormControl('', [
      Validators.required,
      Validators.maxLength(5),
      Validators.minLength(5),
      this.cpValidator()
    ]),

    fechaCita: new FormControl('', [
      Validators.required,
      this.fechaValidator()
    ]),

    servicios: new FormControl('', [
      Validators.required,
      this.opcionNoValida()
    ]),
    estado: new FormControl('', [
      Validators.required,
      this.opcionNoValida()
    ]),

    terminos:new FormControl(false,[Validators.requiredTrue]),
    urgencia:new FormControl('',[
      Validators.required,
      this.urgenciaValidator
    ])

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

  public apellidosValidator():ValidatorFn{
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

  public userValidator():ValidatorFn{

    return (control: AbstractControl): ValidationErrors | null => {
      const valor: string = control.value;

      if (!valor) return null;

      // Permitimos: letras con acento, mayúsculas, minúsculas y espacios
      const regexValido = /^[a-zA-Z0-9\s_-]+$/;

      if (!regexValido.test(valor)) {
        // Extraemos los caracteres inválidos (que no están en la expresión permitida)
        const caracteresInvalidos = valor
          .split('')
          .filter(char => !char.match(/[a-zA-Z0-9\s_-]/));

        //quitamos duplicados para que no repita el mismo caracter varias veces
        const unicos = [...new Set(caracteresInvalidos)];

        return { caracteresInvalidos: unicos.join(', ') };
      }

      return null;
    };
  }

  public cpValidator():ValidatorFn{
    //Validators.pattern('^[0-9]{5}$')
    return (control: AbstractControl): ValidationErrors | null => {
      const valor: string = control.value;

      if (!valor) return null;

      // Permitimos
      const regexValido = /^[0-9]+$/;

      if (!regexValido.test(valor)) {
        // Extraemos los caracteres inválidos (que no están en la expresión permitida)
        const caracteresInvalidos = valor
          .split('')
          .filter(char => !char.match(/[0-9]/));

        //quitamos duplicados para que no repita el mismo caracter varias veces
        const unicos = [...new Set(caracteresInvalidos)];

        return { caracteresInvalidos: unicos.join(', ') };
      }

      return null;
    };
  }

  public fechaValidator():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaSeleccionada = new Date(control.value);
      const hoy = new Date();
      const fechaLimite = new Date(hoy);
      fechaLimite.setDate(hoy.getDate() + 60); // Ahora sí suma 60 días correctamente


      hoy.setHours(0, 0, 0, 0); // Resetear horas para comparación exacta
      fechaLimite.setHours(23, 59, 59, 999);

     

      if (!control.value) {
        return null; // Deja que Validators.required maneje este caso
      }

    if (fechaSeleccionada < hoy) {
      return { fechaInvalida: { mensaje: 'La fecha no puede ser anterior al día actual' } };
    }
    
    if (fechaSeleccionada > fechaLimite) {
      return { fechaInvalida: { mensaje: 'La fecha no puede ser mayor a 60 dias no se puede' } };
    }

    return null;
    };
  }

  private urgenciaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valoresPermitidos = ['alta', 'baja', 'revision'];
      return valoresPermitidos.includes(control.value) ? null : { urgenciaInvalida: true };
    };
  }

  public opcionNoValida():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === '' ? { opcionInvalida: true } : null;
    };
  }

  //control de formulario
  formSubmitted = false;
  formValidated = false;

  onSubmit() {
    this.formSubmitted = true;
    
    if(this.form.valid) {
      this.formValidated = true;
      console.log('Validación exitosa');
    } else {
      this.form.markAllAsTouched();
      this.formValidated = false;
    }
  }

  //guardar local
  guardarInformacion(){
    if (this.formValidated && this.form.valid) {

      // Obtener registros existentes o crear array nuevo
      const registros: any[] = JSON.parse(localStorage.getItem('registroFormulario') || '[]');
      //registros -> objeto
      const nuevoReg={
        id: new Date().getTime(),
        fechaDeRegistro:new Date().toISOString(),
        nombre:this.form.value.nombre,
        apellidos:this.form.value.apellidos,
        username:this.form.value.username,
        email:this.form.value.email,
        direccion:this.form.value.direccion,
        cp:this.form.value.cp,
        fechaCita:this.form.value.fechaCita,
        servicios:this.form.value.servicios,
        estado:this.form.value.estado,
        terminos:this.form.value.terminos,
        urgencia:this.form.value.urgencia,
      }

      //agregar el array
      registros.push(nuevoReg);
      //guardar en el local
      localStorage.setItem('registroFormulario',JSON.stringify(registros));

      // Guardar el último registro para mostrarlo
      this.ultimoRegistro = nuevoReg;

      //reset formulario
      this.form.reset();
      this.formSubmitted=false;
      this.formValidated=false;

      console.log('datos guardados',nuevoReg);

      //alert
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta solicitud',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, mandar información',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Acción si confirma
            Swal.fire('Capturando', 'Tu información ha sido guardada.', 'success');
          }
      } );

      
    
    }
  }

  getRegistros(): any[] {
    const datos = localStorage.getItem('registroFormulario');
    return datos ? JSON.parse(datos) : [];
  }





}
