import { Component, OnInit } from '@angular/core';

import {Connection} from '../../../models/connection';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css'],
  providers: [ApiService]
})
export class ConnectionsComponent implements OnInit {

  connections: Connection[] = [];

  constructor(
    private apiService: ApiService
  ) {
  }

  public ngOnInit() {
    this.apiService
      .getAllConnections()
      .subscribe(
        (connections) => {
          this.connections = connections;
        }
      );
  }
}
