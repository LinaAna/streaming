import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Movie } from '../../../shared/movie/movie';
import { MovieModel } from '../../../core/models/movieModel';
import { Streaming } from '../../../core/services/streamingService';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private readonly movieService = inject(Streaming); // ✅ Apenas UMA declaração
  private readonly router = inject(Router);

  streaming = signal<MovieModel[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.movieService.getAll().subscribe({
      next: (data: MovieModel[]) => {
        this.streaming.set(data);
        this.isLoading.set(false);
      },
      error: (err: unknown) => {
        console.error('Erro ao carregar filmes:', err);
        this.isLoading.set(false);
        this.errorMessage.set('Erro ao carregar filmes. Verifique se o backend está rodando.');
      }
    });
  }

  editMovie(id: number): void {
    this.router.navigate(['/admin/edit', id]);
  }

  deleteMovie(id: number): void {
    if (!confirm('Deseja excluir este filme?')) {
      return;
    }

    this.movieService.delete(id).subscribe({
      next: () => {
        alert('Filme excluído!');
        this.loadMovie();
      },
      error: (err: unknown) => {
        const error = err as { error?: { error?: string } };
        alert(error.error?.error || 'Erro ao excluir filme');
      }
    });
  }
}