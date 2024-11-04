import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class LoaderComponent {
  loading: boolean = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
}
