import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieModel } from '../models/movieModel';

@Injectable({
  providedIn: 'root'
})
export class Streaming {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/filmes'; // Ajuste sua URL

  getAll(): Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(`${this.apiUrl}/${id}`);
  }

  create(data: FormData): Observable<MovieModel> {
    return this.http.post<MovieModel>(this.apiUrl, data);
  }

  update(id: number, data: FormData): Observable<MovieModel> {
    return this.http.put<MovieModel>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}