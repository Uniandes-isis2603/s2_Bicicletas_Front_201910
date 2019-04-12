import { Component, OnInit, Input } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Bicicleta } from '../../bicicleta/bicicleta';
import { BicicletaListComponent } from '../../bicicleta/bicicleta-list/bicicleta-list.component';

@Component({
  selector: 'app-categoria-bicicleta',
  templateUrl: './categoria-bicicleta.component.html',
  styleUrls: ['./categoria-bicicleta.component.css']
})
export class CategoriaBicicletaComponent implements OnInit {

  /**
   * Nombre de la categoria.
   */
  @Input() nombreCategoria: string;

  bicicletas: Bicicleta[];

  constructor(private categoriaService: CategoriaService) { }

  /**
   * Obtiene las bicicletas de la categoria con el nombre dado.
   * @param nombreCategoria Nombre de la categoria.
   */
  getBicicletas(nombreCategoria: string) {
    this.categoriaService.getCategoriaBicicletas(nombreCategoria)
      .subscribe(bicis => {
        this.bicicletas = bicis;
      });
  }

  getCategoriaBicicletas() {
    this.getBicicletas(this.nombreCategoria);
  }

  ngOnInit() {
    if(this.bicicletas === undefined) {
      this.bicicletas = [];
    }
  }

}
