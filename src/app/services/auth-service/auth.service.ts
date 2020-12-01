import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.BASE_URL;
  public isAuthenticatedEmitter: EventEmitter<boolean> = new EventEmitter(true);
  authTrigger = false;

  constructor(private jwtHelper: JwtHelperService, private httpClient: HttpClient) {
  }

  public isUserExists(userId: string): Observable<HttpResponse<any>> {
    const userExistUrl = this.baseUrl + '/v1/isUserExists/' + userId;
    const resp = this.httpClient.get(userExistUrl, {observe: 'response'});
    return resp;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.jwt_bearer_header);
    if (!token) {
      return false;
    }
    if (!this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      localStorage.removeItem(environment.jwt_bearer_header);
      return false;
    }
  }

  public loginWithUsername(authRequest): Observable<HttpResponse<any>> {
    const loginUrl = this.baseUrl + '/auth/login';
    return this.httpClient.post(loginUrl, authRequest, {observe: 'response'});
  }

  public registerWithName(userName: any): Observable<HttpResponse<User>> {
    const registerUrl = this.baseUrl + '/auth/register';
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<User>(registerUrl, userName, {headers: header, observe: 'response'});
  }

}
