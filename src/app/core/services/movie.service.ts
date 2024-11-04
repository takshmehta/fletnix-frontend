import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = `${environment.apiBaseUrl}shows`;

  constructor(private http: HttpClient) {}

  getMovies(
    type: '' | 'Movie' | 'TV Show',
    search = '',
    page: number = 1
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('type', type)
      .set('search', search);
    return this.http.get(this.apiUrl, { params });
  }

  getMovieById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
