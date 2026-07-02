import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  estaCarregando = signal(false);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.estaCarregando.set(true);

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email ?? '', password ?? '').subscribe({
      next: () => {
        this.estaCarregando.set(false);
        alert('Login efetuado com sucesso!');
        // ajuste a rota conforme seu projeto
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.estaCarregando.set(false);
        alert('Usuário ou senha inválidos');
      }
    });
  }
}