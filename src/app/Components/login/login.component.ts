import {Component, OnInit} from '@angular/core';
import {ServicioService} from '../../Servicio/servicio.service';
import {UsuarioService} from '../../Servicio/usuario.service';
import {Usuario} from '../../Data/Usuario';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private servicio: ServicioService,
              private usuarioservicio: UsuarioService,
              private router: Router) {
  }
  private _success = new Subject<string>();
  form: FormGroup;
  private formSubmitAttempt: boolean;
  mensaje: string;
  usuarios: Usuario [];

  ngOnInit() {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._success.subscribe((message) => this.mensaje = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.mensaje = null);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  LoginUser() {
    if (this.form.valid) {
      let formData;
      formData = new FormData();
      formData.append('accion', 'login');
      formData.append('usuario', this.form.get('usuario').value);
      formData.append('password', this.form.get('password').value);

      this.servicio.login(formData).subscribe(
        usuario => {
          this.logincorrecto(usuario);
        }
      );
    }
    this.formSubmitAttempt = true;
    /*return this.servicio.getUsuario(this.usuario, this.password)
      .subscribe(
        usuario => {
          console.log(usuario);
          this.logincorrecto(usuario);
        }
      );*/
  }

  private logincorrecto(usuario: Usuario[]) {
    Object.keys(usuario).map((key) => {
      // console.log('usuario' + this.form.get('usuario').value);
      /* console.log(key);
      console.log(usuario[key]);*/
      if (key === 'usu') {
        // console.log(usuario[key]);
          this.usuarioservicio.setUsuarioLogeadoen(usuario[key]);
          this.router.navigate(['productos']);
          location.reload();
        } else {
          // this._success.next(`${new Date()} - Message successfully changed.`);
          this._success.next('Usuario o contraseña incorrectas');
        }
        // console.log(key);
        // console.log(usuario[key]);
    });
  }
}
