import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ServicioService} from '../../Servicio/servicio.service';
import {Categorias} from '../../Data/Categorias';
import {Marcas} from '../../Data/Marcas';
import {Prendas} from '../../Data/Prendas';
import {DialogAddProdComponent} from '../../Dialogs/dialog-add-prod/dialog-add-prod.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Tallas} from '../../Data/Tallas';
import {DialogEditProdComponent} from '../../Dialogs/dialog-edit-prod/dialog-edit-prod.component';
import {UsuarioService} from '../../Servicio/usuario.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private usuario: UsuarioService,
              private fb: FormBuilder,
              private servicio: ServicioService,
              private dialog: MatDialog) {
  }
  form: FormGroup;
  tallas: Tallas[];
  categorias: Categorias[];
  prendas: Prendas[];
  marcas: Marcas[];
  marca;
  color;
  precio;
  talla;
  sexo;
  cantidad;
  categoria;
  habilitaredit: boolean;
  habilitaradd: boolean;

  ngOnInit() {
    this.form = this.fb.group({
      idmarca: [''],
      idcategoria: [''],
      idtalla: ['']
    });
    const objusu = this.usuario.getUsuarioLogeadoen();
    const objusu1 = objusu[0];
    if (objusu1['tipo'] === '2') {
      this.habilitaredit = true;
      this.habilitaradd = true;
    }
    this.LlenarCategorias();
    this.LlenarMarcas();
    this.MostrarPrendas();
    this.LlenarTallas();
  }

  private LlenarCategorias() {
    const formData = new FormData;
    formData.append('accion', 'categorias');
    this.servicio.servicio(formData).subscribe(
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

  private LlenarTallas() {
    const formData = new FormData;
    formData.append('accion', 'tallas');
    this.servicio.servicio(formData).subscribe(
      tallas => {
        Object.keys(tallas).map((key) => {
          if (key === 'tallas') {
            this.tallas = tallas[key];
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
    this.servicio.servicio(formData).subscribe(
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
    // let text = this.form.get('usuario').value;
    let categ = this.form.get('idcategoria').value;
    let marca = this.form.get('idmarca').value;
    let talla = this.form.get('idtalla').value;
    /* if (text == null) {
      text = '';
    } */
    if (marca == null) {
      marca = '';
    }
    if (categ == null) {
      categ = '';
    }
    if (talla == null) {
      talla = '';
    }
    const formData = new FormData;
    formData.append('accion', 'prendas');
    // formData.append('text', text);
    formData.append('categ', categ);
    formData.append('marca', marca);
    formData.append('talla', talla);
    this.prendas = null;
    this.servicio.servicio(formData).subscribe(
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
      this.MostrarPrendas();
      // console.log(result);
    });
  }

  Editar(item: Prendas[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {object: item};
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogEditProdComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.MostrarPrendas();
      // console.log(result);
    });
  }
}
