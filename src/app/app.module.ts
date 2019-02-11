import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import {AppComponent} from './app.component';
import {LoginComponent} from './Components/login/login.component';
import {VentasComponent} from './Components/ventas/ventas.component';
import {ReportesComponent} from './Components/reportes/reportes.component';
import {ProductosComponent} from './Components/productos/productos.component';
import {UsuariosComponent} from './Components/usuarios/usuarios.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppMaterialModule} from './app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogAddProdComponent} from './Dialogs/dialog-add-prod/dialog-add-prod.component';
import { DialogEditProdComponent } from './Dialogs/dialog-edit-prod/dialog-edit-prod.component';
import { DialogAddVentaComponent } from './Dialogs/dialog-add-venta/dialog-add-venta.component';
import { DialogDetallVentaComponent } from './Dialogs/dialog-detall-venta/dialog-detall-venta.component';
import { DialogComprobacionComponent } from './Dialogs/dialog-comprobacion/dialog-comprobacion.component';
import {DialogEditVentaComponent} from './Dialogs/dialog-edit-venta/dialog-edit-venta.component';
import { DialogEditUsuComponent } from './Dialogs/dialog-edit-usu/dialog-edit-usu.component';
import { DialogAddUsuComponent } from './Dialogs/dialog-add-usu/dialog-add-usu.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VentasComponent,
    ReportesComponent,
    ProductosComponent,
    UsuariosComponent,
    HeaderComponent,
    DialogAddProdComponent,
    DialogEditProdComponent,
    DialogAddVentaComponent,
    DialogDetallVentaComponent,
    DialogComprobacionComponent,
    DialogEditVentaComponent,
    DialogEditUsuComponent,
    DialogAddUsuComponent
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
      ]// , { useHash: true, initialNavigation: false}
    )
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddProdComponent, DialogEditProdComponent, DialogAddVentaComponent,
    DialogComprobacionComponent, DialogDetallVentaComponent, DialogEditVentaComponent,
    DialogEditUsuComponent,
    DialogAddUsuComponent]
})
export class AppModule {
}
