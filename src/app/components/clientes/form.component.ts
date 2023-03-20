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
  //arreglo para errores de bad reques
  public errores:string[];
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
    this.clienteservice.create(this.cliente)
    .subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal.fire(`${response.mensaje}`,`El cliente ${response.Cliente.nombre} ha sido creado con exito`, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.log('el codig del error de bakend es: '+err.status);
        console.log(err.error.erros);
        
      }
    )
  }

  //actualizar 
  public update():void{
    this.clienteservice.update(this.cliente)
    .subscribe(
      json=>{
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado', `Cliente ${json.Cliente.nombre}: actualizado con exito!`, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.log('el codig del error de bakend es: '+err.status);
        console.log(err.error.erros);
        
      }
    )
  }

  ngOnInit(): void {
    this.cargarCliente();
  }
}
