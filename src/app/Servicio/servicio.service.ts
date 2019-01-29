import {Injectable, SecurityContext} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../Data/Usuario';
import {catchError, map} from 'rxjs/operators';
import {Categorias} from '../Data/Categorias';
import {Marcas} from '../Data/Marcas';
import {Prendas} from '../Data/Prendas';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private url0 = 'http://192.168.1.10/APIKardexPrendasVestir/V1/';

  constructor(protected http: HttpClient) {
  }

  getUsuario(usuario: number, password: string): Observable<Usuario> {
    // const url1 = this.url0 + 'getusu' + '&usuario=' + usuario + '&password=' + password;
    const url1 = `${this.url0}getusu&usuario=${usuario}&password=${password}`;
    return this.http.get<Usuario>(url1);
  }

  login(loginObj: Object): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(this.url0, loginObj).pipe(
      map(res => res));
  }

  getCategorias(categoObj: Object): Observable<Categorias[]> {
    return this.http.post<Categorias[]>(this.url0, categoObj).pipe(
      map(res => res));
  }

  getMarcas(MarcObj: Object): Observable<Marcas[]> {
    return this.http.post<Marcas[]>(this.url0, MarcObj).pipe(
      map(res => res));
  }

  getPrendas(PrendObj: Object): Observable<Prendas[]> {
    return this.http.post<Prendas[]>(this.url0, PrendObj).pipe(
      map(res => res));
  }

  setPrendas(PrendObj: Object) {
    return this.http.post<Prendas[]>(this.url0, PrendObj).pipe(
      map(res => res));
  }
}
