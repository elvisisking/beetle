import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Form, FormsModule} from '@angular/forms';

import {StudioRouting} from './studio/studio.routing';
import {ApiService} from './studio/services/api.service';

import { StudioComponent } from './studio/studio.component';
import { AddConnectionComponent } from './studio/pages/connections/add-connection/add-connection.component';
import { VerticalNavComponent } from './studio/components/vertical-nav/vertical-nav.component';
import { NavHeaderComponent } from './studio/components/nav-header/nav-header.component';
import { ConnectionsComponent } from './studio/pages/connections/connections.component';
import { BreadcrumbsComponent } from './studio/components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbComponent } from './studio/components/breadcrumbs/breadcrumb/breadcrumb.component';
import { ConnectionsListComponent } from './studio/pages/connections/connections-list/connections-list.component';
import { ConnectionsCardsComponent } from './studio/pages/connections/connections-cards/connections-cards.component';

@NgModule({
  declarations: [
    StudioComponent,
    AddConnectionComponent,
    VerticalNavComponent,
    NavHeaderComponent,
    ConnectionsComponent,
    BreadcrumbsComponent,
    BreadcrumbComponent,
    ConnectionsListComponent,
    ConnectionsCardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StudioRouting
  ],
  providers: [ApiService],
  bootstrap: [StudioComponent]
})
export class AppModule { }
