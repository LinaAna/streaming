import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieModel } from '../../core/models/movieModel';
import { Streaming } from '../../core/service/streaming';
import { Movie } from '../../shared/movie/movie';

@Component({
  selector: 'app-vitrine',
  imports: [Movie],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit {
  private readonly movieService = inject(Streaming)

  movies = signal<MovieModel[]>([]);

  ngOnInit(): void {
    this.movieService.getAll().subscribe((res) => {
      this.movies.set(res)
    })
  }
}
