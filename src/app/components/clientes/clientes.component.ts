import { Component, OnInit } from '@angular/core';

import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from './cliente';

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
}
