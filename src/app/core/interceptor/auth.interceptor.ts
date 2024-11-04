import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const authToken = this.authService.getToken();

    if (authToken && !this.isAuthRequest(req.url)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }

  private isAuthRequest(url: string): boolean {
    return url.endsWith('/login') || url.endsWith('/logout');
  }
}
