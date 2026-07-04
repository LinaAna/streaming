import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private authService = inject(AuthService);
  private router = inject(Router);

  estaCarregando = signal(false);
  estaVisivelSenha = signal(false);

  forcaSenha = signal({
    largura: '0%',
    cor: 'transparent',
    texto: ''
  });

  cadastroForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    terms: new FormControl(false, [Validators.requiredTrue])
  });

  verificarForcaSenha(): void {
    const senha = this.cadastroForm.get('password')?.value || '';
    let forca = 0;

    if (senha.length >= 8) forca++;
    if (/[A-Z]/.test(senha)) forca++;
    if (/[0-9]/.test(senha)) forca++;
    if (/[^A-Za-z0-9]/.test(senha)) forca++;

    if (senha.length === 0) {
      this.forcaSenha.set({ largura: '0%', cor: 'transparent', texto: '' });
    } else if (forca <= 1) {
      this.forcaSenha.set({ largura: '25%', cor: '#ef4444', texto: 'Fraca' });
    } else if (forca === 2) {
      this.forcaSenha.set({ largura: '50%', cor: '#f59e0b', texto: 'Média' });
    } else if (forca === 3) {
      this.forcaSenha.set({ largura: '75%', cor: '#3b82f6', texto: 'Boa' });
    } else {
      this.forcaSenha.set({ largura: '100%', cor: '#10b981', texto: 'Forte' });
    }
  }

  toggleVisibilidadeSenha(): void {
    this.estaVisivelSenha.update(v => !v);
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    this.estaCarregando.set(true);

    const { name, email, password } = this.cadastroForm.getRawValue();

    // ⚠️ TEMPORÁRIO - Simula cadastro bem-sucedido SEM chamar a API
    setTimeout(() => {
      const usuario = {
        name: name,
        email: email,
        token: 'temporario-cadastro-' + Date.now()
      };
      
      localStorage.setItem('usuario_cadastrado', JSON.stringify(usuario));
      
      alert('✅ Cadastro simulado com sucesso!\n\nNome: ' + name + '\nEmail: ' + email);
      this.estaCarregando.set(false);
      this.router.navigate(['/login']);
    }, 1000);

    /* 
    ⬇️ CÓDIGO ORIGINAL - Descomente quando tiver a senha da API
    this.authService.cadastro(
      name ?? '',
      email ?? '',
      password ?? ''
    ).subscribe({
      next: () => {
        alert('Cadastro efetuado com sucesso!');
        this.estaCarregando.set(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        this.estaCarregando.set(false);
        alert('Dados inválidos: ' + (err.error?.message || 'Erro desconhecido'));
      },
    });
    */
  }
}