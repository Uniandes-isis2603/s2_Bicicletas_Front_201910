import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CategoriaDetail } from '../categoria-detail';
import { CategoriaService } from '../categoria.service';
import { Bicicleta } from '../../bicicleta/bicicleta';
import { balancePreviousStylesIntoKeyframes } from '@angular/animations/browser/src/util';

@Component({
  selector: 'categoria-detail',
  templateUrl: './categoria-detail.component.html',
  styleUrls: ['./categoria-detail.component.css']
})
export class CategoriaDetailComponent implements OnInit {

  categoriaDetail: CategoriaDetail;
  nombre: string;

  constructor(private categoriaService: CategoriaService,
              private route: ActivatedRoute,
              private location: Location
  ) { }

  getCategoriaDetail() {
    this.categoriaDetail = new CategoriaDetail();
    this.categoriaService.getCategoriaDetail(this.nombre)
      .subscribe(categoriaDetail => {
        this.categoriaDetail = categoriaDetail;
        console.log(this.categoriaDetail);
      });
  }

  back() {
    this.location.back();
  }

  recibirActualizacion(event) {
    this.nombre = event.nombre;
    console.log(event);
    this.getCategoriaDetail();
  }

  recibirEliminacion() {
    this.back();
  }

  createCategoriaBicicleta(bicicleta: Bicicleta) {
    this.categoriaService.createCategoriaBicicleta(this.nombre, bicicleta)
      .subscribe(bici => {
        this.categoriaDetail.bicicletas.push(bici);
      });
  }

  ngOnInit() {
    this.nombre = String(this.route.snapshot.paramMap.get('nombre'));

    this.categoriaDetail = new CategoriaDetail();
    this.getCategoriaDetail();
  }

}
