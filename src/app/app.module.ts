import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { IndexComponent } from './components/index/index.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ArticuloService } from './services/articulo.service';
import { AdministratorComponent } from './components/administrator/administrator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarritoComponent,
    ArticulosComponent,
    ClientesComponent,
    IndexComponent,
    RegisterComponent,
    AboutComponent,
    AdministratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ArticuloService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
