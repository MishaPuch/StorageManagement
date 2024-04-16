import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'; 
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { BucketComponent } from './pages/bucket/bucket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    NavBarComponent,
    SettingsComponent,
    ProductsComponent,
    OrdersComponent,
    RegistrationComponent,
    RegistrationComponent,
    BucketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule, 
    DataViewModule,
    CardModule,
    FormsModule,
    HttpClientModule,
    RatingModule,
  ],
  providers: [
    provideClientHydration(),
    
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
