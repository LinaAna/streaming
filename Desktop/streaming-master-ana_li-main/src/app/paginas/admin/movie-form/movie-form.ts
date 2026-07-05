import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Streaming } from '../../../core/services/streamingService';
import { MovieModel } from '../../../core/models/movieModel';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm implements OnInit {
  private readonly movieService = inject(Streaming);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  selectedFile: File | null = null;
  isEditMode = false;
  movieId: number | null = null;

  movieForm = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    genero: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ano_lancamento: new FormControl<number | null>(null, [Validators.required]),
    nota: new FormControl<number | null>(null, [Validators.required]),
    imagem_url: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.movieId = +id;
      this.loadMovieData(this.movieId);
    }
  }

  private loadMovieData(id: number): void {
    this.movieService.getById(id).subscribe({
      next: (movie: MovieModel) => {
        this.movieForm.patchValue({
          titulo: movie.titulo,
          genero: movie.genero,
          ano_lancamento: movie.ano_lancamento,
          nota: movie.nota,
          imagem_url: movie.imagem_url || '',
        });
      },
      error: (err) => {
        console.error('Erro ao carregar filme:', err);
        alert('Erro ao carregar dados do filme');
        this.router.navigate(['/admin/dashboard']);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      alert('Preencha todos os campos obrigatórios corretamente');
      this.movieForm.markAllAsTouched();
      return;
    }

    const values = this.movieForm.value;
    
    const movieData = {
      titulo: values.titulo,
      genero: values.genero,
      ano_lancamento: values.ano_lancamento ? Number(values.ano_lancamento) : null,
      nota: values.nota !== null && values.nota !== undefined ? Number(values.nota) : null,
      imagem_url: values.imagem_url?.trim() || null
    };

    console.log('Enviando dados:', movieData);

    if (this.isEditMode && this.movieId) {
      this.movieService.update(this.movieId, movieData).subscribe({
        next: (response) => {
          console.log('Filme atualizado:', response);
          alert('Filme updated com sucesso!');
          this.router.navigate(['/painelAdmin']);
        },
        error: (err) => {
          console.error('Erro ao atualizar filme:', err);
          alert(`Erro ao atualizar filme: ${err.message || 'Tente novamente'}`);
        },
      });
    } else { // Adicionado o comando "else" que faltava aqui
      this.movieService.create(movieData).subscribe({
        next: (response) => {
          console.log('Filme criado:', response);
          alert('Filme criado com sucesso!');
          this.router.navigate(['/painelAdmin']);
        },
        error: (err) => {
          console.error('Erro ao criar filme:', err);
          const errorMessage = err.error?.message || err.error || err.message || 'Erro interno no servidor';
          alert(`Erro ao criar filme: ${errorMessage}`);
        },
      });
    }
  }

  voltarDashboard(): void {
    this.router.navigate(['/painelAdmin']);
  }
}