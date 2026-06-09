import { Component } from '@angular/core';
import { Movie } from "../../shared/movie/movie";

@Component({
  selector: 'app-vitrine',
  imports: [Movie],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {}
