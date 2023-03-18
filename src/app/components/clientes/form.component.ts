import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  public titulo:string = "Formulario de registro";
  public cliente: Cliente = new Cliente();
  
  constructor(private clienteservice:ClienteService,
              private router:Router,
              private activateRoute:ActivatedRoute){}
//cargar un cliente
cargarCliente(){
  this.activateRoute.params.subscribe( params =>{
    let id = params['id']
    if(id){
      this.clienteservice.getCliente(id).subscribe(
        cliente => this.cliente = cliente
      )
    }
  })
}

//crear un cliente.
  public create():void{
    this.clienteservice.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente',`Cliente ${cliente.nombre} ${cliente.apellido} creado con exito!`, 'success')
      }
    )
  }

  //actualizar 
  public update():void{
    this.clienteservice.update(this.cliente)
    .subscribe(
      cliente=>{
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado', `Cliente ${this.cliente.nombre} actualizado con exito!`, 'success')
      }
    )
  }

  ngOnInit(): void {
    this.cargarCliente();
  }
}
