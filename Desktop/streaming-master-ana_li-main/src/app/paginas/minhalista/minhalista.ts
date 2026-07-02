import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieModel } from '../../core/models/movieModel';
import { Movie } from '../../shared/movie/movie';
import { Streaming } from '../../core/services/artigo-service';

@Component({
  selector: 'app-minha-lista',
  imports: [Movie],
  templateUrl: './minhalista.html',
  styleUrl: './minhalista.css',
})
export class MinhaLista implements OnInit {
  private readonly movieService = inject(Streaming);

  // Sinal para armazenar os filmes da lista do usuário
  myListMovies = signal<MovieModel[]>([]);

  ngOnInit(): void {
    // Aqui você vai chamar o método que busca a lista do usuário.
    // Por enquanto, deixei o getAll() igual ao da vitrine para não quebrar.
    this.movieService.getAll().subscribe((res) => {
      this.myListMovies.set(res);
      console.log('Filmes da Minha Lista:', res);
    });
  }
}
