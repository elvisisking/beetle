import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Connection} from '../../../models/connection';
import {NewConnection} from '../../../models/new-connection';
import {ApiService} from '../../services/api.service';
import {ArrayUtils} from '../../util/common';

class Filters {
  nameFilter: string;
  sortDirection: string;
  layout: string;

  constructor(params?: any) {
    this.reset();
    if (params) {
      for (const key in params) {
        const value: string = params[key];
        this[key] = value;
      }
    }
  }

  public accepts(connection: Connection): boolean {
    const name: string = connection.keng__id.toLocaleLowerCase();
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
export class ConnectionsComponent implements OnInit {

  allConnections: Connection[] = [];
  filteredConnections: Connection[] = [];
  selectedConnections: Connection[] = [];
  filters: Filters = new Filters();
  dataloaded = false;

  constructor(private router: Router, private apiService: ApiService) {

  }

  public ngOnInit() {
    this.apiService
      .getAllConnections()
      .subscribe(
        (connections) => {
          this.allConnections = connections;
          this.filteredConnections = this.filterConnections();
          this.dataloaded = true;
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
      let rval: number = c1.keng__id.localeCompare(c2.keng__id);
      if (this.filters.sortDirection === 'DESC') {
        rval *= -1;
      }
      return rval;
    });

    this.selectedConnections = ArrayUtils.intersect(this.selectedConnections, this.filteredConnections);

    return this.filteredConnections;
  }

  /**
   * Called to determine whether page data has been loaded yet.
   * @param key
   * @return {boolean}
   */
  public isLoaded(key: string): boolean {
    if (this.dataloaded) {
      return true;
    } else {
      return false;
    }
  }

  public onSelected(connection: Connection): void {
    // console.info("[ApisPageComponent] Caught the onApiSelected event!  Data: %o", connection);
    this.selectedConnections.push(connection);
  }

  public onDeselected(connection: Connection): void {
    // console.info("[ApisPageComponent] Caught the onApiDeselected event!  Data: %o", connection);
    this.selectedConnections.splice(this.selectedConnections.indexOf(connection), 1);
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
    const itemsToDelete: Connection[] = ArrayUtils.intersect(this.selectedConnections, this.filteredConnections);
    const selectedConn = itemsToDelete[0];

    const connectionToDelete: NewConnection = new NewConnection();
    connectionToDelete.name = selectedConn.keng__id;

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
