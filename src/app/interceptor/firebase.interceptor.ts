import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class FirebaseInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.idToken.pipe(
      take(1), // <-------------- only emit the first value!

      switchMap((token: any) => {
        if (token) {
          request = request.clone({
            setHeaders: {Authorization: `Bearer ${token}`},
          });
        }
        return next.handle(request);
      }),
    );
  }
}
