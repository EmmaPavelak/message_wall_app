import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersService } from './users/users.service';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AppRoutingModule,FormsModule, ReactiveFormsModule, 
    HttpClientModule, IonicModule.forRoot()],
  providers: [UsersService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
