import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  public titulo:string = "Formulario de registro";
  public cliente: Cliente = new Cliente();
  
  constructor(private clienteservice:ClienteService,
              private router:Router){}


  public create():void{
    this.clienteservice.create(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    )
    
  }
  ngOnInit(): void {
    
  }
}
