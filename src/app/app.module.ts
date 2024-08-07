import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FooterComponent } from './frontOffice/footer/footer.component';

import { NgxPaginationModule } from 'ngx-pagination';

import { HeadComponent } from './frontOffice/head/head.component';
import { HomeComponent } from './frontOffice/home/home.component';
import { BodyComponent } from './frontOffice/body/body.component';
import { IndexBComponent } from './backOffice/index-b/index-b.component';
import { HeaderBComponent } from './backOffice/header-b/header-b.component';
import { SidebarBComponent } from './backOffice/sidebar-b/sidebar-b.component';
import { BBODYYComponent } from './backOffice/bbodyy/bbodyy.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BodyComponent,
    HeadComponent,
    FooterComponent,
    IndexBComponent,
    HeaderBComponent,
    SidebarBComponent,
    BBODYYComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
