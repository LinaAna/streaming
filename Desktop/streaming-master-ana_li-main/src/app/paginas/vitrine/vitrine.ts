import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieModel } from '../../core/models/movieModel';
import { Movie } from '../../shared/movie/movie';
import { Streaming } from '../../core/services/artigo-service';

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
      console.log(res);
      
    })
  }
}
