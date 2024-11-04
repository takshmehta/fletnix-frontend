import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { MaterialModules } from 'src/app/material';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [CommonModule, ...MaterialModules],
})
export class DetailComponent {
  movie!: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe((data) => {
        this.movie = data;
      });
    }
  }
}
