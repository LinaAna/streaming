import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private authService = inject(AuthService);
  private router = inject(Router);

  estaCarregando = signal(false)

  cadastroForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    const { name, email, password } = this.cadastroForm.getRawValue();

    this.authService.cadastro(
      name ?? '',
      email ?? '',
      password ?? ''
    ).subscribe({
      next: () => {
        alert('Cadastro efetuado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.estaCarregando.set(false)
        alert('Dados inválidos')
      },
    });
  }
}