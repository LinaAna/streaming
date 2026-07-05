import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieModel } from '../../core/models/movieModel';
import { Movie } from '../../shared/movie/movie';
import { Streaming } from '../../core/services/streamingService';

@Component({
  selector: 'app-minha-lista',
  imports: [Movie],
  templateUrl: './minhalista.html',
  styleUrl: './minhalista.css',
})
export class MinhaLista implements OnInit {
  private readonly movieService = inject(Streaming);

  
  myListMovies = signal<MovieModel[]>([]);

  ngOnInit(): void {

    this.movieService.getAll().subscribe((res) => {
      this.myListMovies.set(res);
      console.log('Filmes da Minha Lista:', res);
    });
  }
}
