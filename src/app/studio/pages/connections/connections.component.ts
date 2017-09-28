import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Connection} from '../../../models/connection';
import {NewConnection} from '../../../models/new-connection';
import {ApiService} from '../../services/api.service';
import {ArrayUtils} from '../../util/common';
import {AbstractPageComponent} from '../../components/abstract-page.component';
import {ConfirmDeleteComponent} from '../../components/dialogs/confirm-delete/confirm-delete.component';

class Filters {
  nameFilter: string;
  sortDirection: string;
  layout: string;

  constructor(params?: any) {
    this.reset();
    if (params) {
      for (const key of Object.keys(params)) {
        const value: string = params[key];
        this[key] = value;
      }
    }
  }

  public accepts(connection: Connection): boolean {
    const name: string = connection.getId().toLocaleLowerCase();
    const namef: string = this.nameFilter.toLocaleLowerCase();
    return name.indexOf(namef) >= 0;
  }

  public reset(): void {
    this.nameFilter = '';
    this.sortDirection = 'ASC';
    this.layout = 'card';
  }
}

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css'],
  providers: [ApiService]
})
export class ConnectionsComponent extends AbstractPageComponent {

  allConnections: Connection[] = [];
  filteredConnections: Connection[] = [];
  selectedConnections: Connection[] = [];
  filters: Filters = new Filters();
  private connectionNameForDelete: string;

  @ViewChild(ConfirmDeleteComponent) confirmDeleteDialog: ConfirmDeleteComponent;

  constructor(private router: Router, route: ActivatedRoute, private apiService: ApiService) {
    super(route);
  }

  public loadAsyncPageData() {
    this.apiService
      .getAllConnections()
      .subscribe(
        (connections) => {
          this.allConnections = connections;
          this.filteredConnections = this.filterConnections();
          this.loaded('connections');
        },
        (error) => {
          console.error('[ConnectionsComponent] Error getting connections.');
          this.error(error);
        }
      );
  }

  /**
   * Filters and sorts the list of connections based on the user input
   */
  private filterConnections(): Connection[] {
    // Clear the array first.
    this.filteredConnections.splice(0, this.filteredConnections.length);
    for (const connection of this.allConnections) {
      if (this.filters.accepts(connection)) {
        this.filteredConnections.push(connection);
      }
    }
    this.filteredConnections.sort( (c1: Connection, c2: Connection) => {
      let rval: number = c1.getId().localeCompare(c2.getId());
      if (this.filters.sortDirection === 'DESC') {
        rval *= -1;
      }
      return rval;
    });

    this.selectedConnections = ArrayUtils.intersect(this.selectedConnections, this.filteredConnections);

    return this.filteredConnections;
  }

  public onSelected(connection: Connection): void {
    // Only allow one item to be selected
    this.selectedConnections.shift();
    this.selectedConnections.push(connection);
  }

  public onDeselected(connection: Connection): void {
    // Only one item is selected at a time
    this.selectedConnections.shift();
    // this.selectedConnections.splice(this.selectedConnections.indexOf(connection), 1);
  }

  public onEdit(connName: string): void {
    const link: string[] = [ '/connections/edit-connection' ];
    this.router.navigate(link);
  }

  public onDelete(connName: string): void {
    this.connectionNameForDelete = connName;
    this.confirmDeleteDialog.open();
  }

  public onPing(connName: string): void {
    alert('Ping connection ' + connName);
  }

  public isFiltered(): boolean {
    return this.allConnections.length !== this.filteredConnections.length;
  }

  public toggleSortDirection(): void {
    if (this.filters.sortDirection === 'ASC') {
      this.filters.sortDirection = 'DESC';
    } else {
      this.filters.sortDirection = 'ASC';
    }
    this.filterConnections();
  }

  public clearFilters(): void {
    this.filters.nameFilter = '';
    this.filterConnections();
  }

  public onListLayout(): void {
    this.filters.layout = 'list';
  }

  public onCardLayout(): void {
    this.filters.layout = 'card';
  }

  /**
   * Called to delete all selected APIs.
   */
  public deleteConnection(): void {
    const selectedConn =  this.filterConnections().find(x => x.getId() === this.connectionNameForDelete);

    // const itemsToDelete: Connection[] = ArrayUtils.intersect(this.selectedConnections, this.filteredConnections);
    // const selectedConn = itemsToDelete[0];

    const connectionToDelete: NewConnection = new NewConnection();
    connectionToDelete.setName(selectedConn.getId());

    // Note: we can only delete selected items that we can see in the UI.
    console.log('[ConnectionsPageComponent] Deleting selected Connection.');
    this.apiService
      .deleteConnection(connectionToDelete)
      .subscribe(
        () => {
          this.removeConnectionFromList(selectedConn);
          const link: string[] = [ '/connections' ];
          console.log('[CreateApiPageComponent] Navigating to: %o', link);
          this.router.navigate(link);
        }
      );
  }

  private removeConnectionFromList(connection: Connection) {
    this.allConnections.splice(this.allConnections.indexOf(connection), 1);
    this.filterConnections();
  }
}
