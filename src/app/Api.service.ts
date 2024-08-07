import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationResponse } from './Auth/models/authentication-response';
import { RegisterRequest } from './Auth/models/register-request';
import { AuthenticationRequest } from './Auth/models/authentication-request';
import { VerificationRequest } from './Auth/models/verification-request';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Retrieved Token:', token); // Log the token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }



  register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${environment.BackUrl}/api/v1/auth/register`, registerRequest
    );
  }

  login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${environment.BackUrl}/api/v1/auth/authenticate`, authRequest
    );
  }

  verifyCode(verificationRequest: VerificationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${environment.BackUrl}/verify`, verificationRequest
    );
  }

  product(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${environment.Product}/api/v1/demo-controller`, { headers })
      
  }
}
