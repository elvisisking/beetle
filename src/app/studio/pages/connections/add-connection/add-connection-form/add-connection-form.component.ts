import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NewConnection} from '../../../../../models/new-connection';

@Component({
  selector: 'app-add-connection-form',
  templateUrl: './add-connection-form.component.html',
  styleUrls: ['./add-connection-form.component.css']
})
export class AddConnectionFormComponent implements OnInit {

  @Output() onCreateConnection = new EventEmitter<NewConnection>();

  model = new NewConnection();
  creatingConnection = false;

  constructor() { }

  ngOnInit() {
  }

  get currentConnection() { return JSON.stringify(this.model); }

  /**
   * Called when the user clicks the "Create Connection" submit button on the form.
   */
  public createConnection(): void {
    const connection: NewConnection = new NewConnection();
    connection.name = this.model.name;
    connection.jndiName = this.model.jndiName;
    connection.driverName = this.model.driverName;
    connection.jdbc = this.model.jdbc;

    console.log('[AddConnectionFormComponent] Firing create-connection event: %o', connection);

    this.creatingConnection = true;
    this.onCreateConnection.emit(connection);
  }

}
