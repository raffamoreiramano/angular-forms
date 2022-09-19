import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { InputComponent } from './components/input/input.component';
import { SelectInputComponent } from './components/input/select-input/select-input.component';
import { CheckboxesInputComponent } from './components/input/checkboxes-input/checkboxes-input.component';
import { RadioInputComponent } from './components/input/radio-input/radio-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AuthComponent,
    InputComponent,
    SelectInputComponent,
    CheckboxesInputComponent,
    RadioInputComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
