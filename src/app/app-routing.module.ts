import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'articulos', component: ArticulosComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'administrator', component: AdministratorComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
