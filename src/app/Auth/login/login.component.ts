import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez FormBuilder et FormGroup
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Api.service';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { VerificationRequest } from '../models/verification-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { // Implémentez OnInit pour initialiser le formulaire

  loginForm!: FormGroup; // Déclarez loginForm comme un FormGroup

  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};

  constructor(
    private formBuilder: FormBuilder, // Injectez FormBuilder
    private authService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({ // Initialisez loginForm dans ngOnInit
      email: ['', Validators.required], // Ajoutez les validateurs requis pour les champs
      password: ['', Validators.required]
    });
  }

  authenticate() {
    this.authRequest = this.loginForm.value; // Récupérez les valeurs du formulaire

    this.authService.login(this.authRequest)
      .subscribe({
        next: (res: AuthenticationResponse) => {
          this.authResponse = res;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', res.accessToken as string);
            this.router.navigate(['back']);
          }
        }
      });
  }

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['back']);
        }
      });
  }
}
