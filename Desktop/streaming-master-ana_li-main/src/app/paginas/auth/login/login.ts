import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  estaCarregando = signal(false);
  
  // ✅ ADICIONE ESTA LINHA - Signal para controlar visibilidade da senha
  mostrarSenha = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // ✅ ADICIONE ESTE MÉTODO - Toggle do olho
  toggleVisibilidadeSenha(): void {
    this.mostrarSenha.update(v => !v);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.estaCarregando.set(true);

    // ⚠️ TEMPORÁRIO - Aceita qualquer credencial para teste
    const { email, password } = this.loginForm.getRawValue();

    // Simula login bem-sucedido SEM chamar a API
    setTimeout(() => {
      // Salva um token falso no localStorage (para o guard permitir acesso)
      localStorage.setItem('auth_token', 'temporario-para-teste');
      
      alert('✅ Login temporário ativado! (Modo desenvolvimento)');
      this.estaCarregando.set(false);
      this.router.navigate(['/inicio']);
    }, 800);

    /* 
    ⬇️ CÓDIGO ORIGINAL - Descomente quando tiver a senha da API
    this.authService.login(
      email ?? '',
      password ?? ''
    ).subscribe({
      next: () => {
        alert('Login efetuado com sucesso!');
        this.estaCarregando.set(false);
        this.router.navigate(['/inicio']);
      },
      error: () => {
        this.estaCarregando.set(false);
        alert('Credenciais inválidas');
      },
    });
    */
  }
}