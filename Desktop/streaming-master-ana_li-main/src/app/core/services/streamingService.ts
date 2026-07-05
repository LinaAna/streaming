import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieModel } from '../models/movieModel';

@Injectable({
  providedIn: 'root'
})
export class Streaming {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/filmes';
  

  getAll(): Observable<MovieModel[]> {
    const headers = new HttpHeaders();
    return this.http.get<MovieModel[]>(this.apiUrl, { headers });
  }

  getById(id: number): Observable<MovieModel> {
    const headers = new HttpHeaders();
    return this.http.get<MovieModel>(`${this.apiUrl}/${id}`, { headers });
  }

  // Aceita tanto FormData quanto Object (JSON)
  create(data: FormData | any): Observable<MovieModel> {
    const headers = new HttpHeaders();
    // Não defina Content-Type manualmente, deixe o Angular definir
    return this.http.post<MovieModel>(this.apiUrl, data, { headers });
  }

  update(id: number, data: FormData | any): Observable<MovieModel> {
    const headers = new HttpHeaders();
    return this.http.put<MovieModel>(`${this.apiUrl}/${id}`, data, { headers });
  }

  delete(id: number): Observable<void> {
    const headers = new HttpHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}