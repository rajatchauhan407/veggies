import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, ɵɵtrustConstantResourceUrl } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth-services";
import { environment } from "src/environments/environment";
const URL = environment.Url;
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(req.url);
        const authToken=this.authService.getToken();
        if(req.url == (URL+"/prices") && !authToken){
            // console.log(req);
            return next.handle(req);
        }else{
            const authRequest = req.clone({
                headers:req.headers.set('Authorization',"Bearer "+ authToken)
            });
            return next.handle(authRequest);
        }
        
    }
}