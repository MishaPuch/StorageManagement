import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  {path:'' , component:LoginPageComponent},
  {path:'main', component:MainPageComponent},
  {path:'orders', component:OrdersComponent},
  {path:'products', component:ProductsComponent},
  {path:'settings', component:SettingsComponent},
  {path:'registration', component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
