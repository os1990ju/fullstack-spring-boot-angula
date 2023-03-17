import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Cliente } from '../components/clientes/cliente';
//conexion a server
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  
  private urlEndpoint:string = 'http://localhost:8080/api/clientes';
  //definir cabeceras
  private httpHeaders = new HttpHeaders({'content-type':'application/json'});
  //consultar clientes
  getClientes():Observable<Cliente[]>{
    //return of(CLIENTES);//se convierte en un flujo de datos stream para el observable
    return this.http.get<Cliente[]>(this.urlEndpoint)
  }

  //crear cliente
  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndpoint, cliente, {headers: this.httpHeaders})
  }
  
  constructor(private http:HttpClient) { 

  }
}
