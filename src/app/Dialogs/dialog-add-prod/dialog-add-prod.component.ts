import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categorias} from '../../Data/Categorias';
import {Marcas} from '../../Data/Marcas';
import {ServicioService} from '../../Servicio/servicio.service';
import {Colores} from '../../Data/Colores';
import {Tallas} from '../../Data/Tallas';
import {Generos} from '../../Data/Generos';
import {UsuarioService} from '../../Servicio/usuario.service';


@Component({
  selector: 'app-dialog-add-prod',
  templateUrl: './dialog-add-prod.component.html',
  styleUrls: ['./dialog-add-prod.component.css']
})
export class DialogAddProdComponent implements OnInit {
  form: FormGroup;
  imagenurl = 'http://placehold.it/180';
  base64result = '';
  categorias: Categorias[];
  marcas: Marcas[];
  colores: Colores[];
  tallas: Tallas[];
  generos: Generos[];
  usuario: number;
  private formSubmitAttempt: boolean;

  constructor(private usuarioservicio: UsuarioService,
              private servicio: ServicioService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogAddProdComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data);
  }

  ngOnInit() {
    this.form = this.fb.group({
      imagenfc: ['', Validators.required],
      idcategoria: ['', Validators.required],
      idmarca: ['', Validators.required],
      idcolor: ['', Validators.required],
      idtalla: ['', Validators.required],
      idgenero: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.LlenarCategorias();
    this.LlenarMarcas();
    this.LlenarColores();
    this.LlenarTallas();
    this.Generos();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  CargarImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      //  console.log('echo: ' + event.target.files[0]);
      reader.onload = (e: any) => {
        this.imagenurl = e.target.result;
        // console.log('result: ' + e.target.result);
        this.base64result = e.target.result.split(',')[1];
        // console.log('base64: ' + this.base64result);
      };
    }
  }

  AgregarPrenda() {
    // console.log('ejecutando');
    /* console.log('data: ' + this.form.get('idcategoaria').value
       + ' ' + this.form.get('idmarca').value
       + ' ' + this.form.get('idcolor').value
       + ' ' + this.form.get('idtalla').value
       + ' ' + this.form.get('idgenero').value
       + ' ' + this.form.get('cantidad').value
       + ' ' + this.form.get('precio').value);*/
    // console.log('image' + this.base64result);
    const guardado = this.usuarioservicio.getUsuarioLogeadoen();
    for (const row of guardado) {
      this.usuario = row.id;
    }
    // console.log(this.usuario);
    const formData = new FormData;
    formData.append('accion', 'addprod');
    formData.append('usuario', this.usuario.toString());
    formData.append('imagen', this.base64result);
    formData.append('idcategoria', this.form.get('idcategoria').value);
    formData.append('idmarca', this.form.get('idmarca').value);
    formData.append('idcolor', this.form.get('idcolor').value);
    formData.append('idtalla', this.form.get('idtalla').value);
    formData.append('idgenero', this.form.get('idgenero').value);
    formData.append('cantidad', this.form.get('cantidad').value);
    formData.append('precio', this.form.get('precio').value);
    this.servicio.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map((key) => {
          // console.log(key);
          // console.log(respuesta[key]);
          if (key === 'mensaje') {
            if (respuesta[key] === 'Prenda agregada correctamente') {
              this.dialogRef.close(respuesta[key]);
            }
          }
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
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

  private LlenarColores() {
    const formData = new FormData;
    formData.append('accion', 'colores');
    this.servicio.servicio(formData).subscribe(
      marcas => {
        Object.keys(marcas).map((key) => {
          if (key === 'colores') {
            this.colores = marcas[key];
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
      marcas => {
        Object.keys(marcas).map((key) => {
          if (key === 'tallas') {
            this.tallas = marcas[key];
            // console.log(key);
            // console.log(usuario[key]);
          }
        });
      }
    );
  }

  private Generos() {
    const formData = new FormData;
    formData.append('accion', 'generos');
    this.servicio.servicio(formData).subscribe(
      marcas => {
        Object.keys(marcas).map((key) => {
          if (key === 'generos') {
            this.generos = marcas[key];
            // console.log(key);
            //  console.log(marcas[key]);
          }
        });
      }
    );
  }

}
