import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Validation } from 'src/app/services/helpers/Validation';

class FileConstraints {
  static nameLength = {
    min: 1,
    max: 100,
  }

  static size = 10000000;
  static types = [
    "audio/wav",
    "audio/x-wav",
    "audio/gsm",
    "audio/x-gsm"
  ];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [this.CPFValidator]),
    password: new FormControl('', [this.CPFValidator]),
    file: new FormControl('', [this.FileValidator]),
    filename: new FormControl('', [this.FilenameValidator]),
    cities: new FormControl('2', [this.SelectValidator]),
  });

  emailProps = {
    control: this.form.controls.email,
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'E-mail',
    placeholder: 'usuario@email.com',
    message: 'E-mail inválido!',
    onChange: (value: string) => console.log(value)
  };
  passwordProps = {
    control: this.form.controls.file,
    filename: {
      control: this.form.controls.filename,
      onChange: (value: string) => console.log(value),
    },
    id: 'password',
    type: 'file',
    name: 'password',
    label: 'Senha',
    placeholder: 'Senha123!',
    message: 'Senha inválida!',
    onChange: (value: File) => console.log(value)
  };
  citiesProps = {
    control: this.form.controls.cities,
    id: 'cities',
    name: 'cities',
    label: 'Cidade',
    placeholder: 'Cidades disponíveis...',
    message: 'Cidade inválida!',
  }

  constructor() { }

  ngOnInit(): void {}

  private CPFValidator(control: AbstractControl): ValidationErrors | null {
    const valid = Validation.validateCPF(control.value);
    
    return valid ? null :  { message: 'CPF inválido!' };
  }

  private FileValidator(control: AbstractControl): ValidationErrors | null {
    const file: File = control.value;
    
    if (file.size <= 0) {
      return { message: 'Arquivo inválido!' };
    }

    if (file.size > FileConstraints.size) {
      return { message: 'Arquivo muito grande!' };
    }

    if (!FileConstraints.types.includes(file.type)) {
      return { message: 'Arquivo inválido!' };
    }

    return null;
  }

  private FilenameValidator(control: AbstractControl): ValidationErrors | null {
    const valid = control.value;
    
    return valid ? null :  { message: 'CPF inválido!' };
  }

  private SelectValidator(control: AbstractControl): ValidationErrors | null {
    const valid = control.value === '1';
    
    return valid ? null :  { message: 'Cidade inválida!' };
  }
}
