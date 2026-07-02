import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../../shared/movie/movie';
import { MovieModel } from '../../../core/models/movieModel';
import { Streaming } from '../../../core/services/artigo-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  private readonly movieService = inject(Streaming)
  private artigoService = inject(Streaming)

  artigos = signal <MovieModel[]>([])
  isLoading = signal(true);

  
  ngOnInit(): void {
    this.loadMovie()

  }
  
  private loadMovie(): void{
  this.movieService.getAll().subscribe({
    next:(data) => {
      this.artigos.set(data);
      this.isLoading.set(false);
    }
  })
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
        alert(err.error?.error ||"Erro ao excluir filme");

      }

    });

  }

}

