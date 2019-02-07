import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Ventas} from '../../Data/Ventas';
import {ServicioService} from '../../Servicio/servicio.service';
import {MatDialog, MatDialogConfig, MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material';
import {DialogAddVentaComponent} from '../../Dialogs/dialog-add-venta/dialog-add-venta.component';
import {DialogDetallVentaComponent} from '../../Dialogs/dialog-detall-venta/dialog-detall-venta.component';
import {DialogEditVentaComponent} from '../../Dialogs/dialog-edit-venta/dialog-edit-venta.component';
import {DialogComprobacionComponent} from '../../Dialogs/dialog-comprobacion/dialog-comprobacion.component';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginacion: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Ventas>();
  ventas: Ventas[];
  columnas = ['id', 'nombrep', 'nombreu', 'fecha', 'total', 'detalles', 'actualizar', 'eliminar'];
  total: number;
  constructor(private servicio: ServicioService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.LlenarVentas();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  private LlenarVentas() {
    const formData = new FormData;
    formData.append('accion', 'ventas');
    this.ventas = null;
    this.servicio.servicio(formData).subscribe(
      ventas => {
        Object.keys(ventas).map((key) => {
          if (key === 'ventas') {
            this.ventas = ventas[key];
            // this.dataSource = new Datasource(this.paginacion, this.ordenar, this.ventas);
            this.dataSource.data = ventas[key] as Ventas[];
            this.LlenarTotal();
            // console.log(key);
            // console.log(ventas[key]);
          } else {
            this.ventas = null;
          }
        });
      }
    );
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
        formData.append('accion', 'delete_vent');
        formData.append('id', id.toString());
        this.servicio.servicio(formData).subscribe(
          ventas => {
            Object.keys(ventas).map((key) => {
              if (key === 'mensaje') {
                alert(ventas[key]);
                this.LlenarVentas();
              }
            });
          }
        );
      }
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogAddVentaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarVentas();
      // console.log(result);
    });
  }

  Modificar(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id};
    dialogConfig.width = '800px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(DialogEditVentaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      alert(result);
      this.LlenarVentas();
      // console.log(result);
    });
  }

  Detalles(id: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id};
    // dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    this.dialog.open(DialogDetallVentaComponent, dialogConfig);
    /* dialogRef.afterClosed().subscribe(result => {
      alert(result);
      // console.log(result);
    }); */
  }

  private LlenarTotal() {
    let suma = 0;
    for (const row of this.dataSource.data) {
      suma = +suma + +row.total;
    }
    this.total = suma;
  }
}
