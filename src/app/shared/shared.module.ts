import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './matrial.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    MatrialModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
   ToastrModule.forRoot(), 
   BrowserAnimationsModule,
  ],
  exports:[
    ReactiveFormsModule,
    HttpClientModule,
    //BrowserModule,
    RouterModule,
    MatrialModule,
    CommonModule,
    NavbarComponent
  ]
})
export class SharedModule { }
