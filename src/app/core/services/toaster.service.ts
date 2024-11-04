import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: ['snackbar-success'],
    });
  }

  showError(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: ['snackbar-error'],
    });
  }

  showInfo(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: ['snackbar-info'],
    });
  }

  showWarning(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: ['snackbar-warning'],
    });
  }
}
