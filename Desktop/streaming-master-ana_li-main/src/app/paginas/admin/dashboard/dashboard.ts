import { Component, inject, signal, OnInit } from '@angular/core';
import { Movie } from '../../../shared/movie/movie';
import { MovieModel } from '../../../core/models/movieModel';
import { Streaming } from '../../../core/services/artigo-service';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private readonly movieService = inject(Streaming)
  private artigoService = inject(Streaming)
  private router = inject(Router)

  artigos = signal <MovieModel[]>([])
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadMovie()
  }
  
  
  loadMovie(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    this.movieService.getAll().subscribe({
      next: (data) => {
        this.artigos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar filmes:', err);
        this.isLoading.set(false);
        this.errorMessage.set('Erro ao carregar filmes. Verifique se o backend está rodando.');
      }
    });
  }

editArtigo(id: any): void {
  this.router.navigate(['/admin/edit', id]);
}

  deleteArtigo(id: any): void {
    if(!confirm("Deseja excluir este filme?")) {
      return
    }
    this.artigoService.delete(id).subscribe({
      next: () => {
        alert("Filme excluído!");
        this.loadMovie()
      },
      error: (err) => {
        alert(err.error?.error || "Erro ao excluir filme");
      }

    });

  }

}
