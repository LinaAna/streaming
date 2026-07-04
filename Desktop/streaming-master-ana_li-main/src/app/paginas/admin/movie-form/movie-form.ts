import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Streaming } from '../../../core/services/artigo-service';
import { MovieModel } from '../../../core/models/movieModel';

@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm implements OnInit {
  private readonly artigoService = inject(Streaming);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  selectedFile: File | null = null;
  isEditMode = false;
  movieId: number | null = null;

  artigoForm = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
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
    this.artigoService.getById(id).subscribe({
      next: (movie: MovieModel) => {
        this.artigoForm.patchValue({
          titulo: movie.titulo,
          genero: movie.genero,
          ano_lancamento: movie.ano_lancamento,
          nota: movie.nota,
          imagem_url: movie.imagem_url || '',
        });
      },
      error: () => {
        alert('Erro ao carregar dados do filme');
        this.router.navigate(['/painelAdmin']);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  onSubmit(): void {
    if (this.artigoForm.invalid) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const formData = new FormData();
    const values = this.artigoForm.value;

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, String(value));
      }
    });

    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    if (this.isEditMode && this.movieId) {
      this.artigoService.update(this.movieId, formData).subscribe({
        next: () => {
          alert('Filme atualizado com sucesso!');
          this.router.navigate(['/painelAdmin']);
        },
        error: () => {
          alert('Erro ao atualizar filme');
        },
      });
    } else {
      this.artigoService.create(formData).subscribe({
        next: () => {
          alert('Filme criado com sucesso!');
          this.router.navigate(['/painelAdmin']);
        },
        error: () => {
          alert('Erro ao criar filme');
        },
      });
    }
  }
}