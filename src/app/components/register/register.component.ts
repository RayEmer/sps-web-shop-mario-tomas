import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  @ViewChild('notificationModal', { static: true }) notificationModal!: ElementRef;
  notificationMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      phone: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    this.loading = true;
    if (this.registerForm.valid) {
      const { email, username, password, firstname, lastname, city, street, number, zipcode, lat, long, phone } = this.registerForm.value;
      const payload = {
        email,
        username,
        password,
        name: {
          firstname,
          lastname
        },
        address: {
          city,
          street,
          number: Number(number),
          zipcode,
          geolocation: {
            lat,
            long
          }
        },
        phone
      };
      
      this.authService.register(payload).subscribe(
        response => {
          this.loading = false;
          this.notificationMessage = `Registro exitoso, tu ID es: ${response.id}`;
          console.log(this.notificationMessage)
          this.mostrarNotificacion(this.notificationMessage);
        },
        error => {
          this.loading = false;
          this.notificationMessage = 'Error al registrarse: ' + error.message;
          console.log(this.notificationMessage)
          this.mostrarNotificacion(this.notificationMessage);
        }
      );
    } else {
      this.loading = false;
      this.notificationMessage = 'El registro no es válido. Por favor verifica los datos.';
      console.log('Errores de validación:', this.getFormValidationErrors());
      this.mostrarNotificacion(this.notificationMessage);
    }
  }
  getFormValidationErrors() {
    const errors: any[] = [];
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });
    return errors;
  }

  mostrarNotificacion(mensaje: string): void {
    this.notificationMessage = mensaje;
    this.renderer.setStyle(this.notificationModal.nativeElement, 'display', 'block');
    this.renderer.addClass(document.body, 'modal-open');
  }

  closeNotificationModal(): void {
    this.renderer.setStyle(this.notificationModal.nativeElement, 'display', 'none');
    this.renderer.removeClass(document.body, 'modal-open');
    this.router.navigate(['/login']);
  }
}