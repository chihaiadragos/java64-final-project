import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalService } from "./login/service/local.service";
import { Injectable } from "@angular/core";




@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localService: LocalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor");

    if (request.headers.has('X-Skip-Interceptor')) {
      const headers = request.headers.delete('X-Skip-Interceptor');
      const modifiedReq = request.clone({ headers });
      return next.handle(modifiedReq);
    }
    
    const currentUserString = this.localService.getData('currentUser');
    const currentUser = JSON.parse(currentUserString!);
    const token = currentUser.token;
    

    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}