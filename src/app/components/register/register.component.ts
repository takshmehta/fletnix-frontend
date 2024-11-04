import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { MaterialModules } from 'src/app/material';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToasterService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(10)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, age } = this.registerForm.value;
      this.authService.register(email, password, age).subscribe({
        next: (response) => {
          this.toastr.showSuccess('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.showError('Registration failed. Please try again.');
        },
      });
    }
  }
}
