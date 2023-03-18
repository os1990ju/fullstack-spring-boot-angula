import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
// RUTEO
import { RouterModule, Routes } from '@angular/router';
//conexion con el backend
import {HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/clientes/form.component';
//trabajar con fromularios
import { FormsModule } from '@angular/forms';
const routes: Routes=[
  {path:'',redirectTo:'/clientes',pathMatch:'full'},
  {path:'directivas', component:DirectivaComponent},
  {path:'clientes', component:ClientesComponent},
  {path:'clientes/form', component:FormComponent},
  {path:'clientes/form/:id', component:FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    //rutas
    RouterModule.forRoot(routes),
    //conexion a servidor
    HttpClientModule,
    //formularios
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
