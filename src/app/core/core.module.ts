import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BsNavbarComponent } from 'app/core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from 'app/core/components/home/home.component';
import { LoginComponent } from 'app/core/components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    NgbModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
