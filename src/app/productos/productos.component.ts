import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ServicioService} from '../Servicio/servicio.service';
import {Categorias} from '../Data/Categorias';
import {Marcas} from '../Data/Marcas';
import {Prendas} from '../Data/Prendas';
import {DialogAddProdComponent} from '../dialog-add-prod/dialog-add-prod.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private servicio: ServicioService,
              private dialog: MatDialog) {
  }

  panelOpenState = false;
  // palabra: FormControl;
  idmarca: FormControl;
  idcategoria: FormControl;
  categorias: Categorias[];
  prendas: Prendas[];
  marcas: Marcas[];

  ngOnInit() {
    // this.palabra = new FormControl();
    this.idcategoria = new FormControl();
    this.idmarca = new FormControl();
    this.LlenarCategorias();
    this.LlenarMarcas();
    this.MostrarPrendas();
  }

  private LlenarCategorias() {
    const formData = new FormData;
    formData.append('accion', 'categorias');
    this.servicio.getCategorias(formData).subscribe(
      categorias => {
        Object.keys(categorias).map((key) => {
          if (key === 'categorias') {
            this.categorias = categorias[key];
            // console.log(key);
            // console.log(usuario[key]);
          }
        });
      }
    );
  }

  private LlenarMarcas() {
    const formData = new FormData;
    formData.append('accion', 'marcas');
    this.servicio.getMarcas(formData).subscribe(
      marcas => {
        Object.keys(marcas).map((key) => {
          if (key === 'marcas') {
            this.marcas = marcas[key];
            // console.log(key);
            // console.log(usuario[key]);
          }
        });
      }
    );
  }

  private MostrarPrendas() {
    // let text = this.palabra.value;
    let categ = this.idcategoria.value;
    let marca = this.idmarca.value;
    /* if (text == null) {
      text = '';
    } */
    if (marca == null) {
      marca = '';
    }
    if (categ == null) {
      categ = '';
    }
    const formData = new FormData;
    formData.append('accion', 'prendas');
    // formData.append('text', text);
    formData.append('categ', categ);
    formData.append('marca', marca);
    this.servicio.getMarcas(formData).subscribe(
      prendas => {
        Object.keys(prendas).map((key) => {
          if (key === 'prendas') {
            this.prendas = prendas[key];
            // console.log(key);
            // console.log(prendas[key]);
          } else {
            this.prendas = null;
          }
        });
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogAddProdComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      // console.log(result);
    });
  }
}
