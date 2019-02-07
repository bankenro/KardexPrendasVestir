import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Ventas} from '../../Data/Ventas';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ServicioService} from '../../Servicio/servicio.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, AfterViewInit {
  constructor(private servicio: ServicioService,
              private fb: FormBuilder) {
  }
  form: FormGroup;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Ventas>();
  ventas: Ventas[];
  columnas = ['id', 'nombrep', 'nombreu', 'fecha', 'precio', 'cantidad', 'total'];
  dias = [{id: '01', nombre: '01'}, {id: '02', nombre: '02'}, {id: '03', nombre: '03'}, {id: '04', nombre: '04'}, {id: '05', nombre: '05'},
          {id: '06', nombre: '06'}, {id: '07', nombre: '07'}, {id: '08', nombre: '08'}, {id: '09', nombre: '09'}, {id: '10', nombre: '10'},
          {id: '11', nombre: '11'}, {id: '12', nombre: '12'}, {id: '13', nombre: '13'}, {id: '14', nombre: '14'}, {id: '15', nombre: '15'},
          {id: '16', nombre: '16'}, {id: '17', nombre: '17'}, {id: '18', nombre: '18'}, {id: '19', nombre: '19'}, {id: '20', nombre: '20'},
          {id: '21', nombre: '21'}, {id: '22', nombre: '22'}, {id: '23', nombre: '23'}, {id: '24', nombre: '24'}, {id: '25', nombre: '25'},
          {id: '26', nombre: '26'}, {id: '27', nombre: '27'}, {id: '28', nombre: '28'}, {id: '29', nombre: '29'}, {id: '30', nombre: '30'},
          {id: '31', nombre: '31'}];
  meses = [{i: '01', n: 'ENERO'}, {i: '02', n: 'FEBRERO'}, {i: '03', n: 'MARZO'}, {i: '04', n: 'ABRIL'}, {i: '05', n: 'MAYO'},
           {i: '06', n: 'JUNIO'}, {i: '07', n: 'JULIO'}, {i: '08', n: 'AGOSTO'}, {i: '09', n: 'SETIEMBRE'}, {i: '10', n: 'OCTUBRE'},
           {i: '11', n: 'NOVIEMBRE'}, {i: '12', n: 'DICIEMBRE'}];
  anios = [{i: '2019', n: '2019'}];
  total: number;
  ngOnInit() {
    this.form = this.fb.group({
      iddia: [''],
      idmes: [''],
      idanio: ['']
    });
    this.Concatenar();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  private Concatenar() {
    const iddia = this.form.get('iddia').value;
    const idmes = this.form.get('idmes').value ;
    const idanioa = this.form.get('idanio').value;
    let string = '';
    if (iddia !== '' && idmes !== '' && idanioa !== '') {
      string = idanioa + '-' + idmes + '-' + iddia;
    }
    if (iddia === '' && idmes !== '' && idanioa !== '') {
      string = idanioa + '-' + idmes + '-';
    }
    if (iddia === '' && idmes === '' && idanioa !== '') {
      string = idanioa + '-';
    }
    if (iddia === '' && idmes !== '' && idanioa === '') {
      string = '-' + idmes + '-';
    }
    if (iddia !== '' && idmes === '' && idanioa === '') {
      string = '-' + iddia;
    }
    if (iddia !== '' && idmes !== '' && idanioa === '') {
      string = '-' + idmes + '-' + iddia;
    }
    if (iddia !== '' && idmes === '' && idanioa !== '') {
      string = '-' + iddia;
    }
    if (iddia === '' && idmes === '' && idanioa === '') {
      string = '';
    }
    this.LlenarVentas(string);
  }

  private LlenarVentas(string: string) {
    const formData = new FormData;
    formData.append('accion', 'ventassort');
    formData.append('fecha', string);
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

  private LlenarTotal() {
    let suma = 0;
    for (const row of this.dataSource.data) {
      suma = +suma + +row.total;
    }
    this.total = suma;
  }
}
