import { Component, input } from '@angular/core';
import { MovieModel } from '../../core/models/movieModel';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.html',
  styleUrl: './movie.css',
})
export class Movie {
  data=input.required<MovieModel>()
}
