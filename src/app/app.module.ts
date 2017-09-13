import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {StudioRouting} from "./studio/studio.routing";

import { StudioComponent } from './studio/studio.component';
import { AddConnectionComponent } from './studio/pages/connections/add-connection/add-connection.component';
import { VerticalNavComponent } from './studio/components/vertical-nav/vertical-nav.component';
import { NavHeaderComponent } from './studio/components/nav-header/nav-header.component';
import { ConnectionsComponent } from './studio/pages/connections/connections.component';

@NgModule({
  declarations: [
    StudioComponent,
    AddConnectionComponent,
    VerticalNavComponent,
    NavHeaderComponent,
    ConnectionsComponent
  ],
  imports: [
    BrowserModule,
    StudioRouting
  ],
  providers: [],
  bootstrap: [StudioComponent]
})
export class AppModule { }
