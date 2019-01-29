import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {VentasComponent} from './ventas/ventas.component';
import {ReportesComponent} from './reportes/reportes.component';
import {ProductosComponent} from './productos/productos.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppMaterialModule} from './app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogAddProdComponent} from './dialog-add-prod/dialog-add-prod.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VentasComponent,
    ReportesComponent,
    ProductosComponent,
    UsuariosComponent,
    HeaderComponent,
    DialogAddProdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      [
        {path: 'productos', component: ProductosComponent},
        {path: 'reportes', component: ReportesComponent},
        {path: 'usuarios', component: UsuariosComponent},
        {path: 'ventas', component: VentasComponent},
        {path: 'login', component: LoginComponent},
        // {path: '', redirectTo: 'productos', pathMatch: 'full'}
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddProdComponent]
})
export class AppModule {
}
