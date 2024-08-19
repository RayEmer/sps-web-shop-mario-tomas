import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false; // Controla el estado de la carga

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true; // Mostrar la pantalla de carga
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          this.loading = false; // Ocultar la pantalla de carga
          this.errorMessage = '';
          this.authService.saveToken(response.token);
          this.router.navigate(['/index']);
        },
        error => {
          this.loading = false; // Ocultar la pantalla de carga
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
        }
      );
    }
  }
}
