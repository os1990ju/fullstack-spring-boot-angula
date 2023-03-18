import { Component, OnInit } from '@angular/core';

import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from './cliente';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{

  clients:string = "Clientes";
  clientes:Cliente[];

  constructor(private clienteService: ClienteService){
   
  }
  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes =>this.clientes=clientes
    );
  }

  //delete

  delete(cliente:Cliente):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response=>{
            //actualiza la lista con el cliente eliminado
            this.clientes = this.clientes.filter(cli=> cli!== cliente)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con exito!`,
              'success'
            )
          }
        )
      } 
    })
  }
}
