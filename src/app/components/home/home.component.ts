import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { MaterialModules } from 'src/app/material';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, FormsModule, ...MaterialModules],
})
export class HomeComponent {
  movies: any[] = [];
  currentPage = 1;
  totalPages = 1;
  selectedType: '' | 'Movie' | 'TV Show' = '';
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private movieService: MovieService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.fetchMovies(this.currentPage);
  }

  viewDetails(id: string) {
    this.router.navigate(['/detail', id]);
  }

  onFilterChange(type: '' | 'Movie' | 'TV Show') {
    this.selectedType = type;
    this.fetchMovies(this.currentPage);
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement)['value'] || '';
    this.currentPage = 1;
    this.fetchMovies(this.currentPage);
  }

  fetchMovies(page: number) {
    this.movieService
      .getMovies(this.selectedType, this.searchTerm, page)
      .subscribe({
        next: (response: any) => {
          this.movies = response.shows;
          this.totalPages = response.totalPages;
        },
        error: (err) => {
          console.error('Failed to fetch movies:', err);
        },
      });
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies(this.currentPage);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies(this.currentPage);
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
