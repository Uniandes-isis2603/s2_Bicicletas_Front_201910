import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

import {BicicletaService} from '../bicicleta.service';
import {Bicicleta} from '../bicicleta';

import {MarcaService} from '../../marca/marca.service'; 
import {CategoriaService} from '../../categoria/categoria.service'; 

import {Categoria} from '../../categoria/categoria';
import {Marca} from '../../marca/marca'; 


@Component({
    selector: 'app-bicicleta-create',
    templateUrl: './bicicleta-create.component.html',
    styleUrls: ['./bicicleta-create.component.css'],
    providers: [DatePipe]
})
export class BicicletaCreateComponent implements OnInit {

    /**
    * Constructor del componentee
    * @param bicicletaService El servicio de la Bicicleta que se comunica con el API
    * @param toastrService toastr: sirve para mostrar los mensajes al usuario
    * @param router El router
    */
    constructor(
        private dp: DatePipe,
        private bicicletaService: BicicletaService,
        private marcaService: MarcaService,
        private categoriaService: CategoriaService,
        private toastrService: ToastrService,
        private router: Router
    ) {}

    /**
    * La nueva Bicicleta
    */
    bicicleta: Bicicleta;

	/**
    * La categoria de l Bicicleta
    */
    categoriaB: Categoria;

   /**
    * La marca de l Bicicleta
    */
    marcaB: Marca;


	/**
    * La lista de todas las categorias
    */
    categorias: Categoria[];

   /**
    * La lista de todas las marcas
    */
    marcas: Marca[];


 /**
    * Retorna la lista de todas las marcas
    */
    getMarcas(): void {
        this.marcaService.getMarcas()
            .subscribe(marcas => {
                this.marcas = marcas;
            }, err => {
                this.toastrService.error(err, 'Error');
            });
    }

	/**
    * Retorna la lista de todas las categorias
    */
    getCategorias(): void {
        this.categoriaService.getCategorias()
            .subscribe(categorias => {
                this.categorias = categorias;
            }, err => {
                this.toastrService.error(err, 'Error');
            });
    }
    
    /**
    * Cancela la creacion de una nueva bicicleta
    * Redirige  a la pagina de lista de bicicletas 
    */
    cancelCreation(): void {
        this.toastrService.warning('The bike wasn\'t created', 'Bike creation');
        this.router.navigate(['/bicicletas/list']);
    }

    /**
    * Crea una nueva Bicicleta
    */
    createBicicleta(): Bicicleta {
        this.bicicletaService.createBicicleta(this.bicicleta)
            .subscribe(bicicleta => {
                this.bicicleta.id = bicicleta.id;
                this.router.navigate(['/bicicleta/' + bicicleta.id]);
            }, err => {
                this.toastrService.error(err, 'Error');
            });
        return this.bicicleta;
    }

    /**
    * Funcion que incializa el componente
    */
    ngOnInit() {
        this.bicicleta = new Bicicleta();
		this.bicicleta.categoria = new Categoria();
		this.bicicleta.marca = new Marca();
		this.bicicleta.album = new Array(4);
		
		this.getCategorias();
		this.getMarcas();
     }

}