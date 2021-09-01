import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AgenciesRoutingModule } from './agencies-routing.module';
import { MaterialModule } from '../material/material.module';

import { FormComponent } from './pages/form/form.component';
import { AgencyComponent } from './pages/agency/agency.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { AgencyCardComponent } from './components/agency-card/agency-card.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    FormComponent,
    AgencyComponent,
    HomeComponent,
    ListComponent,
    AgencyCardComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    AgenciesRoutingModule,
    MaterialModule,
  ],
})
export class AgenciesModule {}
