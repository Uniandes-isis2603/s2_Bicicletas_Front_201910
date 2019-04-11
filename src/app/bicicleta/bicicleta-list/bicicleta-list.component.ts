
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Bicicleta} from '../bicicleta';
import {BicicletaService} from '../bicicleta.service';

/**
 * El componente para la lista de Bicicletas de la tienda
 */
@Component({
    selector: 'app-bicicleta',
    templateUrl: './bicicleta-list.component.html',
    styleUrls: ['./bicicleta-list.component.css'] 
})
export class BicicletaListComponent implements OnInit {

    /**
     * Constructor del componente
     * @param bicicletaService El proveedor de servicio de la Bicicleta 
     */
    constructor(
	private bicicletaService: BicicletaService,
	 private route: ActivatedRoute
	) {}

    /**
     * La lista de Bicicletas de la tienda
     */
    bicicletas: Bicicleta[];

	


    /**
     * Metodo que retorna todas las bicicletas de la tienda para mostrarlos en la lista
     */
    getBicicletas(): void {
        this.bicicletaService.getBicicletas()
            .subscribe(bicicletas => this.bicicletas = bicicletas);
    }

    /**
     * Metodo que incializa el componente
     */
    ngOnInit() {
		console.log("IntitBicicletas");
        this.getBicicletas();
    }
}