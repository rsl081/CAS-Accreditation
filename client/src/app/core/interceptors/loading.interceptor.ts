import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { BusyService } from 'src/app/_services/busy.service';

@Injectable()
export class Loadinginterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (!request.url.includes('emailexists')) {
      this.busyService.busy();
    }
    
    if (request.url.includes('search')) {
      this.busyService.idle();
    }
    
    return next.handle(request).pipe(
      // delay(1000),
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
  
}
