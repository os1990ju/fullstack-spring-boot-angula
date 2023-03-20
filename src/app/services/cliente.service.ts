import { Injectable } from '@angular/core';
import {Observable, catchError, throwError} from 'rxjs';
import { Cliente } from '../components/clientes/cliente';
//conexion a server
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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

  //consultar un cliente
  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError( e => {
        this.router.navigate(['/clientes']);
        console.log(e);
        Swal.fire('Error al editar',e.error.message,'error');
        return throwError(e)
        
      })
    )
  }
  //crear cliente
  create(cliente:Cliente):Observable<any>{
    return this.http.post<any>(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e=>{
        console.log(e);
        Swal.fire('error al editar',e.error.mensaje,'error');
        return throwError(e);
      })
      
    )
    
  }
  
  //actualizar cliente
  update(cliente:Cliente):Observable<Cliente>{
      return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
        catchError( e=>{
          console.log(e);
          Swal.fire('error al editar',e.error.mensaje,'error');
          return throwError(e);
        })
        
      )
  }

  //eliminar cliente
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError( e=>{
        console.log(e);
        Swal.fire('error al eliminar',e.error.mensaje,'error');
        return throwError(e);
      })
      
    )
  }
  constructor(private http:HttpClient,
              private router:Router) { 

  }
}
