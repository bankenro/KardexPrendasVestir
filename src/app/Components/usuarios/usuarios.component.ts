import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ServicioService} from '../../Servicio/servicio.service';
import {UsuarioCompleto} from '../../Data/UsuarioCompleto';
import {DialogComprobacionComponent} from '../../Dialogs/dialog-comprobacion/dialog-comprobacion.component';
import {DialogAddUsuComponent} from '../../Dialogs/dialog-add-usu/dialog-add-usu.component';
import {DialogEditUsuComponent} from '../../Dialogs/dialog-edit-usu/dialog-edit-usu.component';
import {UsuarioService} from '../../Servicio/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<UsuarioCompleto>();
  usuarios: UsuarioCompleto[];
  columnas = ['id', 'password', 'tipo', 'nombre', 'paterno', 'materno', 'actualizar', 'eliminar'];
  habilitaredit: boolean;
  habilitaradd: boolean;
  constructor(private usuario: UsuarioService,
              private servicio: ServicioService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.LlenarUsuarios();
    const objusu = this.usuario.getUsuarioLogeadoen();
    const objusu1 = objusu[0];
    if (objusu1['tipo'] === '2') {
      this.habilitaredit = true;
      this.habilitaradd = true;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  Modificar(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {row};
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogEditUsuComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarUsuarios();
      // console.log(result);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogAddUsuComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarUsuarios();
      // console.log(result);
    });
  }

  Eliminar(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    // dialogConfig.width = '600px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogComprobacionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const formData = new FormData;
        formData.append('accion', 'del_usu');
        formData.append('id', id.toString());
        this.servicio.servicio(formData).subscribe(
          ventas => {
            Object.keys(ventas).map((key) => {
              if (key === 'mensaje') {
                alert(ventas[key]);
                this.LlenarUsuarios();
              }
            });
          }
        );
      }
    });
  }

  private LlenarUsuarios() {
    const formData = new FormData;
    formData.append('accion', 'usuarios');
    this.usuarios = null;
    this.servicio.servicio(formData).subscribe(
      usuarios => {
        Object.keys(usuarios).map((key) => {
          if (key === 'usuarios') {
            this.usuarios = usuarios[key];
            // this.dataSource = new Datasource(this.paginacion, this.ordenar, this.ventas);
            this.dataSource.data = usuarios[key] as UsuarioCompleto[];
            // console.log(key);
            // console.log(ventas[key]);
          } else {
            this.usuarios = null;
          }
        });
      }
    );
  }
}
